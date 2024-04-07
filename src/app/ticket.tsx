import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Share,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Redirect } from "expo-router";
import { MotiView } from "moti";

import Header from "@/components/header";
import Credential from "@/components/credential";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store";

export default function Ticket() {
  const [expandQRCode, setExpandQRCode] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      }
    } catch (error) {
      Alert.alert("Compartilhar", "Não foi possível compartilhar!");
      console.log("==> ticket - handleShare: ", error);
    }
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Foto", "Não foi possível selecionar a imagem :-(");
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setExpandQRCode(true)}
        />

        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: 10 }}
          transition={{ loop: true, type: "timing", duration: 700 }}
        >
          <FontAwesome
            name="angle-double-down"
            size={32}
            color={colors.gray[300]}
            className="self-center mt-6"
          />
        </MotiView>

        <Text
          className="text-white font-bold text-2xl self-center mt-6"
          onPress={handleShare}
        >
          Compartilhar credencial
        </Text>

        <Text className="text-orange-500 px-12 mb-6 font-regular text-base self-center">
          Mostre ao mundo que você vai participar do evento
          {badgeStore.data.eventTitle} ;-p
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10 flex-row items-center self-center"
          onPress={() => badgeStore.remove()}
        >
          <FontAwesome
            name="trash"
            size={22}
            color="red"
            className="text-center"
          />
          <Text className="text-red-600 font-base font-bold text-center ml-2">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent animationType="fade">
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRCode(false)}
          >
            <QRCode value="teste" size={320} />
            <Text className="font-bold text-orange-500 text-lg text-center mt-10">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
