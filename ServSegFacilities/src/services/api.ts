import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Normaliza a URL da API para garantir que termine com /api
const normalizarBaseURL = (url?: string) => {
  if (!url) return undefined;

  const valorLimpo = url.trim().replace(/\/+$/, "");

  return valorLimpo.endsWith("/api")
    ? valorLimpo
    : `${valorLimpo}/api`;
};

// Define o host padrão conforme a plataforma
const host = Platform.OS === "android"
  ? "10.0.2.2"
  : "localhost";

// Porta padrão
const porta = process.env.EXPO_PUBLIC_PORTA || "5080";

// URL padrão
const basePadrao = `http://${host}:${porta}/api`;

// URL da API
const enderecoApi =
  normalizarBaseURL(process.env.EXPO_PUBLIC_API) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_5080) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_URL) ??
  basePadrao;

// Chave usada para armazenar o JWT
const TOKEN_KEY =
  process.env.EXPO_PUBLIC_TOKEN_KEY || "JWTKEY";

export const api = axios.create({
  baseURL: enderecoApi,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Guarda o token em memória depois que o login acontece.
// O AsyncStorage continua sendo a fonte persistente.
let authToken: string | null = null;

// Define o token em memória
export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// Recupera o token.
// Primeiro tenta a memória; se não existir, busca no AsyncStorage.
export const getAuthToken = async (): Promise<string | null> => {
  if (authToken) {
    return authToken;
  }

  const token = await AsyncStorage.getItem(TOKEN_KEY);

  if (token) {
    authToken = token;
  }

  return token;
};

// Adiciona automaticamente o JWT nas requisições
api.interceptors.request.use(async (config) => {
  const token = await getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});