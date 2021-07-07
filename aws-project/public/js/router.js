//import VueRouter from 'vue-router'

const router = new VueRouter({
    mode: 'history',
    routes: [
        // Each route should map to a component. The "component" can
        // either be an actual component constructor created via
        // `Vue.extend()`, or just a component options object.
        // We'll talk about nested routes later.

        //riguarda route dinamiche
        //{ path: '/sign-in', name: 'Sign-in', components: SignInButton},
        //{ path: '/sign-up', name: 'Sign-up', components: SignUpButton},
        { path: '/', name: 'Home', component: HomePage },
        { path: '/sign-up', name: 'SignUp', component: SignUp },
        { path: '/sign-in', name: 'SignIn', component: SignIn },
        { path: '/rover-simulation', name: 'RoverSimulation', component: RoverSimulation },
        /*
        { path: '/', name: 'Home', component: Home },
        { path: '/movies', name: 'Movies', component: Movies },

        { path: '404', component: NotFound },
        { path: '*', redirect: '/404' }//*: match anything
*/
    ]

})