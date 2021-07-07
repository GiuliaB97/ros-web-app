
const SignUp = {
    template: `
		<div class="signUpContainer">
		
            <form>
                <h3>Sign Up</h3>

                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" 
                           id="name"
                           class="form-control"
                           v-model="userData.name">
                </div>
                 <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" 
                           id="surname"
                           class="form-control"
                           v-model="userData.surname">
                </div>
                
                <div class="form-group">
                <label for="email">Email Address</label>
                    <input type="text"
                           id="email"
                           class="form-control"
                           v-model="userData.email">
                </div>
                 <div class="form-group">
                    <label>Password</label>
                    <input type="password" 
                           id="password"
                           class="form-control"
                           v-model="userData.password">
                </div>
                <!--
                 <div class="form-group">
                    <label>Confirm password</label>
                    <input type="text" 
                           id="password"
                           class="form-control"
                           v-model="userData.password">
                </div>
                -->
               
                <button class="btn btn-dark my-2 " @click="submitted">>
                    <router-link to="/">Sign-Up</router-link>
                </button>
            </form>
        </div>
        
        
	`,

    data() { //The data() method returns an object
        return { //nested userData object to hold the first and last name, email and password properties
                userData: {
                    name: '',
                    surname: '',
                    email: '',
                password: ''
            }
        }
    },
    methods: {
        submitted: function(){

        }
    }
}