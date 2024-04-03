import { View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

export default function Home() {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center p-8">
      <Image source={require("@/assets/logo.png")} />

      <View className="w-full mt-12 pag-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Código do ingresso" />
        </Input>

        <Button title="Acessar credencial" />
      </View>
    </View>
  );
}
