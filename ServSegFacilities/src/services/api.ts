import axios from "axios";
import { Platform } from "react-native";

// Definindo o host local conforme a plataforma (Android Emulator usa 10.0.2.2, Web/iOS usa localhost)
const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const porta = process.env.EXPO_PUBLIC_PORTA || '5080';
const enderecoApi = process.env.EXPO_PUBLIC_API_URL || `http://${host}:${porta}/api`;

export const api = axios.create({
  baseURL: enderecoApi,
  timeout: 10000,
});
