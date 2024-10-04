<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-6 is-flex is-align-items-center"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          @input="checarDescricao"
          v-model="descricao"
        />
      </div>
      <div class="column is-6">
        <Temporizador
          @aoTemporizadorFinalizado="finalizarTarefa"
          :descricaoInvalida="descricaoInvalida"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  components: { Temporizador },
  name: "Formulário",
  emits: ["aoSalvarTarefa"],
  data() {
    return {
      descricao: "",
      descricaoInvalida: true,
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
      });
      this.descricao = "";
      this.descricaoInvalida = true;
    },
    checarDescricao() {
      this.descricaoInvalida = this.descricao.length <= 5;
    },
  },
});
</script>

<style lang="">
</style>