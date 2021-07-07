const SignIn = {
    template: `
        <div class="signInContainer">
            <form>
                <h3>Sign In</h3>
    
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
                    <button class="btn btn-dark my-2 " @click="submitted">
                        <router-link to="/rover-simulation">Sign-In</router-link>
                    </button>  
                    
                    <p class=" text-right mt-2 mb-4">
                        <router-link to="/forgot-password">Forgot password ?</router-link>
                    </p>               
             </form>

        </div>
        
	`,
    methods: {
        submitted: function(){

        }
    }

}