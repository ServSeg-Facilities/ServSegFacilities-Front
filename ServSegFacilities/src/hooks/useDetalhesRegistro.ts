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
    // Se a tela não recebeu um id pelo Router,
    // não tem como descobrir quais informações devem ser exibidas.
    if (!historicoId) {
      setLoading(false);
      setError("Histórico do registro não informado.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // A API retorna os registros do usuário com base no id.
      const historico =
        await DetalhesRegistroService.buscarHistoricoId(historicoId);

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

        dataPontoEntrada: formatarData(historico.dataHoraPontoEntrada),

        // Se existir uma data de saída no histórico, formate essa data
        // caso contrário, defina o campo como nulo.
        dataPontoSaida: historico.dataHoraPontoSaida
          ? formatarData(historico.dataHoraPontoSaida)
          : null,

        horaPontoEntrada: formatarHorario(historico.dataHoraPontoEntrada),

        // Se existir um horário de saída no histórico, formate essa data
        // caso contrário, defina o campo como nulo.
        horaPontoSaida: historico.dataHoraPontoSaida
          ? formatarHorario(historico.dataHoraPontoSaida)
          : null,

        nomeUsuario: historico.nomeUsuario,

        nomeEmpresa: historico.nomeEmpresa,
      };
      
      //Salva os dados
      setDetalhes(detalhesConvertidos);
    } catch (error: any) {
      //Tratamento de erro
      const mensagem =
        error.response?.data?.message ??
        error.response?.data ??
        "Não foi possível carregar as informações do registro de ponto.";

      setError(
        typeof mensagem === "string" ? mensagem : JSON.stringify(mensagem),
      );
    } finally {
      // Independentemente de sucesso ou erro, finaliza-se o carregamento.
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
