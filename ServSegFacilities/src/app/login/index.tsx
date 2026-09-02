import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles } from "./login.styles";
import { Colors } from "../../constants/theme";
import { api, setAuthToken } from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Informe e-mail e senha para continuar.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await api.post("/Autenticacao/login", {
        email: email.trim(),
        senha: senha.trim(),
      });

      const token = resposta.data?.token;

      if (token) {
        setAuthToken(token);
        router.replace("/registrarPonto");
      } else {
        Alert.alert("Erro", "Não foi possível obter o token de autenticação.");
      }
    } catch (error: any) {
      const mensagem =
        error.response?.data?.mensagem ||
        error.response?.data?.message ||
        "E-mail ou senha inválidos.";
      Alert.alert("Atenção", mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.titulo}>ServSeg Facilities</Text>
        <Text style={styles.subtitulo}>Acesso ao sistema</Text>

        <View style={styles.card}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="seu.email@servseg.com"
            placeholderTextColor="#8EAAB8"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="Digite sua senha"
            placeholderTextColor="#8EAAB8"
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.8 },
              carregando && { opacity: 0.6 },
            ]}
            onPress={handleLogin}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
