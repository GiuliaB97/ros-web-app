const SignIn = {
    template: `
        <div class="signInContainer">
        
            <form>
                <h3>Sign In</h3>
    
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-control form-control-lg" />
                </div>
    
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control form-control-lg" />
                </div>
                    <button class="btn btn-dark my-2 " type="submit">
                        <router-link to="/rover-simulation">Sign-In</router-link>
                    </button>  
                    
                    <p class=" text-right mt-2 mb-4">
                        <router-link to="/forgot-password">Forgot password ?</router-link>
                    </p>
                
             </form>

        </div>
	`,

}