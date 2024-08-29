<template>
  <div class="col-md-6 col-lg-3">
    <div class="card  mb-3">
      <div class="card-header text-white bg-success">{{ gerente.nome }}</div>
      <div class="card-body">
        <h5 class="card-title text-muted">{{ gerente.agencia }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['gerente']
}
</script>