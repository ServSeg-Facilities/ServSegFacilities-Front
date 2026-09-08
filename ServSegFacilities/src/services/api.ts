import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const normalizarBaseURL = (url?: string) => {
  if (!url) return undefined;

  const valorLimpo = url.trim().replace(/\/+$/, "");

  return valorLimpo.endsWith("/api")
    ? valorLimpo
    : `${valorLimpo}/api`;
};

const host = Platform.OS === "android"
  ? "10.0.2.2"
  : "localhost";

const porta = process.env.EXPO_PUBLIC_PORTA || "5080";

const basePadrao = `http://${host}:${porta}/api`;

const enderecoApi =
  normalizarBaseURL(process.env.EXPO_PUBLIC_API) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_5080) ??
  normalizarBaseURL(process.env.EXPO_PUBLIC_API_URL) ??
  basePadrao;

const TOKEN_KEY =
  process.env.EXPO_PUBLIC_TOKEN_KEY || "JWTKEY";

console.log("========================================");
console.log("🔧 CONFIGURAÇÃO DA API");
console.log("🔧 Platform.OS:", Platform.OS);
console.log("🔧 EXPO_PUBLIC_API:", process.env.EXPO_PUBLIC_API);
console.log("🔧 EXPO_PUBLIC_API_5080:", process.env.EXPO_PUBLIC_API_5080);
console.log("🔧 EXPO_PUBLIC_API_URL:", process.env.EXPO_PUBLIC_API_URL);
console.log("🔧 HOST PADRÃO:", host);
console.log("🔧 PORTA PADRÃO:", porta);
console.log("🔧 BASE PADRÃO:", basePadrao);
console.log("🔧 BASE URL FINAL:", enderecoApi);
console.log("🔧 TOKEN KEY:", TOKEN_KEY);
console.log("========================================");

export const api = axios.create({
  baseURL: enderecoApi,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  console.log(
    "🔐 SET AUTH TOKEN:",
    token ? "TOKEN RECEBIDO" : "TOKEN REMOVIDO"
  );

  authToken = token;
};

export const getAuthToken = async (): Promise<string | null> => {
  if (authToken) {
    console.log("🔐 TOKEN RECUPERADO DA MEMÓRIA");
    return authToken;
  }

  console.log("🔐 TOKEN NÃO ESTÁ NA MEMÓRIA");
  console.log("🔐 BUSCANDO NO ASYNC STORAGE...");
  console.log("🔐 TOKEN KEY:", TOKEN_KEY);

  const token = await AsyncStorage.getItem(TOKEN_KEY);

  console.log(
    "🔐 ASYNC STORAGE:",
    token ? "TOKEN ENCONTRADO" : "TOKEN NÃO ENCONTRADO"
  );

  if (token) {
    authToken = token;
  }

  return token;
};

api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();

    const urlCompleta = `${config.baseURL || ""}${config.url || ""}`;

    console.log("");
    console.log("========================================");
    console.log("🚀 REQUISIÇÃO API");
    console.log("🚀 MÉTODO:", config.method?.toUpperCase());
    console.log("🚀 BASE URL:", config.baseURL);
    console.log("🚀 URL:", config.url);
    console.log("🚀 URL COMPLETA:", urlCompleta);
    console.log("🚀 TIMEOUT:", config.timeout);
    console.log("🚀 PLATFORM:", Platform.OS);

    console.log(
      "🚀 TOKEN:",
      token ? "ENCONTRADO" : "NÃO ENCONTRADO"
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🚀 AUTHORIZATION: Bearer [TOKEN]");
    } else {
      console.log("🚀 AUTHORIZATION: NÃO ENVIADO");
    }

    console.log("🚀 PARAMS:", config.params);
    console.log("🚀 DATA:", config.data);
    console.log("🚀 HEADERS:", {
      ...config.headers,
      Authorization: token ? "Bearer [TOKEN]" : undefined,
    });

    console.log("========================================");

    return config;
  },
  (error) => {
    console.log("");
    console.log("❌ ERRO AO PREPARAR REQUISIÇÃO");
    console.log("❌ MESSAGE:", error?.message);
    console.log("❌ CODE:", error?.code);
    console.log("❌ ERROR:", error);

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("");
    console.log("========================================");
    console.log("✅ RESPOSTA API");
    console.log("✅ STATUS:", response.status);
    console.log("✅ STATUS TEXT:", response.statusText);
    console.log("✅ URL:", `${response.config.baseURL}${response.config.url}`);
    console.log("✅ DATA:", response.data);
    console.log("========================================");

    return response;
  },
  (error) => {
    console.log("");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("❌❌❌ ERRO DE REDE / API ❌❌❌");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    console.log("❌ MESSAGE:", error?.message);
    console.log("❌ CODE:", error?.code);
    console.log("❌ NAME:", error?.name);

    if (error?.config) {
      console.log("");
      console.log("📡 CONFIGURAÇÃO DA REQUISIÇÃO");
      console.log("📡 MÉTODO:", error.config.method?.toUpperCase());
      console.log("📡 BASE URL:", error.config.baseURL);
      console.log("📡 URL:", error.config.url);
      console.log(
        "📡 URL COMPLETA:",
        `${error.config.baseURL || ""}${error.config.url || ""}`
      );
      console.log("📡 TIMEOUT:", error.config.timeout);
      console.log("📡 DATA:", error.config.data);
    }

    if (error?.response) {
      console.log("");
      console.log("📥 SERVIDOR RESPONDEU");
      console.log("📥 STATUS:", error.response.status);
      console.log("📥 STATUS TEXT:", error.response.statusText);
      console.log("📥 DATA:", error.response.data);
      console.log("📥 HEADERS:", error.response.headers);
    } else {
      console.log("");
      console.log("⚠️ O SERVIDOR NÃO ENVIOU RESPOSTA");
      console.log("⚠️ Isso normalmente indica erro de conexão,");
      console.log("⚠️ timeout, HTTP bloqueado ou servidor inacessível.");
    }

    if (error?.request) {
      console.log("");
      console.log("📤 REQUEST EXISTE");
      console.log("📤 REQUEST TYPE:", error.request?.constructor?.name);
    }

    console.log("");
    console.log("🔎 ERRO COMPLETO:", error);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    return Promise.reject(error);
  }
);