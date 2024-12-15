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
        <div class="buttons is-flex is-justify-content-space-between is-small">
          <button
            class="button"
            type="submit"
            :disabled="projetoInvalido"
          >
            {{ buttonForm() }}
          </button>
          <router-link
            to="/projetos"
            class="button"
          >
            <span>Voltar</span>
          </router-link>
        </div>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { ADICIONA_PROJETO, ALTERA_PROJETO } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
// import { notificacaoMixin } from "../mixins/notificar";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  // mixins: [notificacaoMixin],
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
        const isNomeProjeto = this.exiteNomeDoProjeto();

        if (isNomeProjeto.length) {
          this.notificar(
            TipoNotificacao.ATENCAO,
            "Oopss...! Já existe um projeto com este nome",
            "Digite um nome diferente"
          );
          this.nomeDoProjeto = "";
          return this.checarProjeto();
        }

        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = "";
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Novo projeto foi salvo",
        "Prontinho ;) seu projeto já está disponível."
      );
      this.$router.push("/projetos");
    },
    buttonForm() {
      return !this.id ? "Salvar" : "Editar";
    },
    checarProjeto() {
      this.projetoInvalido = this.nomeDoProjeto.length <= 5;
    },
    exiteNomeDoProjeto() {
      return this.store.state.projetos.filter(
        (p) => p.nome === this.nomeDoProjeto
      );
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>
