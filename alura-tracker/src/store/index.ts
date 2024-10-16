import {InjectionKey} from 'vue'
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import IProjeto from "@/interfaces/IProjeto"
import {ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO} from "@/store/tipo-mutacoes";

interface Estado {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomdeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomdeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id)
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string){
            state.projetos = state.projetos.filter(proj => proj.id !== id)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}