const routes = [
  // 🔹 Rota padrão redireciona para o login
  {
    path: '/',
    redirect: '/login'
  },

  // 🔹 Tela de Login
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },

  // 🔹 Tela de Recuperação de Senha
  {
    path: '/recuperar-senha',
    component: () => import('pages/RecuperarSenhaPage.vue')
  },

  // 🔹 Layout principal (menu mestre + conteúdo)
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      // 🔹 Módulos do menu mestre
      { path: '/cliente', component: () => import('pages/ClientePage.vue') },
      { path: '/veiculo', component: () => import('pages/VeiculoPage.vue') },
      { path: '/funcionario', component: () => import('pages/FuncionarioPage.vue') },
      { path: '/servico', component: () => import('pages/ServicoPage.vue') },
      { path: '/ordem-servico', component: () => import('pages/OrdemServicoPage.vue') },
      { path: '/dashboard', component: () => import('pages/DashboardPage.vue') }
    ]
  },

  // 🔹 Página de erro (sempre por último)
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
