const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ShoppingLists.vue') },
      { path: 'list/:id', component: () => import('pages/ShoppingList.vue') },
      { path: 'help', component: () => import('pages/Help.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') }
    ]
  },
  {
    path: '/list/:list',
    component: () => import('layouts/ItemLayout.vue'),
    children: [
      { path: 'addItems', name: 'addItems', component: () => import('pages/items/AddItems.vue') },
      { path: 'item/edit/:id', name: 'editItem', component: () => import('pages/items/EditItem.vue') },
      { path: 'item/new/:id?', name: 'newItem', component: () => import('src/pages/items/NewItem.vue') }
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
