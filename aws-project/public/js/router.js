const MONGO_URL = "http://localhost:7000/api"

const router = new VueRouter({
    mode: 'history',
    routes: [
        // Each route should map to a component. The "component" can
        // either be an actual component constructor created via
        // `Vue.extend()`, or just a component options object.
        // We'll talk about nested routes later.

        //riguarda route dinamiche
        { path: '/', name: 'Home', component: HomePage },
        { path: '/registration', name: 'Registration', component: Registration },
        { path: '/login', name: 'Login', component: Login },
        { path: '/rover-simulation', name: 'RoverSimulation', component: RoverSimulation },
        { path: '/graph', name: 'Chart', component: VueChart },
        { path: '/rtGraph', name: 'RealTimeChart', component: rtGraph },
       // { path: '404', component: NotFound },
        { path: '*', redirect: '/404' }//*: match anything

    ]

})
