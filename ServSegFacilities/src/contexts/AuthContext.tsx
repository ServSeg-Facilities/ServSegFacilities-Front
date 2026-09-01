import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { AuthContextData, Login, Usuario, UsuarioPayload } from "../@types/autenticacao";
import { autenticacaoService } from "../services/autenticacaoService";

//? Usuário mockado feito para testes rápidos sem necessidade de rodar API.
const MOCK_USUARIO = {
  email: "mock@mock",
  senha: "mock",
};

const MOCK_TOKEN = "mock_jwt_token_servseg_testes";
const MOCK_USUARIO_DADOS: Usuario = {
  id: "999",
  nome: "Usuário Mock",
  email: MOCK_USUARIO.email,
};

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY || "ChaveToken";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function decodificarToken(token: string): Usuario | null {
  if (token === MOCK_TOKEN) {
    return MOCK_USUARIO_DADOS;
  }

  try {
    const decoded = jwtDecode<UsuarioPayload>(token);

    return {
      id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || "",
      nome: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "",
      email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "",
    };
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY)
      .then((tokenSalvo) => {
        if (tokenSalvo) {
          setToken(tokenSalvo);
          setUsuario(decodificarToken(tokenSalvo));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(dados: Login) {
    //* CORREÇÃO: Comparação case-insensitive (ignora maiúsculas do teclado móvel).
    const emailLimpo = dados.email.trim().toLowerCase();
    const senhaLimpa = dados.senha.trim();

    if (emailLimpo === MOCK_USUARIO.email && senhaLimpa === MOCK_USUARIO.senha) {
      console.log("⚡ [MOCK] Autenticado com sucesso!");
      await AsyncStorage.setItem(TOKEN_KEY, MOCK_TOKEN);
      setToken(MOCK_TOKEN);
      setUsuario(MOCK_USUARIO_DADOS);
      return;
    }

    //? Envia e-mail e senha para a API real.
    const resposta = await autenticacaoService.login(dados);

    if (resposta.token) {
      await AsyncStorage.setItem(TOKEN_KEY, resposta.token);
      setToken(resposta.token);
      setUsuario(decodificarToken(resposta.token));
    }
  }

  async function logout() {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUsuario(null);
    router.replace("/login");
  }

  return (
    <AuthContext.Provider value={{ usuario, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}