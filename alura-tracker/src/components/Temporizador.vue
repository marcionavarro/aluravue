<template lang="">
 <div class="is-flex is-align-items-center is-justify-content-space-between">
          <Cronometro :tempoEmSegundos="tempoEmSegundos" />
          <div>
            <button
              class="button mr-5"
              @click="iniciar"
              :disabled="descricaoInvalida || cronometroRodando"
            >
              <span class="icon">
                <i class="fas fa-play"></i>
              </span>
              <span>play</span>
            </button>
            <button
              class="button"
              @click="finalizar"
              :disabled="!cronometroRodando"
            >
              <span class="icon">
                <i class="fas fa-stop"></i>
              </span>
              <span>stop</span>
            </button>
          </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "Temporizador",
  components: { Cronometro },
  props: {
    descricaoInvalida: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["aoTemporizadorFinalizado"],
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciar() {
      if (!this.descricaoInvalida) {
        this.cronometroRodando = true;
        this.cronometro = setInterval(() => {
          this.tempoEmSegundos++;
        }, 1000);
      }
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>

<style lang="">
</style>