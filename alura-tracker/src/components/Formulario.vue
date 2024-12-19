<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column">
        <div class="select">
          <select
            v-model="idProjeto"
            @change="checaProjeto($event)"
          >
            <option value="">Selecione o projeto</option>
            <option
              v-for="projeto in projetos"
              :key="projeto.id"
              :value="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="columns is-desktop">
      <div
        class="column is-flex is-align-items-center"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          @input="checarDescricao"
          v-model="descricao"
          :disabled="projetoInvalido"
        />
      </div>
      <div class="column ">
        <Temporizador
          @aoTemporizadorFinalizado="salvarTarefa"
          :descricaoInvalida="descricaoInvalida"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  components: { Temporizador },
  name: "Formulário",
  emits: ["aoSalvarTarefa"],
  data() {
    return {
      descricao: "",
      descricaoInvalida: true,
      idProjeto: "",
      projetoInvalido: true,
    };
  },
  methods: {
    salvarTarefa(tempoEmSegundos: number): void {
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoEmSegundos,
        descricao: this.descricao,
        projeto: this.projetos.find((proj) => proj.id === this.idProjeto),
      });
      this.descricao = "";
      this.descricaoInvalida = true;
    },
    checarDescricao() {
      this.descricaoInvalida = this.descricao.length <= 5;
    },
    checaProjeto(event: Event): boolean {
      const input = event.target as HTMLInputElement | null;
      return input?.value
        ? (this.projetoInvalido = false)
        : (this.projetoInvalido = true);
    },
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projeto.projetos),
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>