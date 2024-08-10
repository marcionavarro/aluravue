<template>
  <div class="container mt-5">
    <h1 class="mb-3">Novo usuário</h1>
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
</template>

<script>
import axios from 'axios'

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
    enviarFormulario() {
      axios.post('http://localhost:8000/auth/register', this.usuario)
          .then(resposta => console.log(resposta))
          .catch(erro => console.log(erro))
    }
  }
}
</script>

<style scoped>

</style>