const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/recuperar-senha',
    component: () => import('pages/RecuperarSenhaPage.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/cliente', component: () => import('pages/ClientePage.vue') },
      { path: '/veiculo', component: () => import('pages/VeiculoPage.vue') },
      { path: '/funcionario', component: () => import('pages/FuncionarioPage.vue') },
      { path: '/servico', component: () => import('pages/ServicoPage.vue') },
      { path: '/ordem-servico', component: () => import('pages/OrdemServicoPage.vue') },
      { path: '/dashboard', component: () => import('pages/DashboardPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
