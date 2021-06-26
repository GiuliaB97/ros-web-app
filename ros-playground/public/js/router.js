const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/movies', component: Users },
      { path: '/404', component: NotFound },  
      { path: '*', redirect: '/404' }
    ]
  })
