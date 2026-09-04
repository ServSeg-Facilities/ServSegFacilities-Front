import { useEffect, useState } from "react";
import { Lista} from "../@types/detalhesRegistro";
import { ListaService } from "../services/listaService";

export function useListaRegistroPonto() {
  const [registros, setRegistros] = useState<Lista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarRegistros() {
    try {
      setLoading(true);
      setError(null);

      const historico = await ListaService.buscarHistorico();

      setRegistros(historico);
    } catch (error: any) {
      const mensagem =
        error.response?.data?.message ??
        error.response?.data ??
        "Não foi possível carregar os registros de ponto.";

      setError(
        typeof mensagem === "string"
          ? mensagem
          : JSON.stringify(mensagem)
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarRegistros();
  }, []);

  return {
    registros,
    loading,
    error,
    carregarRegistros,
  };
}