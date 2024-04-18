<template>
  <li class="container bg-light">
    <span>{{ contato.nome }}</span>
    
    <button class="btn btn-danger float-end btn-sm ms-2" @click="remover">Remover</button>

    <router-link :to="{path: `/contatos/${contato.id}`}" class="btn btn-primary btn-sm float-end">Detalhes</router-link>

    
  </li>
</template>

<script>
export default {
    props: {
        contato: {
            type: Object,
            reqired: true
        }
    },
    methods: {
      remover(){
        this.$emit('buscarContato', this.contato.id)
      }
    }
}
</script>

<style>

</style>