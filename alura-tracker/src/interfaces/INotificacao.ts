export enum tipoNotificacao {
  SUCESSO,
  FALHA,
  ATENCAO,
  DARK
}

export interface INotificacao {
  titulo: string
  texto: string
  tipo: tipoNotificacao
  id: number
}