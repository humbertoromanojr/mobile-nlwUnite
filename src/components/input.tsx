import { ReactNode } from "react";
import { TextInput, View } from "react-native";

function Input({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

function Field() {
  return <TextInput />;
}

Input.Field = Field;

export { Input };
