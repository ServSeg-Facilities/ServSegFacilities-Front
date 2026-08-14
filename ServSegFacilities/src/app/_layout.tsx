import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "simple_push",
          contentStyle: {
            backgroundColor: Colors.AzulFundo,
          },
        }}
      >
        <Stack.Screen name="login/index" />
        <Stack.Screen name="listaRegistro/index" />
        <Stack.Screen name="registrarPonto/index" />
        <Stack.Screen name="detalhesRegistro/index" />
      </Stack>
    </SafeAreaProvider>
  );
}
