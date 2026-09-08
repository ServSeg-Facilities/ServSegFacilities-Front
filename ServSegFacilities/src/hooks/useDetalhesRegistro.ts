import { useEffect, useState } from "react";
import { DetalhesRegistroService } from "../services/detalhesRegistroService";
import { ListaConvertida } from "../@types/lista";

export function useDetalhesRegistro(historicoId: string) {
  // ============================================================
  // ESTADOS -> Guarda os dados já organzizados para a tela
  // ============================================================
  // Enquanto a API não retornar, o valor é null.
  const [detalhes, setDetalhes] = useState<ListaConvertida | null>(null);
  // Controla o carregamento da API.
  const [loading, setLoading] = useState(true);
  // Guarda uma mensagem de erro, caso aconteça.
  const [error, setError] = useState<string | null>(null);

  // =============================
  // BUSCA E ORGANIZAÇÃO DOS DADOS
  // =============================
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
      console.log("🌐 historicoId enviado:", historicoId);

      const historicoLista =
        await DetalhesRegistroService.buscarHistoricoId(historicoId);

        const historico = historicoLista[0];

      console.log("✅ buscarHistoricoId respondeu!");
      console.log("📦 historico recebido:", historico);

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

        dataPontoEntrada: formatarData(
          historico.dataHoraPontoEntrada
        ),

        dataPontoSaida: historico.dataHoraPontoSaida
          ? formatarData(historico.dataHoraPontoSaida)
          : null,

        horaPontoEntrada: formatarHorario(
          historico.dataHoraPontoEntrada
        ),

        horaPontoSaida: historico.dataHoraPontoSaida
          ? formatarHorario(historico.dataHoraPontoSaida)
          : null,

        nomeUsuario: historico.nomeUsuario,
        nomeEmpresa: historico.nomeEmpresa,
      };

      console.log("✅ detalhesConvertidos criado:");
      console.log("📦 detalhesConvertidos:", detalhesConvertidos);

      setDetalhes(detalhesConvertidos);

      console.log("✅ setDetalhes executado");
    } catch (error: any) {
      console.log("======================================");
      console.log("❌ ERRO NO carregarDetalhesRegistro");
      console.log("❌ error:", error);
      console.log("❌ message:", error?.message);
      console.log("❌ response:", error?.response);
      console.log("❌ status:", error?.response?.status);
      console.log("❌ data:", error?.response?.data);
      console.log("======================================");

      const mensagem =
        error.response?.data?.message ??
        error.response?.data ??
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

  //Executa a busca quando a data mudar
  useEffect(() => {
    carregarDetalhesRegistro();
  }, [historicoId]);

  //Retorno do hook
  return {
    detalhes,
    loading,
    error,
    carregarDetalhesRegistro,
  };

  // ====================
  // FORMATAÇÃO DATA/HORA
  // ====================
  function formatarHorario(dataHora: string): string {
    return new Date(dataHora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatarData(dataHora: string): string {
    const [ano, mes, dia] = dataHora.split("T")[0].split("-");

    return `${dia}/${mes}/${ano}`;
  }
}
