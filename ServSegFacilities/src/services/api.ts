import axios from "axios";
import { Platform } from "react-native";

const normalizarBaseURL = (url?: string) => {
  if (!url) return undefined;

  const valorLimpo = url.trim().replace(/\/+$/, "");
  return valorLimpo.endsWith("/api")
    ? valorLimpo
    : `${valorLimpo}/api`;
};

const host = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const porta = process.env.EXPO_PUBLIC_PORTA || "5080";
const basePadrao = `http://${host}:${porta}/api`;
const enderecoApi =
  normalizarBaseURL(process.env.EXPO_PUBLIC_API) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_5080) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_URL) ??
  basePadrao;

export const api = axios.create({
  baseURL: enderecoApi,
  timeout: 10000,
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
