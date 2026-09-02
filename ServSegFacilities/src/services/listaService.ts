//Açoes, a fazeres, finalidades
//Acoes da lista
import { ListaRecebida } from "../@types/lista";
import { api } from "./api";

//
export const listaService = {
    async listarHistoricoPontos(): Promise<ListaRecebida[]> {
        const response = await api.get<ListaRecebida[]>("HistoricoRegistroPonto")
        return response.data;
    },

    async cadastrar(dados: ListaRecebida): Promise<ListaRecebida> {
        const formData = new FormData();
        //? formData.append("nomeDeAlgo", dados.nomeDeAlgo);

        const resposta = await api.post<ListaRecebida>("Lista", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return resposta.data;
    }
}