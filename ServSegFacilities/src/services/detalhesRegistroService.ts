import { ListaRecebida } from "../@types/lista";
import { api } from "./api";

// O endpoint retorna TODOS os registros do usuário.
export const DetalhesRegistroService = {
  // Faz a requisição para:
  // GET /HistoricoRegistroPonto
  async buscarHistoricoId(historicoId: number | string): Promise<ListaRecebida> {
    const resposta = await api.get<ListaRecebida>(`HistoricoRegistroPonto/ObterHistoricoPorId/${historicoId}`);
    
    // Retorna somente os dados da resposta.
    return resposta.data;
  }

};
