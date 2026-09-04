import { LogHistoricoRegistroPonto } from "../@types/detalhesRegistro";
import { api } from "./api";

// O endpoint retorna TODOS os registros do usuário.
export const DetalhesRegistroService = {
  // Faz a requisição para:
  // GET /HistoricoRegistroPonto
  async buscarHistorico(): Promise<LogHistoricoRegistroPonto[]> {
    const resposta = await api.get<LogHistoricoRegistroPonto[]>(
      "HistoricoRegistroPonto"
    );
    
    // Retorna somente os dados da resposta.
    return resposta.data;
  }

};
