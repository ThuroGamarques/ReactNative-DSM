import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Defina a tela principal usando o componente "index" */}
      <Stack.Screen name="ReactPlace" />
    </Stack>
  );
}