const MONGO_URL = "http://localhost:7000/api"

const router = new VueRouter({
    mode: 'history',
    routes: [// Each route should map to a component. The "component" can either be an actual component constructor created via
        { path: '/', name: 'Home', component: HomePage },
        { path: '/registration', name: 'Registration', component: Registration },
        { path: '/rover-simulation/:id', name: 'RoverSimulation', component: RoverSimulation },
        { path: '/404', component: NotFound },
        { path: '/401', component: NotAuthorized },
        { path: '*', redirect: '/404' }//*: match anything
    ]
})
