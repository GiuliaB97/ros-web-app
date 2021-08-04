const Login = {
    template: `
        <div class="card card-container">
            <div class="d-flex justify-content-center">
                <div class="mt-2 card col-12 col-sm-8 col-md-6 col-xl-5">
                    <div class="card-header">
                        <div  class="justify-content-center">
                          <img src="/static/img/almaxLogo.jpeg" alt="Almax Logo" id="almaxIcon">
                        </div>
                        <br>
                        <div class="row">
                            <h3 class="text-center">Sign in</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <form id="form-login" Leone1method="post" @submit.prevent="login"  class="align-items-center">
                              <div class="row">
                                  <label for="inputPassword" class="col-sm-3 col-form-label">Email</label>
                                  <div class="col-sm-9">
                                    <input id="userLogin" v-model="usernameLogin" class="form-control" :class="{ 'is-invalid': loginError }"
                                           placeholder="Type here the user email" type="text" alt="Username" required/>
                                  </div>
                              </div>
                              <br>
                              <div class="row">
                                  <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
                                  <div class="col-sm-9">
                                        <input id="passwordLogin" v-model="passwordLogin" class="form-control" :class="{ 'is-invalid': loginError }"
                                             placeholder="Type here the user password" type="pa5ssword" alt="Password" required/>
                                  </div>        
                              </div>
                              
                            <div class="row">
                              <div v-if="loginError" class="login-alert-error text-center mt-1"> {{ loginError }} </div>
                            </div>
                            <br>
                                                 
                            <div id="form-button-container" class="row">
                               <input type="submit" value="Login" class="btn btn-success rounded-pill btn-lg btn-block" data-toggle="tooltip" data-placement="top" title="Click here to submit your data "/>                            
                            </div>
                          </form>
                    </div>
                </div>
            </div>
        </div>
  `,
    data() {
        return {
            usernameLogin: "",
            passwordLogin: "",
            loginError: "",
            token: "",
            idGardener: ""
        };
    },
    methods: {
        login() {
            console.log("Login called w/ params "+ this.usernameLogin + this.passwordLogin);
            this.loginError = "";
            axios
                .post(MONGO_URL + '/login', {
                    params: {
                        userId: this.usernameLogin,
                        password: this.passwordLogin
                    }
                })
                .then(res => {
                    let isLoginOk = res.data.result;
                    console.log("USername Login "+ this.usernameLogin);
                    console.log("VUE Login data result "+ res.data.result);
                    if(isLoginOk) {
                        console.log("Login isLoginOk");
                        let token = res.data.token;
                        localStorage.user = token;
                        this.token = token;

                        let id = res.data.id;
                        localStorage.idUser = id;
                        this.idUser = id;

                        this.usernameLogin = "";
                        this.passwordLogin = "";
                        this.$router.replace('/rover-simulation').catch(err => {});
                        //TODO
            //+ this.$router.replace('/rover-simulation/' + this.idUser).catch(err => {});
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

    },
    mounted() {
        if (localStorage.user) {
            this.token = localStorage.user;
        }
        if (localStorage.idUser) {
            this.idGardener = localStorage.idUser;
        }
    }
}
