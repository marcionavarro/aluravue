import http from '@/http/index';
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS, REMOVER_TAREFA } from "@/store/tipo-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, EXCLUIR_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id == tarefa.id)
      state.tarefas[index] = tarefa;
    },
    [EXCLUIR_TAREFA](state, id: number) {
      state.tarefas = state.tarefas.filter(t => t.id !== id)
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas')
        .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERAR_TAREFA, tarefa))
    },
    [REMOVER_TAREFA]({ commit }, id: string) {
      return http.delete(`/tarefas/${id}`)
        .then(() => commit(EXCLUIR_TAREFA, id))
    },
  },
}