<template>
  <ul class="navbar-nav w-100">
    <li class="nav-item">
      <router-link class="nav-link" to="/">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/gerentes" class="nav-link">Gerentes</router-link>
    </li>
    <li class="nav-item ml-auto">
      <a href="#" @click.prevent="efetuarLogout" class="nav-link text-muted bg-white btn-sm px-4">
        Logout
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    efetuarLogout() {
      this.$store.commit('DESLOGAR_USUARIO')
      this.$router.push({name: 'login'})
    }
  }
}
</script>
