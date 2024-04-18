import Vue from 'vue'
import VueRouter from 'vue-router'

// Essa forma de importação serve para realizar o Lazy Loading: carregamento sob demanda. bom que toda vez que for carregado ele vai gerar uma nova requisição
const Home = () => import('./views/Home.vue')
const Contatos = () => import('./views/contatos/Contatos.vue')
const ContatoDetalhes = () => import('./views/contatos/ContatoDetalhes.vue')
const ContatosHome = () => import('./views/contatos/ContatosHome.vue')
const ContatoEditar = () => import('./views/contatos/ContatoEditar.vue')
const Erro404 = () => import('./views/Erro404.vue')
const Erro404Contato = () => import('./views/contatos/Erro404Contato.vue')
const Login = () => import('./views/login/Login.vue')
const ContatoAdicionar = () => import('./views/contatos/ContatoAdicionar.vue')

import eventBus from './event-bus'

Vue.use(VueRouter)

const extrairParametroId = route => ({
  id: parseInt(route.params.id)
})

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [ // dica: a rota mais genérica deve ficar sempre abaixo, a ordem que é buscada é de cima para baixo. se colocar a rota genérica por cima, ela vai ser encontrada primeiro e as rotas específicas nunca serão.
    {
      path: '/contatos',
      component: Contatos,
      alias: '/meus-contatos', // parecido com o redirecionamento de rotas, mas quando o usuario digitar "meus-contatos" a url vai continuar como "/meus-contatos" e se comportar como "/contatos" (alias = apelido)
      children: [
        {
          path: ':id(\\d+)', // expressão regular pra validação de aceitar so numeros
          component: ContatoDetalhes,
          name: 'contato',
          props: extrairParametroId
        },
        {
          path: ':id(\\d+)/editar',
          meta: { requerAutenticacao: true }, // metafields / campos personalizaveis
          beforeEnter(to, from, next){ // Guarda de Rota direto na rota: executada só quando a rota de editar é acessada
            console.log('beforeEnter')

            /*
            if(to.query.autenticado === 'true'){ // assim seria feito o controle de acessos
              return next()
            }
            next('/contatos') */

            next()
          },
          components: {
            default: ContatoEditar,
            'contato-detalhes': ContatoDetalhes // para carregar duas "rotas"/componentes ao mesmo tempo
          },
          props: { // parametros de rota como props: object mode
            default: extrairParametroId,
            'contato-detalhes': extrairParametroId
          }
        },
        {
          path: 'adicionar',
          component: ContatoAdicionar,
          meta: { requerAutenticacao: true },
          name: 'contato-adicionar'
        },
        { 
          path: '', 
          component: ContatosHome, 
          props: (route) => { // parametros de rota como props: function mode
            const busca = route.query.busca
            return busca ? {busca} : {}
          } 
        },
        { path: '*', component: Erro404Contato }
      ]
    },
    { path: '/home', component: Home },
    { path: '/', component: Login},
    { path: '/meu-contato', redirect: '/contatos' }, // redirecionamento de rotas: caso o usuário digite "meus-contatos" na url, a url vai mudar para "contatos"
    { path: '*', component: Erro404 }
  ]
})

//Guardas de Rotas - serve pra quando você quer criar uma rota de segurança, por exemplo: "se você voltar para o início, seus dados serão apagados"

// beforeEnter diretamente na rota 'contatos/:id/editar
// beforeRouteEnter e beforeRouteLeave estão em \views\contatos\ContatoEditar.vue
// beforeRouteUpdate está em \views\contatos\ContatoDetalhes.vue

router.beforeEach((to, from, next) => { // Rota Global - executado antes de cada rota
  console.log('beforeEach')
  console.log('Requer autenticação? ', to.meta.requerAutenticacao) // capturando o valor do metafield
  
  const estaAutenticado = eventBus.autenticado // recolhe o valor de autenticado do eventBus, vira true em Login.vue após ser feito o login com sucesso
  if(to.matched.some(rota => rota.meta.requerAutenticacao)){
    if(!estaAutenticado){
      next({
        path: '/',
        query: { redirecionar: to.fullPath }
      })
      return
    } 
  }
  next()
})

router.beforeResolve((to, from, next) => { // executada logo antes da navegação ser confirmada
  console.log('beforeResolve')
  next()
})

router.afterEach((to, from) => { // Rota Global - executada depois de cada navegação rota ser confirmada. A única rota que não recebe o next
  console.log('afterEach')
})

/* Usos do next()

next() = next(true) - navegação continua

next(false) - navegação bloqueada

next('/contatos') = next( { path: '/contatos' } ) - redirecionado para '/contatos'

next(new Error(`Permissões insuficientes para o recurso ${to.fullPath}`)) - mandar uma mensagem de erro 

somente na rota beforeRouteEnter é permitido chamar uma função callback dentro do next e capturar os valores da instância vue do component

*/

///////////////////////////////////////////////////////////////////////////////////////

export default router;