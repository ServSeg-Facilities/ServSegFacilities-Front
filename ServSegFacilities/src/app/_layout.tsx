import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import { useFonts, StackSansNotch_400Regular, 
  StackSansNotch_600SemiBold, 
  StackSansNotch_700Bold
} from "@expo-google-fonts/stack-sans-notch"


export default function RootLayout() {
  const [loaded] = useFonts({
  StackSansNotch_400Regular, 
  StackSansNotch_600SemiBold, 
  StackSansNotch_700Bold
  });

  if(!loaded){
    return null;
  }


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
