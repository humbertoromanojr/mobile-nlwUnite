import { useState } from "react";
import { View, Text, Image, StatusBar, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";

import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert("Credencial", "Informe o código do ingresso!!!");
      }

      setIsLoading(true);

      const { data } = await api.get(`/attendees/${code}/badge`);

      badgeStore.save(data.badge);
      console.log("==> data.badge: ", data.badge);
    } catch (error) {
      Alert.alert("Ingresso", "Não foi possível encontrá-lo!");
      console.log("==> home: ", error);
      setIsLoading(false);
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />;
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

        <Button
          title="Acessar Credencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />

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
