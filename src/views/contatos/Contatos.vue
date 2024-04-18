<template>
  <div>
    <cabecalho/>
    <router-view></router-view>
    <router-view name="contato-detalhes"></router-view>
    <router-view name="contato-adicionar"></router-view>
  </div>
</template>

<script>
import Cabecalho from "../Cabecalho.vue";

export default {
  components: {
    Cabecalho
  }
}

</script>

<style>

</style>