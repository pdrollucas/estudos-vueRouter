<template>
    <div class="w-50" style="margin: 0 auto;">
        <div class="container-fluid bg-light d-flex justify-content-center align-items-center p-4">
          <form class="container" @submit.prevent="entrar">
              <h3 class="font-weight-light">Faça o seu login</h3>
      
              <label class="sr-only">Email</label> <span class="fw-light">teste@teste.com</span>
              <input type="email" class="form-control mt-3 mb-3" autofocus required v-model="usuario.email">
              <label class="sr-only">Senha</label> <span class="fw-light">12345</span>
              <input type="password" class="form-control mb-3" required v-model="usuario.senha">
              
              <button class="btn btn-primary" type="submit">Entrar</button>
          </form>
        </div>
        <div class="alert alert-danger mt-3" v-if="mensagem">{{ mensagem }}</div>
    </div>
</template>

<script>
import eventBus from '../../event-bus'

export default {
    data(){
        return{
            usuario: {
                email: '',
                senha: ''
            },
            mensagem: ''
        }
    },
    methods: {
        entrar(event){
            if(this.usuario.email === 'teste@teste.com' && this.usuario.senha === '12345'){
                eventBus.$emit('autenticar', true)
                const destino = this.$route.query.redirecionar || '/home' 
                // se eu tentar entrar em uma rota e for bloqueado pelo login, depois de fazer o login serei redirecionado pra ela OOUU se eu nao tiver tentado, serei mandado pra /home como padrão
                this.$router.push(destino)
                return
            } 
            this.mensagem = 'Dados incorretos!'
            setTimeout(() => this.mensagem = '', 3000)
        }
    }
}
</script>

<style>

</style>