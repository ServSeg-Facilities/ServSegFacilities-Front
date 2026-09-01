export interface LocalizacaoRegistro {
  latitude: number;
  longitude: number;
  precisao: number;
}

export interface RegistroHorario {
  horario: string;
  localizacao: LocalizacaoRegistro;
}

export interface DetalhesRegistro {
  // Usuário
  nome: string;

  // Registro
  registroPontoId: number;
  dataHoraPonto: string;

  entrada: RegistroHorario;
  saida?: RegistroHorario;

  // Empresa
  razaoSocial: string;
}