const Registration = {
    template: `
	<div class="card card-container">
        <div class="d-flex justify-content-center">
            <div class="mt-2 card col-12 col-sm-8 col-md-6 col-xl-5">
                <div class="card-header">
                    <div  class="justify-content-center">
                      <img src="/static/img/almaxLogo.jpeg" alt="Almax Icon" id="almaxIcon">
                    </div>
                   <br>
                    <div class="row">
                        <h1 class="text-center">Sign Up</h1>
                    </div>
                </div>
                <div class="card-body">
                    <form name="subscribe" method="post" @submit.prevent="addUser">
                        <div class="pb-1">
                            <h5>User data</h5>
                            <div class="pb-2">
                              <label class="control-label" for="name">Name</label>
                                <input type="text" class="form-control form-control-sm" id="name" :class="{ 'is-invalid': nameError }"
                                       placeholder="Name" name="name" v-model.trim="form.name" required>
                                <small v-if=" nameError" class="invalid-feedback alert alert-danger"> {{ nameError }} </small>
                            </div>                                       

                            <div class="pb-2">
                              <label class="control-label" for="surname">Last name</label>
                                <input type="text" class="form-control form-control-sm" id="surname" :class="{ 'is-invalid': surnameError }"
                                       placeholder="Last name" name="surname" v-model.trim="form.surname" required>
                                <small v-if="surnameError" class="invalid-feedback alert alert-danger"> {{ surnameError }} </small>
                            </div>
                            <div class="pb-2">
                              <label class="control-label" for="email">Email</label>
                                <input type="email" class="form-control form-control-sm" id="email" :class="{ 'is-invalid': emailError }"
                                       placeholder="Email" name="email" v-model.trim="form.email" required>
                                <small v-if="emailError" class="invalid-feedback alert alert-danger"> {{ emailError }} </small>
                            </div>
                            <div class="pb-2">
                              <label class="control-label" for="password">Password</label>
                                <input type="password" class="form-control form-control-sm" id="password"
                                       placeholder="Password" name="password" v-model.trim="form.password" required>
                            </div>
                            <div class="pb-2">
                                <label class="control-label" for="password2">Confirm Password</label>
                                    <input type="password" class="form-control form-control-sm" id="password2" :class="{ 'is-invalid': passwordError }"
                                       placeholder="Confirm password" name="password2" v-model.trim="form.password2" required>
                              <small id="emailHelp" class="form-text text-muted">Type exactly the same password of the previous section.</small>
                                    <small v-if="passwordError" class="invalid-feedback alert alert-danger"> {{ passwordError }} </small>
                            </div>
                        </div>
                        <div v-if="registrationError || registrationSuccess" class="pt-2 pb-2">
                            <div v-if="registrationError" class="alert alert-danger"> {{ registrationError }} </div>
                            <div v-if="registrationSuccess" class="alert alert-success"> {{ registrationSuccess }} </div>
                        </div>
                        <div class="form-group text-end pt-2">
                            <input type="submit" value="Confirm" class="btn btn-success rounded-pill" :class="{ 'disabled': redirecting}"  data-toggle="tooltip" data-placement="top" title="Click here to confirm your data ">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
	`,

    data() { //The data() method returns an object
        return { //nested userData object to hold the first and last name, email and password properties
            form: {
                name: '',
                surname: '',
                email: '',
                password1: '',
                password2: ''
            },
            nameError: "",
            surnameError: "",
            emailError: "",
            passwordError: "",
            registrationError: "",
            registrationSuccess: "",
            redirecting: false
        }
    },
    methods: {
        addUser() {
            let error = false
            this.passwordError = "";
            this.emailError = "";
            this.registrationError = "";
            this.registrationSuccess = "";

            if (this.form.password !== this.form.password2) {
                this.passwordError = "Passwords do not match";
                error = true;
            }

            if (this.form.email !== '') { //console.log("if form i am in form values"+ this.form.email)
                axios
                    .get(MONGO_URL + '/registration', {
                        params: {
                            userId: this.form.email
                        }
                    })
                    .then(res => {
                        let existingUser = res.data;
                        if (existingUser) {
                            this.emailError = "Email already registered";
                        } else if (!error) {
                            axios.post(MONGO_URL + '/registration', {
                                params: {
                                    name: this.form.name,
                                    surname: this.form.surname,
                                    email: this.form.email,
                                    password: this.form.password
                                }
                            })
                                .then(res => { //console.log("2nd then read data values are:"+ res.data)
                                    let usrCreated = res.data;
                                    if (usrCreated) {
                                        this.registrationSuccess = "User successfully created, now you will be re-directed to the home page";
                                        this.redirecting = true;
                                        setTimeout(() => {
                                            this.$router.push('/')
                                        }, 4000)
                                    } else {
                                        this.registrationError = "Registration error, please try again";
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    })
            }
        }
    }
}
