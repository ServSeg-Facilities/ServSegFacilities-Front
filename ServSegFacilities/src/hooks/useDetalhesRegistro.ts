import { useEffect, useState } from "react";
import { DetalhesRegistroService } from "../services/detalhesRegistroService";
import { ListaConvertida } from "../@types/lista";

export function useDetalhesRegistro(historicoId: string) {
  const [detalhes, setDetalhes] = useState<ListaConvertida | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarDetalhesRegistro() {
    console.log("======================================");
    console.log("🔎 INÍCIO - carregarDetalhesRegistro");
    console.log("🔎 historicoId recebido:", historicoId);
    console.log("======================================");

    if (!historicoId) {
      console.log("❌ historicoId NÃO informado");
      setLoading(false);
      setError("Histórico do registro não informado.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log("🌐 Chamando buscarHistoricoId...");
      const respostaService = await DetalhesRegistroService.buscarHistoricoId(historicoId);

      // Trata se a API retornar array [ {...} ] ou objeto direto { ... }
      const historico = Array.isArray(respostaService) ? respostaService[0] : respostaService;

      console.log("✅ buscarHistoricoId respondeu!");
      console.log("📦 historico recebido:", historico);

      if (!historico) {
        throw new Error("Registro de histórico não encontrado na resposta.");
      }

      const detalhesConvertidos: ListaConvertida = {
        historicoId: historico.historicoId,
        registroPontoEntradaId: historico.registroPontoEntradaId,
        registroPontoSaidaId: historico.registroPontoSaidaId,
        dataHoraPontoEntrada: historico.dataHoraPontoEntrada,
        dataHoraPontoSaida: historico.dataHoraPontoSaida,
        latitudeEntrada: historico.latitudeEntrada,
        latitudeSaida: historico.latitudeSaida,
        longitudeEntrada: historico.longitudeEntrada,
        longitudeSaida: historico.longitudeSaida,

        dataPontoEntrada: historico.dataHoraPontoEntrada
          ? formatarData(historico.dataHoraPontoEntrada)
          : "-",

        dataPontoSaida: historico.dataHoraPontoSaida
          ? formatarData(historico.dataHoraPontoSaida)
          : null,

        horaPontoEntrada: historico.dataHoraPontoEntrada
          ? formatarHorario(historico.dataHoraPontoEntrada)
          : "-",

        horaPontoSaida: historico.dataHoraPontoSaida
          ? formatarHorario(historico.dataHoraPontoSaida)
          : null,

        nomeUsuario: historico.nomeUsuario,
        nomeEmpresa: historico.nomeEmpresa,
      };

      console.log("✅ detalhesConvertidos criado:", detalhesConvertidos);
      setDetalhes(detalhesConvertidos);
    } catch (error: any) {
      console.log("======================================");
      console.log("❌ ERRO NO carregarDetalhesRegistro:", error);
      console.log("======================================");

      const mensagem =
        error.response?.data?.message ??
        error.response?.data ??
        error.message ??
        "Não foi possível carregar as informações do registro de ponto.";

      setError(
        typeof mensagem === "string"
          ? mensagem
          : JSON.stringify(mensagem)
      );
    } finally {
      console.log("🏁 FINALIZANDO carregarDetalhesRegistro");
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDetalhesRegistro();
  }, [historicoId]);

  function formatarHorario(dataHora: string): string {
    if (!dataHora) return "";
    return new Date(dataHora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatarData(dataHora: string): string {
    if (!dataHora) return "";
    const partes = dataHora.split("T")[0].split("-");
    if (partes.length < 3) return dataHora;
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }

  return {
    detalhes,
    loading,
    error,
    carregarDetalhesRegistro,
  };
}