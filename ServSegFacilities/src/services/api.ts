import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const normalizarBaseURL = (url?: string) => {
  if (!url) return undefined;

  const valorLimpo = url.trim().replace(/\/+$/, "");

  return valorLimpo.endsWith("/api") ? valorLimpo : `${valorLimpo}/api`;
};

const host = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const porta = process.env.EXPO_PUBLIC_PORTA || "5080";
const basePadrao = `http://${host}:${porta}/api`;

const enderecoApi =
  normalizarBaseURL(process.env.EXPO_PUBLIC_API) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_5080) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_URL) ??
  basePadrao;

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY || "JWTKEY";

console.log("🔧 API Base URL:", enderecoApi);

export const api = axios.create({
  baseURL: enderecoApi,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = async (): Promise<string | null> => {
  if (authToken) return authToken;

  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    authToken = token;
  }

  return token;
};

// Interceptor de Requisição
api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const metodo = config.method?.toUpperCase();
    const endpoint = config.url;
    console.log(`🚀 [API Request] ${metodo} -> ${endpoint}`);

    return config;
  },
  (error) => {
    console.log("❌ [API Request Error]:", error?.message);
    return Promise.reject(error);
  }
);

// Interceptor de Resposta
api.interceptors.response.use(
  (response) => {
    const metodo = response.config.method?.toUpperCase();
    const endpoint = response.config.url;
    console.log(`✅ [API Response] ${response.status} | ${metodo} -> ${endpoint}`);

    return response;
  },
  (error) => {
    const status = error?.response?.status;
    const metodo = error?.config?.method?.toUpperCase();
    const endpoint = error?.config?.url;

    if (status) {
      console.log(`❌ [API Error] ${status} | ${metodo} -> ${endpoint}`);
    } else {
      console.log(`⚠️ [API Network/Timeout Error]: ${error?.message || "Sem resposta do servidor"}`);
    }

    return Promise.reject(error);
  }
);