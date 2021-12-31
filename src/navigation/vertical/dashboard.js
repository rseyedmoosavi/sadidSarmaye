export default [
  {
    title: 'داشبورد',
    icon: 'HomeIcon',
    tagVariant: 'light-success',
    children: [
      {
        title: 'تست صفحه بندی',
        route: 'page',
      },
      {
        title: 'پروفایل های منتظر تایید',
        route: 'profile-stuff-confirm',
        action: 'stuff_group'
      },
      {
        title: 'تراکنش های منتظر تایید',
        route: 'transactions-stuff-confirm',
        action: 'stuff_group'
      },
      {
        title: 'تراکنش های منتظر تایید رییس',
        route: 'transactions-boss-confirm',
        action: 'boss_group'
      },
      {
        title: 'کاربر جدید',
        route: 'create-profile',
        action: 'stuff_group',
      },
      {
        title: 'لیست کاربران',
        route: 'profiles',
      },
      // {
      //   title: 'تراکنش جدید',
      //   route: 'create-transaction',
      // },
      {
        title: 'لیست تراکنش ها',
        route: 'transactions',
      },
    ],
  },
]
