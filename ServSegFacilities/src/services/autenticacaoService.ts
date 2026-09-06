import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login, LoginResponse } from "../@types/autenticacao";
import { api, setAuthToken } from "./api";

export const autenticacaoService = {
    async login(dados: Login) : Promise<LoginResponse>{
        const {data} = await api.post<LoginResponse>("Autenticacao/login", dados);
        if(data.token){
            await AsyncStorage.setItem(process.env.EXPO_PUBLIC_TOKEN_KEY!, data.token)
            // Atualiza a variável de token na memória (dentro do arquivo api.ts)
            setAuthToken(data.token);
        }
        return data;
    }
}