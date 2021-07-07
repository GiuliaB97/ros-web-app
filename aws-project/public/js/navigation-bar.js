const NavigationBar =  {
    components: {
        //'signUpButton': SignUpButton,
        //'signInButton': SignInButton,
    },
    data: function () {
    },
    template: `
  <!-- Image and text -->
<!-- BARRA DI NAVIGAZIONE-->
   <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <!-- BRAND -->
        <a class="navbar-brand" href="#">RosWebApp</a>

        <!-- RESPONSIVE MENU-->      
        <!-- MENU -->
        <div class="nav-item ">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit" to="\rover-simulation">
                <router-link to="/sign-up">Sign-Up</router-link>
            </button>
            
            <button class="btn btn-dark my-2 my-sm-0" type="submit" to="\rover-simulation">
                <router-link to="/sign-in">Sign-In</router-link>
            </button>
        <!-- FINE RESPONSIVE MENU --> 
        </div>
        
        <!-- FINE NAVBAR --> 
      </nav>
    `,

}
