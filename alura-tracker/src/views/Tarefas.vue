<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <Box v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </Box>
  </div>
  <div
    v-if="tarefaSelecionada"
    class="modal"
    :class="{ 'is-active': tarefaSelecionada }"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando uma tarefa</p>
        <button
          v-if="!checarTarefaSelecionada"
          class="delete"
          aria-label="close"
          @click="fecharModal"
        ></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label
            for="descricaoDaTarefa"
            class="label"
          >
            Descrição
          </label>
          <input
            type="text"
            class="input"
            id="descricaoDaTarefaSelecionada"
            v-model="tarefaSelecionada.descricao"
          />
        </div>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-space-between">
        <div>
          <button
            @click="alterarTarefa"
            class="button is-success mr-5"
            :disabled="checarTarefaSelecionada"
          >Salvar alterações</button>
          <button
            v-if="!checarTarefaSelecionada"
            @click="fecharModal"
            class="button"
          >Cancelar</button>
        </div>
        <div>
          <button
            @click="deletarTarefa(tarefaSelecionada.id)"
            class="button is-danger"
          >Deletar Tarefa</button>
        </div>

      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ITarefa from "./../interfaces/ITarefa";
import Formulario from "./../components/Formulario.vue";
import Tarefa from "./../components/Tarefa.vue";
import Box from "./../components/Box.vue";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_TAREFA,
} from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas && this.tarefas.length === 0;
    },
    checarTarefaSelecionada(): boolean | undefined {
      const descricao = this.tarefaSelecionada?.descricao;
      return !descricao || descricao?.length < 5 ? true : false;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
    deletarTarefa(id: number): void {
      this.store.dispatch(REMOVER_TAREFA, id).then(() => this.fecharModal());
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
    };
  },
});
</script>
