<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="row col-12 justify-content-md-center mb-5">
        <h1>Login</h1>
      </div>
      <div class="col-6">
        <div v-if="mensagemErro" class="alert alert-danger">{{ mensagemErro }}</div>
        <form @submit.prevent="efetuarLogin">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" v-model="usuario.email" />
          </div>
          <div class="form-group">
            <label for="senha">Senha</label>
            <input type="password" class="form-control" v-model="usuario.senha" />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <button type="submit" class="btn btn-success">Logar</button>
            <router-link :to="{ name: 'novo.usuario' }">
              <span style="font-size: 0.785rem;">Não possui um cadastro, cadastre-se aqui!</span>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usuario: {},
      mensagemErro: ''
    }
  },
  methods: {
    efetuarLogin () {
      this.$store.dispatch('efetuarLogin', this.usuario)
        .then(() => {
          this.$router.push({ name: 'gerentes' })
          this.mensagemErro = ''
        })
        .catch(err => {
          console.log(err)
          if(err.request.status === 401){
            this.mensagemErro = 'Login ou senha inválido(s)'
            this.usuario = {}
          }
        })
    }
  }
}
</script>