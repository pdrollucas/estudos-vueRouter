import Vue from "vue";

export default new Vue({
    data: {
        autenticado: false,
        contatos: [
            {id: 1, nome: 'Cleiton', email: 'cleiton@gmail.com'},
            {id: 2, nome: 'Rasta', email: 'rasta@hotmail.com'},
            {id: 3, nome: 'Zezinho', email: 'ze@outlook.com'}
        ]
    },
    created(){
        this.$on('autenticar', (autenticado) => {
            this.autenticado = autenticado
        })
    },
    methods: {
        buscarContato(id){
            return Object.assign({}, this.contatos.find(c => c.id === id))
        },
        editarContato(contato){
            const indice = this.contatos.findIndex(c => c.id === contato.id)
            this.contatos.splice(indice, 1, contato)
        },
        adicionarContato(contato){
            const ultimoContato = this.contatos[this.contatos.length -1]

            contato.id = ultimoContato.id + 1
            this.contatos.push(contato)
        },
        removerContato(contato){
            const indice = this.contatos.findIndex(c => c.id === contato.id)
            this.contatos.splice(indice, 1)
        }
    }
})