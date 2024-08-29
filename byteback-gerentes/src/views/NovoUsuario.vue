<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="row col-12 justify-content-center mb-5">
        <h1>Cadastrar Usuário</h1>
      </div>
      <div class="col-xs-12 col-md-8 col-lg-6">
        <AlertError v-if="mensagemErro" :mensagemErro="mensagemErro" />
        <form @submit.prevent="enviarFormulario">
          <div class="form-group">
            <label>Nome</label>
            <input type="text" class="form-control" v-model="usuario.nome">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="usuario.email">
          </div>
          <div class="form-group">
            <label>Senha</label>
            <input type="password" class="form-control" v-model="usuario.senha">
          </div>
          <button class="btn btn-success" type="submit">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AlertError from '../components/AlertError.vue';

export default {
  name: 'Registra',
  components: {
    AlertError
  },
  data: function () {
    return {
      usuario: {
        nome: '',
        email: '',
        senha: ''
      },
      mensagemErro: ''
    }
  },
  methods: {
    enviarFormulario () {
      this.isFieldsEmpty()

      this.$store.dispatch('enviarFormulario', this.usuario)
        .then(() => {
          this.$router.push({ name: 'login' })
          this.mensagemErro = ''
        })
        .catch(err => console.log(err))
    },
    isFieldsEmpty () {
      const { name, email, senha } = this.usuario
      if (name === '' || email === '' || senha === '') {
        this.mensagemErro = 'Por favor, preencha todos os campos'
        return
      }
    }
  }
}
</script>

<style scoped></style>