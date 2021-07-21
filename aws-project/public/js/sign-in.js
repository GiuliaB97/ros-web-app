const SignIn = {
    template: `
            <div class="container">
        <div class="d-flex justify-content-center">
            <div class="mt-2 card col-12 col-sm-8 col-md-6 col-xl-5">
                <div class="card-header">
                    <div class="row">
                        <h3 class="text-center">Sign in</h3>
                    </div>
                </div>
                <form v-if="!token" id="form-login" method="post" @submit.prevent="login">
                    <div class="pb-1">
                        <h5>User credentials</h5>
                            <div class="pb-2">
                                <div class="col input-group input-group-sm ps-0">
                                    <input id="userLogin" v-model="emailLogin" class="form-control" :class="{ 'is-invalid': loginError }"
                                         placeholder="email" type="text" alt="Email" required/>
                                </div>
                              </div>
                              <div class="pb-2">
                                <div class="col input-group input-group-sm pe-0">
                                    <input id="passwordLogin" v-model="passwordLogin" class="form-control" :class="{ 'is-invalid': loginError }"
                                         placeholder="Password" type="password" alt="Password" required/>
                                </div>   
                                </div>     
                            </div>
                            <div v-if="loginError" class="login-alert-error text-center mt-1"> {{ loginError }} </div>
                                            
                        <div id="form-button-container" class="col col-xl-4 col-5">
                            <input type="submit" value="Login" class="btn btn-success rounded-pill"/>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
        
	`,
    data() { //The data() method returns an object
        return { //nested userData object to hold the first and last name, email and password properties
            emailLogin: "",
            passwordLogin: "",
            loginError: "",
            token: "",
            idUsr: ""
        }
    },
    methods: {
        login() {
            this.loginError = "";
            axios.post(MONGO_URL + '/login', {
                    params: {
                        userId: this.emailLogin,
                        password: this.passwordLogin
                    }
                })
                .then(res => {
                    let isLoginOk = res.data.result;
                    if(isLoginOk) {
                        let token = res.data.token;
                        localStorage.user = token;
                        this.token = token;

                        let id = res.data.id;
                        localStorage.idUsr = id;
                        this.idUsr = id;

                        this.emailLogin = "";
                        this.passwordLogin = "";
                        this.$router.replace('/').catch(err => {});
                    } else {
                        this.loginError = "Wrong credentials";
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        logout() {
            localStorage.user = "";
            this.token = "";
            localStorage.idUsr = "";
            this.idUsr = "";
            this.$router.replace('/').catch(err => {});
        },
    }

}