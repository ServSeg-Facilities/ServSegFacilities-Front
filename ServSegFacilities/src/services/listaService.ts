import { Lista } from "../@types/lista";
import { api } from "./api";

export const listaService = {
    async listar(): Promise<Lista[]>{
        const resposta = await api.get<Lista[]>("Lista");

        return resposta.data;
    },
    //? buscarPorId ou algo semelhante a isso ficará aqui.
    //* },
    async cadastrar(dados: Lista): Promise<Lista>{
        const formData = new FormData();
        //? formData.append("nomeDeAlgo", dados.nomeDeAlgo);

        const resposta = await api.post<Lista>("Lista", formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
            },
        });

        return resposta.data;
    }
}