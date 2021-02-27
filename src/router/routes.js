const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ShoppingList.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/settings', component: () => import('pages/Settings.vue') }
    ]
  },
  {
    path: '/item',
    component: () => import('layouts/ItemLayout.vue'),
    children: [
      { path: '/addItems', name: 'addItems', component: () => import('pages/items/AddItems.vue') },
      { path: ':id', name: 'editItem', component: () => import('pages/items/EditItem.vue') },
      { path: '/new/:id', name: 'newItem', component: () => import('pages/items/AddItem.vue') }
    ]
  },
  { path: '/auth', component: () => import('layouts/Auth.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
