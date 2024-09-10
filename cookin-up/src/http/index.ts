import type ICategoria from "@/interfaces/ICategoria"
import type IReceita from "@/interfaces/IReceita"

async function obterDadosUrl<T>(url: string) {
  const resposta = await fetch(url)
  return resposta.json() as T
}

export async function obterCategorias() {
  const dataUrl = 'https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/bf463b47860043da3b3604ca60cffc3ad1ba9865/categorias.json'
  return obterDadosUrl<ICategoria[]>(dataUrl)
}

export async function obterReceitas() {
  const dataUrl = 'https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/bf463b47860043da3b3604ca60cffc3ad1ba9865/receitas.json'
  return obterDadosUrl<IReceita[]>(dataUrl)
}