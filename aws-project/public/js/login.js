const Login = {
    template: `

    <div class="card card-container">
    <form id="form-login" method="post" @submit.prevent="login" class="col-xxl-5 col-lg-8 col-sm-12 col-12">
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
                        <input type="submit" value="Login" class="btn btn-success rounded-pill"/>
                        
                        
                    </div>
                </div>
            </form>
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
                    console.log("USernameLogn "+ this.usernameLogin);
                    console.log("VUE Login data result "+ res.data.result);
                    if(isLoginOk) {
                        console.log("Login isLoginOk");
                        let token = res.data.token;
                        localStorage.user = token;
                        this.token = token;

                        let id = res.data.id;
                        localStorage.idGardener = id;
                        this.idGardener = id;

                        this.usernameLogin = "";
                        this.passwordLogin = "";
                        this.$router.replace('/').catch(err => {});
                    } else {
                        this.loginError = "Username o password errati";
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        logout() {
            localStorage.user = "";
            this.token = "";
            localStorage.idGardener = "";
            this.idGardener = "";
            this.$router.replace('/rover-simulation').catch(err => {});
        },

    },
    mounted() {
        if (localStorage.user) {
            this.token = localStorage.user;
        }
        if (localStorage.idGardener) {
            this.idGardener = localStorage.idGardener;
        }
    }
}
