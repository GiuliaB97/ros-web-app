const NotFound = {
    template:
        '<div><img src="static/img/404.png" id="notFound" @click="openHome"/></div>',
    methods: {
        openHome: function () {
            this.$router.replace('/').catch(err => {});
        },
    }
}
