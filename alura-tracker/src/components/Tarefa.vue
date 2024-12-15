<template>
  <Box>
    <div class="columns is-mobile">
      <div class="column is-size-7-mobile is-size-5-widescreen is-align-content-center">
        {{ tarefa.descricao }}
      </div>
      <div class="column is-size-7-mobile is-size-5-widescreen is-align-content-center">
        {{ tarefa.projeto?.nome }}
      </div>
      <div class="column is-align-content-center">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ITarefa from "./../interfaces/ITarefa";
import Cronometro from "./Cronometro.vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "Tarefa",
  components: {
    Cronometro,
    Box,
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
});
</script>
