const NavigationBar =  {
    template: `
   <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <!-- BRAND -->
        <a class="navbar-brand">RosWebApp</a>

        <div class="nav-item ">
         <button @click="this.openLoginForm">Sign In</button>
         <button  @click="this.openRegistrationForm" class="btn-dark my-2 my-sm-0" >SIgn up</button>
        <!--
        <input type="button" @click="openRegistrationForm" value="Login" v-class="btn btn-success rounded-pill"/>Sign-Up</input>
        
            <button class="btn btn-dark my-2 my-sm-0" type="submit" @click="openLoginForm">Sign-In</button>
        -->
        </div>
      </nav>
    `,

    method: {
        openRegistrationForm: function() {
            this.$router.replace('/registration').catch(err => {});
            console.log("regist")
        },
        openLoginForm() {
            this.$router.replace('/login').catch(err => {});
        },
    },
}
