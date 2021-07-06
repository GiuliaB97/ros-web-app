const SignUp = {
    template: `
		<div class="signUpContainer">
            <form>
                <h3>Sign Up</h3>
    
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-control form-control-lg"/>
                </div>
    
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-control form-control-lg" />
                </div>
    
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control form-control-lg" />
                </div>
                
                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" class="form-control form-control-lg" />
                </div>
               
                <button class="btn btn-dark my-2 " type="submit">
                    <router-link to="/">Sign-Up</router-link>
                </button>
    
           
            </form>
        </div>
	`,
    data() {

    },
}