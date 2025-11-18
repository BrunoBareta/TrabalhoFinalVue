const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  // Login
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  // Recuperar senha
  {
    path: '/recuperar-senha',
    component: () => import('pages/RecuperarSenhaPage.vue')
  },

  // Todas as páginas internas usam o MainLayout
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      // Página inicial / dashboard
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },

      // Clientes
      { path: 'cliente', component: () => import('pages/ClientePage.vue') },

      // Veículos
      { path: 'veiculo', component: () => import('pages/VeiculoPage.vue') },

      // Funcionários
      { path: 'funcionario', component: () => import('pages/FuncionarioPage.vue') },

      // Serviços
      { path: 'servico', component: () => import('pages/ServicoPage.vue') },

      // Ordem de Serviço
      { path: 'ordem-servico', component: () => import('pages/OrdemServicoPage.vue') },
    ]
  },

  // 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
