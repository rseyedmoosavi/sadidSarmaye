export default [
  {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views/dashboard/analytics/Analytics.vue'),
  },
  {
    path: '/dashboard/ecommerce',
    name: 'dashboard-ecommerce',
    component: () => import('@/views/dashboard/ecommerce/Ecommerce.vue'),
  },
  {
    path: '/profile/create',
    name: 'create-profile',
    component: () => import('@/views/forms/form-wizard/FormCreateProfile'),
  },  {
    path: '/profile/create',
    name: 'create-profile',
    component: () => import('@/views/forms/form-wizard/FormCreateProfile'),
  },
  {
    path: '/profile',
    name: 'profiles',
    component: () => import('@/views/table/bs-table/TableProfiles.vue'),
  },
  {
    path: '/transaction/create',
    name: 'create-transaction',
    component: () => import('@/views/forms/form-validation/FormCreateTransaction.vue'),
  },
  {
    path: '/page',
    name:'page',
    component:()=>import('@/views/pages/pagination/Page.vue')
  },
  {
    path: '/transaction/update',
    name: 'update-transaction',
    component: () => import('@/views/forms/form-validation/FormUpdateTransaction.vue'),
  },
  {
    path: '/transaction',
    name: 'transactions',
    component: () => import('@/views/table/bs-table/TableTransactions.vue'),
  },
  {
    path: '/transaction-stuff-confirm',
    name: 'transactions-stuff-confirm',
    component: () => import('@/views/table/bs-table/TableTransactionsStuffConfirm.vue'),
  },
  {
    path: '/transaction-boss-confirm',
    name: 'transactions-boss-confirm',
    component: () => import('@/views/table/bs-table/TableTransactionsBossConfirm.vue'),
  },
  {
    path: '/profile-stuff-confirm',
    name: 'profile-stuff-confirm',
    component: () => import('@/views/table/bs-table/TableProfileStuffConfirm'),
  },
]
