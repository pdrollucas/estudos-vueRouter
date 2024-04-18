<template>
  <div class="container bg-light p-4">
    <h3 class="font-weight-light mb-3">Detalhes do contato: {{ id }}</h3>
    <p>Nome: {{ contato.nome }}</p>
    <p>Email: {{ contato.email }}</p>
    <router-link class="btn btn-primary" :to="`/contatos/${id}/editar`">Editar</router-link>
  </div>
</template>

<script>
import eventBus from '../../event-bus'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      contato: undefined
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.contato = eventBus.buscarContato(vm.id)
    })
  },

  beforeRouteUpdate(to, from, next) { // executada só quando o parametro da rota é alterado
    // como a instancia do componente ja esta criada eu posso acessar as propriedades do data (vuemodel) diretamente com o this: "this.parametros"
    this.contato = eventBus.buscarContato(parseInt(to.params.id))
    next()
  }
}
</script>

<style></style>