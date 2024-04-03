import { useState } from "react";
import { View, Text, Image, StatusBar, Alert } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleRegister() {
    if (!name.trim() || !email.trim()) {
      return Alert.alert("Inscrição", "Preencha todos os campos!!!");
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

        <Button title="Acessar credencial" onPress={handleRegister} />

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
