import React from "react";
import { View, Text } from "react-native";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <View className="w-full h-28 flex-row items-end bg-black/75 px-8 pb-4 border-b border-white/40">
      <Text className="flex-1 text-white font-medium text-lg text-center">
        {title}
      </Text>
    </View>
  );
}
