let odomPosePositionX= 0.0
let odomPosePositionY= 0.2
let odomPosePositionZ= 0.3
const RoverSimulation = {
    template: `

  <body>
    <div id="wrapper">
      <div class="content-area">
        <div class="container-fluid">
		<div class="rover">
			<div>
                    <h1>This is the rover simulation page</h1>                 
            </div>
<!--
In aggiunta all'header e i link di navigazione, molti siti web hanno una grossa area centrale che visualizza i contenuti più importanti. Bootstrap la chiama jumbotron.
-->
        <div class="jumbotron ">
            <div class="connection-status-container"><!--"col-md-6">-->
                <h3>Connection status</h3>
              
                <label>Websocket server address</label>
                <input type="text" v-model="ws_address" />
                <br />
                
                <button @click="disconnect" class="btn btn-danger" v-if="connected">Disconnect!</button>
                <button @click="connect" class="btn btn-success" v-else>Connect!</button>
            </div>
         </div>
        <hr>
        <div class="row">
            <div class="col-md-12 text-center">
                <h5>Commands</h5>
            </div>

            <!-- 1st row -->
            <div class="col-md-12 text-center">
                <button @click="forward" :disabled="!connected" class="btn btn-primary">Go forward</button>
                <br><br>
            </div>

            <!-- 2nd row -->
            <div class="col-md-4 text-center">
                <button @click="turnLeft" :disabled="!connected" class="btn btn-primary">Turn left</button>
            </div>
            <div class="col-md-4 text-center">
                <button @click="stop" :disabled="!connected" class="btn btn-danger">Stop</button>
                <br><br>
            </div>
            <div class="col-md-4 text-center">
                <button @click="turnRight" :disabled=" !connected" class="btn btn-primary">Turn right</button>
            </div>

            <!-- 3rd row -->
            <div class="col-md-12 text-center">
                <button @click="backward" :disabled=" !connected" class="btn btn-primary">Go backward</button>
            </div>
            </div>
            <div class=""row">
            <div class="col-md-12 text-center">
                <div id="mjpeg"></div>
                <div id="mjpeg2"></div>
            </div> 
            </div>
             <div class="row">
            <div class="col-md-6 text-center">
                 <apexchart
      ref="realtimeChart"
      type="line"
      height="200"
      :options="chartOptions"
      :series="series"
  />
            </div> 
            </div>
                  
		</div>
		</div>
		</div>
		</div>
	`,
    components: {
        'apexchart': VueApexCharts
    },


    data: function () {
        return {
            //to create a ROS node object to communicate with a rosbridge server

            connected: false,
            ros: null,
            ws_address: 'ws://localhost:9090/',
            odom: '',
            logs: [],
            series: [
                {
                    name: "x",
                    data: [0.001, 0.002]
                },
                {
                    name: "y",
                    data: [0.003, 0.004]
                },
                {
                    name: "z",
                    data: [0.005, 0.006]
                }

            ],
            chartOptions: {
                colors: ['#FCCF31', '#17ead9', '#f02fc2'],
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
                    text: 'Odometry Pose position',
                    align: 'left',
                    style: {
                        color: '#FFF',
                    },
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
        }
    },
    // Helper methods to connect to ROS
    // This adds a listener for a connection event to the ros object.
    // The two blocks following the connection event listener do the same for error and close events.
    // This way, we can monitor the connection to the rosbridge server.

    methods: {
        connect: function () {
            this.logs.unshift('connect to rosbridge server!!')
            this.ros = new ROSLIB.Ros({
                url: this.ws_address
            })
            this.ros.on('connection', () => {
                this.connected = true
                this.logs.unshift('Connected!')
                console.log('Connected!')
            })
            this.ros.on('error', (error) => {
                this.logs.unshift('Error connecting to websocket server')
                console.log('Error connecting to websocket server: ', error)
            })
            this.ros.on('close', () => {
                this.connected = false
                this.logs.unshift('Connection to websocker server closed')
                console.log('Connection to websocket server closed.')
            })
            this.ros.on('connection', () => {
                this.logs.unshift((new Date()).toTimeString() + ' - Connected!')
                this.connected = true
                this.loading = false
                //listeners
                this.setCamera()
                this.setOdomListener()
                this.setCmdVelistener()

            })
        },
        disconnect: function () {
            this.ros.close()
        },
        //A ROSLIB.Topic corresponds to a ROS Topic. The topic declares the topic name, message type, and passes in the ROS object from earlier.
        // Topics can be used to subscribe or publish or both.
        //To publish, we first need to create a new ROSLIB.Message.
        // It takes in an object literal that matches up to the message definition on the ROS system.
        setTopic: function () {
            this.topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist'
            })
        },
        //after we have the message, we just pass it to the ROSLIB.Topic to publish.
        forward: function () {
            this.message = new ROSLIB.Message({
                linear: {x: 1, y: 0, z: 0,},
                angular: {x: 0, y: 0, z: 0,},
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        stop: function () {
            this.message = new ROSLIB.Message({
                linear: {x: 0, y: 0, z: 0,},
                angular: {x: 0, y: 0, z: 0,},
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        backward: function () {
            this.message = new ROSLIB.Message({
                linear: {x: -1, y: 0, z: 0,},
                angular: {x: 0, y: 0, z: 0,},
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        turnLeft: function () {
            this.message = new ROSLIB.Message({
                linear: {x: 0.5, y: 0, z: 0,},
                angular: {x: 0, y: 0, z: 0.5,},
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        turnRight: function () {
            this.message = new ROSLIB.Message({
                linear: {x: 0.5, y: 0, z: 0,},
                angular: {x: 0, y: 0, z: -0.5,},
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        setCamera: function () {
            console.log('set camera method')
            this.cameraViewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg',
                host: 'localhost',
                width: 640,
                height: 480,
                topic: '/camera/image_raw',
                port: 11315,
            })
        },

        setCmdVelistener: function () {
            //problema se metto this.cmdVel non trova name idk why
            //to fix stringify
            cmdVelListener = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist'
            })
            // this.setListener()
            console.log('set cmdVel listener')
            cmdVelListener.subscribe(function (message) {
                console.log('Received message on ' + cmdVelListener.name + JSON.stringify(message));

            });
        },

        setOdomListener() {
            listener = new ROSLIB.Topic({
                ros: this.ros,
                name: '/zed2/odom',
                messageType: 'nav_msgs/Odometry'
            });
            console.log('set odom listener')
            listener.subscribe(function (message) {
                //var obj = JSON.parse(message);
                //message.pose.pose.position.x
                //message.pose.pose.position.y
                //message.pose.pose.position.z
                //message.pose.pose.orientation.x
                //message.pose.pose.orientation.y
                //message.pose.pose.orientation.z
                //message.pose.pose.orientation.w
                //JSON.stringify(message.pose.pose.position.x)
                console.log('Received message on ' + listener.name + JSON.stringify(message));
                this.odom = listener.name
                odomPosePositionX = message.pose.pose.position.x
                odomPosePositionY = message.pose.pose.position.y
                odomPosePositionZ = message.pose.pose.position.z
                console.log('\n\n\n\n\n Odom value'+ this.odom + "pos x "+ odomPosePositionX +"pos x "+ odomPosePositionY)
                /*
                                    setInterval(() => {
                                    console.log("\n\n odom from line chart"+ this.odomPosePositionX)
                                    this.series[0].data.splice(0, 1);
                                    this.series[0].data.push(this.getRandomArbitrary(0, 99));
                                    this.updateSeriesLine();
                                    }, 1000);
                */

            });
        },
        getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * 99);
        },
        setDataLineChart() {
            setInterval(() => {
                console.log("\n\n odom from line chart"+ odomPosePositionX + odomPosePositionY +"\n\n"+this.series[0].data+"\n"+this.series[1].data)
                this.series[0].data.splice(0, 1);
                this.series[0].data.push(odomPosePositionX);

                this.series[1].data.splice(0,1);
                this.series[1].data.push(odomPosePositionY);

                this.series[2].data.splice(0,1);
                this.series[2].data.push(odomPosePositionZ);
                this.updateSeriesLine();
            }, 2000);
        },
        updateSeriesLine() {
            //updateSeries
            this.$refs.realtimeChart.appendSeries([{
                data: this.series[0].data,
            }, {data: this.series[1].data,}, {data: this.series[2].data,}], false, true);
            /*
            this.$refs.realtimeChart.updateSeries([{
                data: this.series[1].data,
            }], false, true);
            this.$refs.realtimeChart.updateSeries([{
                data: this.series[2].data,
            }], false, true);
*/
        },
    },
    mounted() {
        this.setDataLineChart();
    },
}                //Absolute 3D position and orientation relative to the Odometry frame (pure visual odometry for ZED, visual-inertial for ZED-M and ZED 2)
                    // console.log('Received message on ' + listener.name + '; linear velocity' + message.data.linear+ ', angular velocity: ' + message.data.angular);
