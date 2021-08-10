const NavigationBar =  {
    template: `
   <nav class="navbar navbar-expand-lg navbar-light bg-white justify-content-between" id="navigationbar">
        <img src="/static/img/almaxLogoExtended.png" alt="Almax Logo" id="almaxLogo">
        <!-- BRAND -->
        <div class="position-absolute top-5 start-50" >
          <a id="appName">RosWebApp</a>
        </div>
        <form v-if="!token" id="form-login" method="post" @submit.prevent="login" class="col-xxl-5 col-lg-8 col-sm-12 col-12">
          <div class="row mx-0 align-items-center">
            <div class="col col-xl-8 col-7">
              <div class="row mx-0">
                <div class="col input-group input-group-sm ps-0">
                  <input id="userLogin" v-model="usernameLogin" class="form-control" :class="{ 'is-invalid': loginError }"
                         placeholder="User" type="text" alt="Username" required/>
                </div>
                <div class="col input-group input-group-sm pe-0">
                  <input id="passwordLogin" v-model="passwordLogin" class="form-control" :class="{ 'is-invalid': loginError }"
                         placeholder="Password" type="password" alt="Password" required/>
                </div>
              </div>
              <div v-if="loginError" class="login-alert-error text-center mt-1"> {{ loginError }} </div>
            </div>
            <div id="form-button-container" class="col col-xl-4 col-5">
              <input type="submit" value="Login" class="btn btn-success  btn-lg "/>
              <input type="button" @click="openRegistrationForm" value="Sign in" class="btn btn-success  btn-lg "/>
            </div>
          </div>
        </form>
        <div v-else class="col-xxl-5 col-lg-8 col-sm-12 col-12 d-flex justify-content-sm-end justify-content-center mx-0">
          <div class="row">
            <div class="col-6 text-center">
              <input type="button" @click="openSimulation" value="Simulation" class="btn btn-primary  btn-lg ">
            </div>
            <div class="col-6 text-center">
              <input type="button" value="Logout" @click="logout" class="btn btn-danger  btn-lg ">
            </div>
          </div>
        </div>
   </nav>
    `,
    data(){
        return {
            usernameLogin: "",
            passwordLogin: "",
            loginError: "",
            token: "",
            idUser: ""
        };
    },
    methods: {
        login() {
            this.loginError = "";
            axios
                .post(MONGO_URL + '/login', {
                    params: {
                        userId: this.usernameLogin,
                        password: this.passwordLogin
                    }
                })
                .then(res => {
                    if(res.data.result) { //login is ok
                        let token = res.data.token;
                        localStorage.user = token;
                        this.token = token;

                        let id = res.data.id;
                        localStorage.idUser = id;
                        this.idUser = id;

                        this.usernameLogin = "";
                        this.passwordLogin = "";
                        this.$router.replace('/').catch(err => {});
                    } else {
                        this.loginError = "Invalid credentials";
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        logout() {
            localStorage.user = "";
            this.token = "";
            localStorage.idUser = "";
            this.idUser = "";
            this.$router.replace('/').catch(err => {});
        },

        openRegistrationForm() {
            this.$router.replace('/registration').catch(err => {});
        },

        openSimulation(){
            if(localStorage.user) {
                this.$router.replace('/rover-simulation/' + this.idUser).catch(err => {});
            }
        }

    },
    mounted() {
        if (localStorage.user) {
            this.token = localStorage.user;
        }
        if (localStorage.User) {
            this.User = localStorage.idUser;
        }
    }
}
