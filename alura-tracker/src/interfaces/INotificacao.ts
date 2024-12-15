export enum TipoNotificacao {
  SUCESSO,
  FALHA,
  ATENCAO,
  DARK
}

export interface INotificacao {
  titulo: string
  texto: string
  tipo: TipoNotificacao
  id: number
}