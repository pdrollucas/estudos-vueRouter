<template>
  <div>
    <h3 class="font-weight light mb-3">Adicionar contato</h3>
    <form @submit.prevent="salvar">
      <div class="form-group mb-3">
        <label for="">Nome</label>
        <input type="text" placeholder="Insira o nome" class="form-control" v-model="contato.nome">
      </div>
      <div class="form-group mb-3">
        <label for="">Email</label>
        <input type="email" placeholder="Insira o email" class="form-control" v-model="contato.email">
      </div>

      <button class="btn btn-success mb-3" type="submit">Adicionar</button>

    </form>
  </div>
</template>

<script>
import eventBus from '../../event-bus';

export default {
    data(){
        return{
            contato: {
                nome: '',
                email: ''
            }
        }
    },
    methods: {
        salvar(){
            eventBus.adicionarContato(this.contato)
            alert('Contato salvo com sucesso :)')
            this.$router.push('/contatos')
        }
    }
}
</script>

<style>

</style>