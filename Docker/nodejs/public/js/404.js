const NotFound = {
    template: '<div><img src="static/img/404.png" id="notFound" @click="openHome"/></div>' ,
    methods: {
        openHome(){
            this.$router.replace('/').catch(err => {})
        },
    }
}
