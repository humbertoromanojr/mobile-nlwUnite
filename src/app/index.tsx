import { useState } from "react";
import { View, Text, Image, StatusBar, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

export default function Home() {
  const [code, setCode] = useState("");

  function handleAccessCredential() {
    if (!code.trim()) {
      return Alert.alert("Credencial", "Informe o código do ingresso!!!");
    }
  }

  return (
    <View className="flex-1 bg-gray-900 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image source={require("@/assets/logo.png")} />

      <View className="w-full mt-12 pag-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCode}
          />
        </Input>

        <Button title="Realizar inscrição" onPress={handleAccessCredential} />

        <Text className="text-orange-400 text-center text-2xl font-bold mt-8">
          Ainda não possui ingresso?
        </Text>
        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-4"
        >
          Clique aqui para se registrar
        </Link>
      </View>
    </View>
  );
}
