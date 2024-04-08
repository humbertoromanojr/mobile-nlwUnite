import { useState } from "react";
import { View, Text, Image, StatusBar, Alert } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import axios from "axios";

import { api } from "@/server/api";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

import { useBadgeStore } from "@/store/badge-store";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Inscrição", "Preencha todos os campos!!!");
      }

      setIsLoading(true);

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      if (registerResponse.data.attendeeId) {
        const badgeResponse = await api.get(
          `/attendees/${registerResponse.data.attendeeId}/badge`
        );

        badgeStore.save(badgeResponse.data.badge);

        Alert.alert("🎟️ Inscrição 🎟️", "🥳 Realizada com sucesso! 🥳", [
          { text: "🆗", onPress: () => router.push("/ticket") },
        ]);
      }
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes("already registered")
        ) {
          Alert.alert("Inscrição", "Este email já está cadastrado!");
        } else if (
          String(error.response?.data.message).includes(
            "Error during validation"
          )
        ) {
          Alert.alert(
            "Inscrição",
            "Email inválido, por favor, digite um email válido!"
          );
          console.log("==> register error: ", error.response?.data);
        } else {
          Alert.alert("Inscrição", "Não foi possível fazer a inscrição!");
        }
      }
      console.log("==> register error: ", error);
    }
  }

  return (
    <View className="flex-1 bg-gray-900 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image source={require("@/assets/logo.png")} />

      <View className="w-full mt-12 pag-3">
        <Input>
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button
          title="Registrar credencial"
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <Text className="text-orange-400 text-center text-2xl font-bold mt-8">
          Já possui conta?
        </Text>
        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-4"
        >
          Clique aqui para logar
        </Link>
      </View>
    </View>
  );
}
