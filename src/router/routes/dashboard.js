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
    path: '/dashboard/page',
    name: 'page',
    component: () => import('@/views/extensions/pagination/Pagination'),
  },
  {
    path: '/profile/create',
    name: 'create-profile',
    component: () => import('@/views/forms/form-validation/FormCreateProfile.vue'),
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
    path: '/transaction/update',
    name: 'update-transaction',
    component: () => import('@/views/forms/form-validation/FormUpdateTransaction.vue'),
  },
  {
    path: '/transaction',
    name: 'transactions',
    component: () => import('@/views/table/bs-table/TableTransactions.vue'),
  },
]
