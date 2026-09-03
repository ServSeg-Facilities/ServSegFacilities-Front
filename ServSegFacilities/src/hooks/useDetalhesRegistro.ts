import { useEffect, useState } from "react";
import { DetalhesRegistro } from "../@types/detalhesRegistro";
import { DetalhesRegistroService } from "../services/detalhesRegistroService";

export function useDetalhesRegistro(data?: string) {
  // ============================================================
  // ESTADOS -> Guarda os dados já organzizados para a tela
  // ============================================================
  // Enquanto a API não retornar, o valor é null.
  const [detalhes, setDetalhes] = useState<DetalhesRegistro | null>(null);
  // Controla o carregamento da API.
  const [loading, setLoading] = useState(true);
  // Guarda uma mensagem de erro, caso aconteça.
  const [error, setError] = useState<string | null>(null);


  // =============================
  // BUSCA E ORGANIZAÇÃO DOS DADOS
  // =============================
  async function carregarDetalhesRegistro() {
    // Se a tela não recebeu uma data pelo Router,
    // não tem como descobrir qual dia deve ser exibido.
    if (!data) {
      setLoading(false);
      setError("Data do registro não informada.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // A API retorna todos os registros do usuário.
      const historico = await DetalhesRegistroService.buscarHistorico();

      //Filtra somente os registros da data selecionada
      const registrosDoDia = historico.filter((registro) => {
        const dataRegistro = registro.dataHoraPonto.split("T")[0];
        return dataRegistro == data;
      });

      //Procura registros de entrada
      const entrada = registrosDoDia.find(
        (registro) => registro.tipoRegistro === "Entrada",
      );

      //Procura registros de saída
      const saida = registrosDoDia.find(
        (registro) => registro.tipoRegistro === "Saída" || registro.tipoRegistro === "Saida",
      );

      //Verificação de existência de entrada -> A entrada é obrigatória para montar o detalhe.
      if (!entrada) {
        setDetalhes(null);
        setError("Registro de entrada não encontrado");
        return;
      }

      // ------------------
      // OBJETO PARA A TELA
      // ------------------
      // Transforma o formato da API -> LogHistoricoRegistroPonto 
      // Para formato utilizado pelo componente -> DetalhesRegistro
      const detalhes: DetalhesRegistro = {
        // Informações gerais
        nome: entrada.nomeUsuario,
        dataHoraPonto: formatarData(entrada.dataHoraPonto),
        razaoSocial: entrada.nomeEmpresa,
        //Entrada
        entrada: {
          registroPontoId: entrada.registroPontoId,
          // Converte: 2026-09-02T08:00:00 ->  08:00
          horario: formatarHorario(entrada.dataHoraPonto),
          //Localizacao
          localizacao: {
            latitude: entrada.latitude,
            longitude: entrada.longitude,
            precisao: entrada.precisao,
          },
        },

        //Saída -> opcional.  Se existir, o objeto é monstado. Se não existir, fica undefined.
        saida: saida
          ? {
              registroPontoId: saida.registroPontoId,
              // Converte: 2026-09-02T08:00:00 ->  08:00
              horario: formatarHorario(saida.dataHoraPonto),
               //Localizacao
              localizacao: {
                latitude: saida.latitude,
                longitude: saida.longitude,
                precisao: saida.precisao,
              },
            }
          : undefined,
      };
      //Salva os dados
      setDetalhes(detalhes);
      
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
  }, [data]);

  //Retorno do hook
  return {
    detalhes,
    loading,
    error,
    carregarDetalhesRegistro,
  };

  // =================
  // FORMATAÇÃO DATA/HORA
  // =================
  function formatarHorario(dataHora: string): string {
    return new Date(dataHora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatarData(dataHora: string): string {
  const [ano, mes, dia] = dataHora
    .split("T")[0]
    .split("-");

  return `${dia}/${mes}/${ano}`;
}
}
