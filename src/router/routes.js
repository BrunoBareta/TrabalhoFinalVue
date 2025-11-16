// Aqui estamos criando as rotas do sistema, ou seja,
// os caminhos de páginas que o usuário pode acessar.
const routes = [

  // Quando o usuário acessa a raiz do site "/", ele é redirecionado para a tela de login
  {
    path: '/',
    redirect: '/login'
  },

  // Tela de Login
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  // Tela de Recuperação de Senha
  {
    path: '/recuperar-senha',
    component: () => import('pages/RecuperarSenhaPage.vue')
  },

  // Parte principal do sistema com menu lateral e cabeçalho
  // Dentro dela ficam as páginas internas (clientes, veículos, etc)
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),

    // Rotas Filhas: páginas que aparecem dentro do layout (com menu e header)
    children: [

      // Página inicial dentro do sistema (pode ser o dashboard)
      { path: '', component: () => import('pages/IndexPage.vue') },

      // Página de Clientes
      { path: '/cliente', component: () => import('pages/ClientePage.vue') },

      // Página de Veículos
      { path: '/veiculo', component: () => import('pages/VeiculoPage.vue') },

      // Página de Funcionários
      { path: '/funcionario', component: () => import('pages/FuncionarioPage.vue') },

      // Página de Serviços
      { path: '/servico', component: () => import('pages/ServicoPage.vue') },

      // Página de Ordem de Serviço
      { path: '/ordem-servico', component: () => import('pages/OrdemServicoPage.vue') },

      // Página de Dashboard (gráficos e indicadores)
      { path: '/dashboard', component: () => import('pages/DashboardPage.vue') }
    ]
  },

  // Página de erro caso o usuário digite uma rota inexistente
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

// Exporta as rotas para o sistema conseguir usar
export default routes