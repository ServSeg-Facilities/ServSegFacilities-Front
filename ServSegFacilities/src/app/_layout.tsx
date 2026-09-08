import { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors, Font } from "../constants/theme";
import { AuthProvider } from "../contexts/AuthContext";
import {
  useFonts,
  StackSansNotch_400Regular,
  StackSansNotch_600SemiBold,
  StackSansNotch_700Bold,
} from "@expo-google-fonts/stack-sans-notch";

// Injeção global moderna para substituir defaultProps descontinuado
function aplicarFonteGlobal() {
  const TextRender = (Text as any).render;
  if (TextRender && !(Text as any).__fonteInjetada) {
    (Text as any).__fonteInjetada = true;
    (Text as any).render = function (...args: any[]) {
      const origin = TextRender.apply(this, args);
      return {
        ...origin,
        props: {
          ...origin.props,
          style: [{ fontFamily: Font.regular }, origin.props.style],
        },
      };
    };
  }

  const InputRender = (TextInput as any).render;
  if (InputRender && !(TextInput as any).__fonteInjetada) {
    (TextInput as any).__fonteInjetada = true;
    (TextInput as any).render = function (...args: any[]) {
      const origin = InputRender.apply(this, args);
      return {
        ...origin,
        props: {
          ...origin.props,
          style: [{ fontFamily: Font.regular }, origin.props.style],
        },
      };
    };
  }
}

export default function RootLayout() {
  const [loaded] = useFonts({
    StackSansNotch_400Regular,
    StackSansNotch_600SemiBold,
    StackSansNotch_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      aplicarFonteGlobal();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack
          initialRouteName="splash/index"
          screenOptions={{
            headerShown: false,
            animation: "simple_push",
            contentStyle: {
              backgroundColor: Colors.AzulFundo,
            },
          }}
        >
          <Stack.Screen name="splash/index" />
          <Stack.Screen name="login/index" />
          <Stack.Screen name="listaRegistro/index" />
          <Stack.Screen name="registrarPonto/index" />
          <Stack.Screen name="detalhesRegistro/index" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}