
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
      { path: 'home', name: 'home', component: () => import('pages/Home.vue') },

      { path: 'list-collaborator', name: 'list-collaborator', component: () => import('pages/collaborator/ListCollaborator.vue') },
      { path: 'form-collaborator/:id?', name: 'form-collaborator', component: () => import('pages/collaborator/FormCollaborator.vue') },
      { path: 'details-collaborator/:id?', name: 'details-collaborator', component: () => import('pages/collaborator/DetailsCollaborator.vue') },

      { path: 'list-company', name: 'list-company', component: () => import('pages/company/ListCompany.vue') },
      { path: 'form-company/:id?', name: 'form-company', component: () => import('pages/company/FormCompany.vue') },
      { path: 'details-company/:id?', name: 'details-company', component: () => import('pages/company/DetailsCompany.vue') },

      { path: 'list-store', name: 'list-store', component: () => import('pages/store/ListStore.vue') },
      { path: 'form-store/:id?', name: 'form-store', component: () => import('pages/store/FormStore.vue') },
      { path: 'details-store/:id?', name: 'details-store', component: () => import('pages/store/DetailsStore.vue') },

      { path: 'list-office', name: 'list-office', component: () => import('pages/office/ListOffice.vue') },
      { path: 'form-office/:id?', name: 'form-office', component: () => import('pages/office/FormOffice.vue') },
      { path: 'details-office/:id?', name: 'details-office', component: () => import('pages/office/DetailsOffice.vue') },

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
