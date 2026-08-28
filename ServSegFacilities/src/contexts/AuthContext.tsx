import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { AuthContextData, Login, Usuario, UsuarioPayload } from "../@types/autenticacao";
import { autenticacaoService } from "../services/autenticacaoService";

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY || "ChaveToken";

// 1. Criamos o Contexto que vai guardar os dados globais de login
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function decodificarToken(token: string): Usuario | null {
  try {
    // Decodifica a string criptografada do JWT em um objeto JS
    const decoded = jwtDecode<UsuarioPayload>(token);

    // Mapeia as chaves (claims) do backend para o nosso objeto Usuario
    return {
      id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || "",
      nome: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "",
      email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "",
    };
  } catch {
    // Se o token for inválido ou estiver corrompido, retorna null
    return null;
  }
}

// 3. Componente Provedor (Provider): envolve as telas e compartilha os dados de autenticação
//React.FC:significa React.FunctionComponent (Componente Funcional do React).
//Trata-se de um tipo nativo do TypeScript usado para definir que uma constante ou variável é um componente funcional do React.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//O AuthProvider é um componente React que vai abraçar/envolver outros componentes (children) dentro dele."
  const [usuario, setUsuario] = useState<Usuario | null>(null); // Guarda o usuário logado ({ nome, email, id })
  const [token, setToken] = useState<string | null>(null);       // Guarda a string do token JWT
  const [loading, setLoading] = useState(true);                  // Indica se ainda está verificando o token ao abrir o app

  // Executado UMA vez assim que o aplicativo é aberto
  useEffect(() => {
    // Busca se já existe um token salvo do login anterior
    AsyncStorage.getItem(TOKEN_KEY)
      .then((tokenSalvo) => {
        if (tokenSalvo) {
          setToken(tokenSalvo);
          setUsuario(decodificarToken(tokenSalvo)); // Preenche o usuário automaticamente
        }
      })
      .finally(() => setLoading(false)); // Finaliza o carregamento inicial
  }, []);

  // Função para fazer Login
  async function login(dados: Login) {
    // Envia e-mail e senha para a API
    const resposta = await autenticacaoService.login(dados);

    if (resposta.token) {
      setToken(resposta.token);                         // Guarda o token no estado
      setUsuario(decodificarToken(resposta.token));     // Decodifica e salva o usuário no estado
    }
  }

  // Função para fazer Logout (Sair da Conta)
  async function logout() {
    await AsyncStorage.removeItem(TOKEN_KEY); // Apaga o token do celular
    setToken(null);                           // Limpa o token da memória
    setUsuario(null);                         // Limpa o usuário da memória
    router.replace("/login");                 // Redireciona de volta para a tela de login
  }

  return (
    // Compartilha o estado e as funções com todos os componentes filhos
    <AuthContext.Provider value={{ usuario, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook customizado para consumir os dados do AuthContext de forma rápida nas telas
export function useAuth() {
  return useContext(AuthContext);
}