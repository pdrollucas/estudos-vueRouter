<template>
  <div>
    <h3 class="font-weight-light">Contatos</h3>

    <div class="form-group">
        <input type="search" class="form-control mb-3 mt-3" placeholder="Buscar contatos" @keyup.enter="buscar" :value="busca">
    </div>

    <ul class="list-group" v-if="contatosFiltrados.length > 0">
        <contato-lista-iten v-for="contato in contatosFiltrados" :key="contato.id" :contato="contato" class="list-group-item" @buscarContato="remover(contato)"/>
    </ul>

    <p v-else>Nenhum contato</p>

    <router-link :to="{path: `/contatos/adicionar`}" class="btn btn-success btn-sm mt-3">Adicionar</router-link>
  </div>
</template>

<script>
import ContatoListaIten from './ContatoListaIten.vue'
import eventBus from '../../event-bus'

export default {
    components: {
        ContatoListaIten
    },
    props: ['busca'],
    data(){
        return{
            contatos: []
        }
    },
    computed: {
        contatosFiltrados(){
            const busca = this.busca
            return !busca ? this.contatos : this.contatos.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))
        }
    },
    created(){
        this.contatos = eventBus.contatos
        console.log("valor da busca: ", this.busca)
        console.log('valor dos contatos: ', this.contatos)
    },
    methods: {
        buscar(event){
            this.$router.push({
                path: '/contatos',
                query: {busca: event.target.value} // adicionando uma query
            })
        },
        remover(contato){
            eventBus.removerContato(contato)
            this.$router.push('/contatos')
        }
    }
}
</script>

<style>

</style>