import { DetalhesRegistro } from "../@types/detalhesRegistro";
import { api } from "./api";

export const DetalhesRegistroService = {
  async buscarPorId(id: number | string): Promise<DetalhesRegistro> {
    const resposta = await api.get<DetalhesRegistro>(`RegistroPonto/${id}`);
    return resposta.data;
  },
};
