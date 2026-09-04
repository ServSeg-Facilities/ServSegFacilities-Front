// ====================
//  DADOS VINDOS DA API
// ====================
export interface LogHistoricoRegistroPonto {
  historicoId: number;
  registroPontoId: number;
  tipoRegistro: "Entrada" | "Saída" | "Saida";
  dataHoraPonto: string;

  latitude: number;
  longitude: number;
  precisao: number;

  nomeUsuario: string;
  nomeEmpresa: string;
}


// =======================================
// O QUE É UTILIZADO PELA TELA DE DETALHES
// =======================================
export interface DetalhesRegistro {
  nome: string;
  dataHoraPonto: string;
  razaoSocial: string;

  // Registro de entrada
  entrada: {
    registroPontoId: number;
    horario: string;
    localizacao: {
      latitude: number;
      longitude: number;
      precisao: number;
    };
  };

  // Registro de saída.
  // É opcional porque pode ainda não existir.
  saida?: {
    registroPontoId: number;
    horario: string;
    localizacao: {
      latitude: number;
      longitude: number;
      precisao: number;
    };
  };

}