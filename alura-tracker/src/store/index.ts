import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import IProjeto from "@/interfaces/IProjeto"

interface Estado {
  projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: []
  },
  mutations: {
    'ADICIONA_PROJETO'(state, nomdeDoProjeto: string){
      const projeto = {
        id: new Date().toISOString(),
        nome: nomdeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    }
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}