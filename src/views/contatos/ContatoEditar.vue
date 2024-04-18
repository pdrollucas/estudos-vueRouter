<template>
  <div>
    <h3 class="font-weight light mb-3">Editar contato com id: {{ id }}</h3>
    <form @submit.prevent="salvar">

      <div class="form-group mb-3">
        <label for="">Nome</label>
        <input type="text" placeholder="Insira o nome" class="form-control" v-model="contato.nome">
      </div>
      <div class="form-group mb-3">
        <label for="">Email</label>
        <input type="email" placeholder="Insira o email" class="form-control" v-model="contato.email">
      </div>

      <button class="btn btn-success mb-3" type="submit">Salvar</button>

    </form>
  </div>
</template>

<script>
import eventBus from '../../event-bus'

export default {
    props: ['id'],
    data(){
      return{
        contato: undefined,
        estaCancelando: true
      }
    },

    /*
    // Guarda de Rota direto no componente
    beforeRouteEnter(to, from, next){
      console.log('beforeRouteEnter')

      //  assim também poderia ser feito o controle de acessos
     
      if(to.query.autenticado === 'true'){
        return next() // para acessar o vuemodel é preciso criar uma função callback no next "next((vm) => {})"
      }
      next('/contatos')

     next()
    },*/

    beforeRouteEnter(to, from, next){
      next((vm) => {
        vm.contato = eventBus.buscarContato(vm.id)
      })
    },
    
    beforeRouteLeave(to, from, next){ // Guarda de rota usada para prevenir o usuário de sair acidentalmente de uma rota: "você realmente deseja sair dessa rota? seus dados podem ser apagados"
      this.estaCancelando ? next(window.confirm('Deseja realmente sair?')) : next(window.alert('Contato editado com sucesso!'))
    },

    methods: {
      salvar(event){
        eventBus.editarContato(this.contato)
        this.estaCancelando = false
        this.$router.push('/contatos')
      }
    }
    
}
</script>

<style>

</style>