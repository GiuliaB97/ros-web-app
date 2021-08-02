const NavigationBar =  {
    template: `
   <nav class="navbar navbar-expand-lg navbar-light bg-white justify-content-between" id="navigationbar">
        
        <img src="/static/img/almaxLogoExtended.png" alt="Almax Logo" id="almaxLogo">
        <!-- BRAND -->
        <a class="navbar-brand">RosWebApp</a>
<button class="btn btn-secondary my-2 my-sm-0" type="submit" to="\\registration">
                <router-link to="/registration">Sign-Up</router-link>
            </button>
            
            <button class="btn btn-dark my-2 my-sm-0" type="submit" to="\\rover-simulation">
                <router-link to="/login">Sign-In</router-link>
            </button>
<!--TODO: uncomment this to make the nav section disappear-->
            <button @click="login" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Click here to open the login form">Login!</button>
          
           
           
           
           
            <!--
        <div class="nav-item ">
         <button @click="openLoginForm">Sign In</button>
         <button  @click="openRegistrationForm" class="btn-dark my-2 my-sm-0" >SIgn up</button>
        -->
        <!--
        <input type="button" @click="openRegistrationForm" value="Login" v-class="btn btn-success rounded-pill"/>Sign-Up</input>
        
            <button class="btn btn-dark my-2 my-sm-0" type="submit" @click="openLoginForm">Sign-In</button>
        -->
        </div>
      </nav>
    `,

    method: {
        login: function () {

        },
        openRegistrationForm: function() {
            console.log("i am in")
            this.$router.replace('/registration').catch(err => {});

        },
        openLoginForm() {
            console.log("i am in")
            this.$router.replace('/login').catch(err => {});
        },
    },
}
