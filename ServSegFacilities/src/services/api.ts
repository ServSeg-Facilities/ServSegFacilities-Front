import axios from "axios";
import { Platform } from "react-native";

// 1. Define o host local dinamicamente caso a variável de ambiente não esteja preenchida
const host = Platform.OS === "android" ? "10.0.2.2" : "localhost";

// 2. Define a URL base (prioriza o .env, senão constrói a URL padrão)
const baseURL = process.env.EXPO_PUBLIC_API_URL || `http://${host}:5080/api`;

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//conexao com api