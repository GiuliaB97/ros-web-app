const NavigationBar =  {
    template: `
   <nav class="navbar navbar-expand-lg navbar-light bg-white justify-content-between" id="navigationbar">
        <img src="/static/img/almaxLogoExtended.png" alt="Almax Logo" id="almaxLogo">
        <!-- BRAND -->
        <div class="position-absolute top-5 start-50" >
          <a id="appName">RosWebApp</a>
        </div>
        <div class="position-absolute top-10 end-0">
            <div id="nav-button " v-if="!token">
              <button  @click="openRegistrationForm" class="btn btn-success btn-lg" data-toggle="tooltip" data-placement="top" title="Click here to open the registration form">Registration!</button>
              <button  @click="openLoginForm" class="btn btn-success btn-lg" data-toggle="tooltip" data-placement="top" title="Click here to open the login form">Login!</button>
              </div>
            <div v-else>
              <button  @click="goToSimulation" class="btn btn-primary btn-lg" data-toggle="tooltip" title="Click here to go to rover simulation page" >Open simulation!</button>
              <button @click="logout" class="btn btn-danger btn-lg" data-toggle="tooltip" 
                      title="Click here to logout">Logout!</button>
            </div>
        </div>
   </nav>
    `,
    data(){
        return {
            token: "",
        };
    },
    methods: {
        openRegistrationForm: function() {
            console.log("nav-bar registration form")
            this.$router.replace('/registration').catch(err => {});
        },
        openLoginForm() {
            console.log("nav-bar login form")
            this.$router.replace('/login').catch(err => {});
        },
        logout() {
            localStorage.user = "";
            this.token = "";
            localStorage.idUser = "";
            this.idUser = "";
            this.$router.replace('/').catch(err => {});
        },
        goToSimulation(){
            this.$router.replace('/rover-simulation/' + this.idUser).catch(err => {});
        }

    },
    mounted() {
        if (localStorage.user) {
            this.token = localStorage.user;
        }
        if (localStorage.idUser) {
            this.idUser = localStorage.idUser;
        }
    }
}
