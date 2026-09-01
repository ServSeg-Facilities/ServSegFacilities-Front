import { useEffect, useState } from "react";
import { DetalhesRegistro } from "../@types/detalhesRegistro";
import { DetalhesRegistroService } from "../services/detalhesRegistroService";

export function useDetalhesRegistro(id?: string) {
  const [detalhes, setDetalhes] = useState<DetalhesRegistro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarDetalhesRegistro() {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const informacao = await DetalhesRegistroService.buscarPorId(id);

      setDetalhes(informacao);
    } catch (error: any) {
      const mensagem =
        error.response?.data?.message ??
        error.response?.data ??
        "Não foi possível carregar as informações do registro de ponto.";

      setError(
        typeof mensagem === "string" ? mensagem : JSON.stringify(mensagem),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDetalhesRegistro();
  }, [id]);

  return {
    detalhes,
    loading,
    error,
    carregarDetalhesRegistro,
  };
}
