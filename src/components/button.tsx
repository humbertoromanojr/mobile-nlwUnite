import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
};

export function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg mt-4">
      <Text className="text-green-500 text-base font-bold uppercase">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
