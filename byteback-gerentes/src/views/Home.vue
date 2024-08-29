<template>
  <div class="container">
    <div class="jumbotron border border-success bg-light mt-2">
      <h1 class="display-4">Bem-vindo!</h1>
      <p>Aplição disponível para listagem dos gerentes do nosso banco.</p>
      <button @click="efetuarLogout" class="btn btn-danger mt-2">Sair</button>
    </div>
  </div>
</template>

<script>
import { logoutMixin } from '@/mixins';

export default {
  name: 'home',
  mixins: [logoutMixin]
}
</script>
