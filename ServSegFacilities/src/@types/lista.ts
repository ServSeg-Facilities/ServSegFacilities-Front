export interface Lista { //int e double = mumber
    HistoricoId: number;
    RegistroPontoId: number;
    NomeUsuario: string;
    NomeEmpresa: string;
    TipoRegistro: string;
    DataHoraPonto: string;
    Latitude: number;
    Longitude: number;
    Precisao: number;
    Status: boolean;
}
//Molde dos dados da api