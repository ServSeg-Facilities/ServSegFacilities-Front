import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const host = Platform.OS === "android" ? "10.0.2.2": "localhost";

const normalizarBaseURL = (url?: string) => {
  if (!url) return undefined;

  const valorLimpo = url.trim().replace(/\/+$/, "");

  return valorLimpo.endsWith("/api") ? valorLimpo : `${valorLimpo}/api`;
};

const porta = process.env.EXPO_PUBLIC_PORTA || "5080";

const baseURL =
  normalizarBaseURL(process.env.EXPO_PUBLIC_API) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_5080) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_URL) ??
  `http://${host}:${porta}/api`;

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken: string | null = process.env.EXPO_PUBLIC_TOKEN || null;

// Função para atualizar manualmente o token na memória (usada na hora do Login)
export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// Função assíncrona que busca o token na memória. 
// Caso não esteja na memória, busca a chave do token gravada no AsyncStorage do dispositivo
export const getAuthToken = async (): Promise<string | null> => {
  if (authToken) return authToken;
  const tokenSalvo = await AsyncStorage.getItem(
    process.env.EXPO_PUBLIC_TOKEN_KEY!
  );
  if (tokenSalvo) {
    authToken = tokenSalvo; // Salva em memória para as próximas chamadas
  }
  return authToken;
};

api.interceptors.request.use(async(config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});