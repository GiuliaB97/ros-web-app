const RoverCharts = {
    props: ['connected'],
    components:{
        'apexchart': VueApexCharts,
    },
    template: `
      <div id="roverChart" class="row">
      <hr>
      <div class="col-md-12 text-center">
        <h5>Odometry data charts</h5>
        <div class="text-center">
          <button @click="hide" class="btn btn-danger" v-if="showed" :disabled="!connected">Hide data charts</button>
          <button @click="show" class="btn btn-info" v-else :disabled="!connected">Show data charts</button>
        </div>
        <div class="row container-fluid text-center">
          <div class="col-md-6 text-center"  v-if="showed">
            <apexchart
                ref="realtimeChart"
                type="line"
                height="200"
                :options="chartOptions"
                :series="series"
            />
          </div>
          <div class="col-md-6 text-center" v-if="showed">
            <apexchart
                ref="realtimeChart2"
                type="bar"
                height="200"
                :options="chartOptions2"
                :series="series2"
            />
          </div>
        </div>
      </div>
      </div>
    `,
    watch: {

    },
    data: function() {
        return {
            showed:false,
            series: [
                {
                    name: "x",
                    data:  Array(5).fill(0)
                },
                {
                    name: "y",
                    data:  Array(5).fill(0)
                },
                {
                    name: "z",
                    data:  Array(5).fill(0)
                }

            ],
            chartOptions: {
                colors: ['#db0909', '#4e9808', '#245c9a'],
                chart: {
                    height: 350,
                },
                grid: {
                    show: true,
                    strokeDashArray: 0,
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                },
                stroke: {
                    curve: 'stepline',
                    width: 5,
                },
                dropShadow: {
                    enabled: true,
                    opacity: 0.3,
                    blur: 5,
                    left: -7,
                    top: 22,
                },
                dataLabels: {
                    enabled: false,
                },
                title: {
                    text: 'Position',
                },
                xaxis: {
                    tooltip: {
                        enabled: false
                    },
                    labels: {
                        show: true
                    },
                    axisTicks: {
                        show: false
                    }
                },

            },
            series2: [
                {
                    name: "x",
                    data: Array(5).fill(0)
                },
                {
                    name: "y",
                    data:  Array(5).fill(0)
                },
                {
                    name: "z",
                    data:  Array(5).fill(0)
                },
                {
                    name: "w",
                    data: Array(5).fill(0)
                }

            ],
            chartOptions2: {
                colors: ['#db0909', '#4e9808', '#245c9a', '#565a5e'],
                chart: {
                    height: 350,
                },
                grid: {
                    show: true,
                    strokeDashArray: 0,
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                },
                stroke: {
                    curve: 'stepline',
                    width: 5,
                },
                dropShadow: {
                    enabled: true,
                    opacity: 0.3,
                    blur: 5,
                    left: -7,
                    top: 22,
                },
                dataLabels: {
                    enabled: false,
                },
                title: {
                    text: 'Orientation',

                },
                xaxis: {
                    tooltip: {
                        enabled: false
                    },
                    labels: {
                        show: true
                    },
                    axisTicks: {
                        show: false
                    }
                },
            }
        }
    },
    methods:{
        show: function(){
            this.showed=true
            this.setDataLineChart();
        },
        hide: function(){
            this.showed=false
        },
        setDataLineChart() {
            setInterval(() => {
                //splice rimuove l'elemento in testa, così l0'array ha sempre lo stesso numero di elementi con cui è stato inizializzato --> se no il grafico diventa illegibile
                for (let i = 0; i < 3; i++) {//Pose.position
                    this.series[i].data.splice(0, 1);
                    //this.$props.arrayPosition[0]
                    this.series[i].data.push(arrayPosition[i]);
                }
                for (let i = 0; i < 4; i++) {//Pose.orientation
                    this.series2[i].data.splice(0, 1);
                    this.series2[i].data.push(arrayPosition[i+3]);
                }
                this.updateSeriesLine();
            }, 5000);
        },
        updateSeriesLine() {
            //updateSeries
            this.$refs.realtimeChart.appendSeries([
                {data: this.series[0].data,},
                {data: this.series[1].data,},
                {data: this.series[2].data,}
            ], false, true);
            this.$refs.realtimeChart2.appendSeries([
                {data: this.series2[0].data,},
                {data: this.series2[1].data,},
                {data: this.series2[2].data,},
                {data: this.series2[3].data,}
            ], false, true);
        },
    },
    mounted(){
        this.setDataLineChart()
    }
}