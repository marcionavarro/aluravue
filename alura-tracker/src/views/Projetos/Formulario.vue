<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label
          for="nomeDoProjeto"
          class="label"
        >
          Nome do projeto
        </label>
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
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

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
        (proj) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
      this.checarProjeto();
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
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => this.lidarComSucesso());
      } else {
        const isNomeProjeto = this.existeNomeDoProjeto();

        if (isNomeProjeto.length) {
          this.notificar(
            TipoNotificacao.ATENCAO,
            "Oopss...! Já existe um projeto com este nome",
            "Digite um nome diferente"
          );
          this.nomeDoProjeto = "";
          return this.checarProjeto();
        }

        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso());
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = "";
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
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
    existeNomeDoProjeto() {
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
