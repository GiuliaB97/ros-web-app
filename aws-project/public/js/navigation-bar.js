const NavigationBar =  {
    template: `
   <nav class="navbar navbar-expand-lg navbar-light bg-white justify-content-between" id="navigationbar">
        <img src="/static/img/almaxLogoExtended.png" alt="Almax Logo" id="almaxLogo">
        <!-- BRAND -->
        <a class="navbar-brand">RosWebApp</a>
        <button @click="openRegistrationForm" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Click here to open the registration form">Registration!</button>
        <button @click="openLoginForm" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Click here to open the login form">Login!</button>
   </nav>
    `,

    methods: {
        openRegistrationForm: function() {
            console.log("nav-bar registration form")
            this.$router.replace('/registration').catch(err => {});
        },
        openLoginForm() {
            console.log("nav-bar login form")
            this.$router.replace('/login').catch(err => {});
        },
    },
}
