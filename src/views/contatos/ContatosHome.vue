<template>
  <div>
    <h3 class="font-weight-light">Página Inicial - Contatos</h3>
    <contato-lista :busca="busca"/>
  </div>
</template>

<script>
import ContatoLista from "../../components/contatos/ContatoLista.vue";

export default {
  props: ['busca'],
  components: {
    ContatoLista
  }
}

</script>

<style>

</style>