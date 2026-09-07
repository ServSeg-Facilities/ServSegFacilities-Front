export interface ListaRecebida { //int e double = mumber
    registroPontoId: number;
    nomeUsuario: string;
    nomeEmpresa: string;
    tipoRegistro: string;
    latitude: number;
    longitude: number;
    dataHoraPonto: string;
    statusRegistroPonto: boolean;
    tipoRegistroId: number;
}
//Molde dos dados da api

export interface ListaConvertida { //int e double = mumber
    registroPontoId: number;
    nomeUsuario: string;
    nomeEmpresa: string;
    tipoRegistro: string;
    latitude: number;
    longitude: number;
    dataHoraPonto: string;
    dataPonto: string;
    horaPonto: string;
    statusRegistroPonto: boolean;
    tipoRegistroId: number;
}
//Molde dos dados da api