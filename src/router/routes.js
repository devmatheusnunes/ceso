
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/auth/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/auth/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/auth/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/auth/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/auth/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/auth/ResetPassword.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/auth/Me.vue') },
      { path: 'log', component: () => import('pages/Index.vue') }
    ],
    meta: {
      requireAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
