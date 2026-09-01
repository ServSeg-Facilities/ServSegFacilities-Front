import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";

//* NOVO: Importe o seu AuthProvider (ajuste o caminho se necessário)
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* //* NOVO: Envolvendo a navegação com o AuthProvider */}
      <AuthProvider>
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
      </AuthProvider>
    </SafeAreaProvider>
  );
}