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
        />
      </div>
      <div class="column is-6">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
          <section class="ml-5">
            <strong class="is-size-2">{{ tempoDecorrido }}</strong>
          </section>

          <div>
            <button
              class="button mr-5"
              @click="iniciar"
            >
              <span class="icon">
                <i class="fas fa-play"></i>
              </span>
              <span>play</span>
            </button>
            <button
              class="button"
              @click="finalizar"
            >
              <span class="icon">
                <i class="fas fa-stop"></i>
              </span>
              <span>stop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Formulário",
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
    };
  },
  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);
    },
  },
  methods: {
    iniciar() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++;
      }, 1000);
    },
    finalizar() {
      clearInterval(this.cronometro);
    },
  },
});
</script>

<style lang="">
</style>