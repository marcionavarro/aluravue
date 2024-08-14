<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="row col-12 justify-content-md-center mb-5">
        <h1>Cadastrar Usuário</h1>
      </div>
      <div class="col-6">
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
export default {
  data: function () {
    return {
      usuario: {
        nome: '',
        email: '',
        senha: ''
      }
    }
  },
  methods: {
    enviarFormulario () {
      this.$http.post('auth/register', this.usuario)
        .then(resposta => {
          console.log(resposta)
          this.$router.push({ name: 'login' })
        })
        .catch(erro => console.log(erro))
    }
  }
}
</script>

<style scoped></style>