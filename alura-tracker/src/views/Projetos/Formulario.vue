<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label
          for="nomeDoProjeto"
          class="label"
        >Nome do projeto</label>
        <input
          type="text"
          class="input"
          id="nomeDoProjeto"
          @input="checarProjeto"
          v-model="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button
          class="button"
          type="submit"
          :disabled="projetoInvalido"
        >
          {{ buttonForm() }}
        </button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  NOTIFICAR,
} from "@/store/tipo-mutacoes";
import { tipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id === this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
      projetoInvalido: true,
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = "";
      this.store.commit(NOTIFICAR, {
        titulo: "Novo projeto foi salvo",
        texto: "Prontinho ;) seu projeto já está disponível.",
        tipo: tipoNotificacao.SUCESSO,
      });
      this.$router.push("/projetos");
    },
    buttonForm() {
      return !this.id ? "Salvar" : "Editar";
    },
    checarProjeto() {
      this.projetoInvalido = this.nomeDoProjeto.length <= 5;
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
