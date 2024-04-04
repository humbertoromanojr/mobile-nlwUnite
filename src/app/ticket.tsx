import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Header from "@/components/header";
import Credential from "@/components/credential";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

export default function Ticket() {
  const [image, setImage] = useState("");

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.assets) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Foto", "Não foi possível selecionar a imagem :-(");
    }
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
        <Credential image={image} onChangeAvatar={handleSelectImage} />

        <FontAwesome
          name="angle-double-down"
          size={32}
          color={colors.gray[300]}
          className="self-center mt-6"
        />

        <Text className="text-white font-bold text-2xl self-center mt-6">
          Compartilhar credencial
        </Text>

        <Text className="text-orange-500 px-12 mb-6 font-regular text-base self-center">
          Mostre ao mundo que você vai participar do Unite Summit ;-p
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10 flex-row items-center self-center"
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
    </View>
  );
}
