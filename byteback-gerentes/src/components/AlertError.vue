<template>
   <div class="alert alert-danger">{{ mensagemErro }}</div>
</template>

<script>
  export default {
    name: 'AlertError',
    props: ['mensagemErro']
  }
</script>