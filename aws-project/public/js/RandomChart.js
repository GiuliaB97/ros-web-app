const DataChart= {
    template:
        `
        <div class="small">
            <line-chart:chart-data="datacollection"></line-chart>
            <button @click="fillData()">Randomize</button>
        </div>
         `
    ,
    component: {
        LineChart
    },
    data () {
        return {
            datacollection: null
        }
    },
    mounted () {
        this.fillData()
    },
    methods: {
        fillData () {
            this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }, {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            }
        },
        getRandomInt () {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
    }
}
/*
<style>
    .small {
    max-width: 600px;
    margin:  150px auto;
}
</style>

 */