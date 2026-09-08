export interface ListaRecebida {
  historicoId: number;

  registroPontoEntradaId: number;
  registroPontoSaidaId: number | null;

  dataHoraPontoEntrada: string;
  dataHoraPontoSaida: string | null;

  latitudeEntrada: number;
  latitudeSaida: number | null;

  longitudeEntrada: number;
  longitudeSaida: number | null;

  nomeUsuario: string;
  nomeEmpresa: string;
}

export interface ListaConvertida {
  historicoId: number;

  registroPontoEntradaId: number;
  registroPontoSaidaId: number | null;

  latitudeEntrada: number;
  latitudeSaida: number | null;

  longitudeEntrada: number;
  longitudeSaida: number | null;

  dataHoraPontoEntrada: string;
  dataHoraPontoSaida: string | null;

  dataPontoEntrada: string;
  dataPontoSaida: string | null;

  horaPontoEntrada: string;
  horaPontoSaida: string | null;

  nomeUsuario: string;
  nomeEmpresa: string;
}