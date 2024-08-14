<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-bytebank mb-5">
      <a class="navbar-brand" href="#">ByteBank</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/gerentes" class="nav-link">
              Gerentes
            </router-link>
          </li>
          <li class="nav-item ml-auto">
            <a href="#" @click.prevent="efetuarLogout" class="nav-link text-muted bg-white btn-sm px-4">
              {{ textLoginOrLogout() }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    efetuarLogout () {
      if(this.isExistsToken()) localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    },
    textLoginOrLogout () {
      return this.isExistsToken() ? 'Logout' : 'Login'
    },
    isExistsToken () {
      return localStorage.getItem('token') ? true : false
    }
  }
}
</script>

<style>
.navbar {
  background: #27ae60;
}

.navbar-bytebank a {
  color: #fff;
}

.navbar-bytebank a:hover {
  color: #000;
}
</style>
