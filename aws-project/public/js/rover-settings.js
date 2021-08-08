const RoverCharts = {
    props: ['ws_address'],
    components:{

    },
    template: `
    <div id="roverChart" class="row">

    </div>
  `,
    watch: {
        connected: function (val) {
            console.log("watch")
            this.connected = val
        },

    },
    data: function() {

    },
    methods:{

    },
    mounted(){

    }
}
