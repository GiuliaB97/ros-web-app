let odomPosePositionX = 0.001
let odomPosePositionY = 0.001
let odomPosePositionZ = 0.001
let odomPoseOrientationX = 0.001
let odomPoseOrientationY = 0.001
let odomPoseOrientationZ = 0.001
let odomPoseOrientationW = 0.001
let arrayPosition = []
const RoverSimulation = {
    template: `

  <body>
    <div id="wrapper">
      <div class="content-area">
        <div class="container-fluid">
          <rover-settings></rover-settings>
            <div class="header">
                <div>
                        <h1>Marsyard simulation</h1>                 
                </div>
                
                <hr>
                <div class="jumbotron "><!--In aggiunta all'header e i link di navigazione, molti siti web hanno una grossa area centrale che visualizza i contenuti più importanti. Bootstrap la chiama jumbotron.
                -->
                    <div class="connection-status-container"><!--"col-md-6">-->
                        <h3>Connection status</h3>
                        
                        <label>Websocket server address</label>
                        <input type="text" v-model="ws_address" />

                        <button @click="disconnect" class="btn btn-danger" v-if="connected "  data-toggle="tooltip" data-placement="top" title="Click here to tear down the connection ">Disconnect!</button>
                        <button @click="connect" class="btn btn-success" v-else  data-toggle="tooltip" data-placement="top" title="Click here to connect to the simulation">Connect!</button>
                      
                        <button @click="showAdvanced" class="btn btn-success" v-if="connected & !advanced"  data-toggle="tooltip" data-placement="top" title="Click here to show the advanced option ">Show Advanced option</button>
                        
                        <div v-if="advanced" >
                          <label for="inputWorkspace" class="col-sm-3 col-form-label">Workspace</label>
                          <input type="text" class="form-control form-control-sm" id="ws_address"
                                 placeholder="Workspace address" v-model="ws_address" placeholder="Type address of the workspace">
                          <button @click="hideAdvanced" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Click here to hide the advanced option ">Hide Advanced option</button>

                        </div>
                      
                    </div>
                </div>
                <hr>
            </div>
          
          <rover-video></rover-video>
          <rover-commands></rover-commands>
          <rover-charts></rover-charts>
                
        </div>
      </div>
      </div>
  </body>
	`,
    components: {
        //'apexchart': VueApexCharts,
        'roverCommands': RoverCommands,
        'roverVideo': RoverVideo,
        'roverCharts': RoverCharts,
        'roverSettings': RoverSettings,
    },

    data: function () {
        return {
            //to create a ROS node object to communicate with a rosbridge server
            //showed:false,
            advanced: false, //variable to show advanced menu to set url
            connected: false, //variable to establish connection w/ ROS applicaation
            ros: null,
            ws_address: 'ws://localhost:9090/',  //address to at which ROS reply--> rosbridge node establish the connection on this port
            odom: '',  //TMP variable to check odom values read
            logs: [],

        }
    },
    // Helper methods to connect to ROS
    // This adds a listener for a connection event to the ros object.
    // The two blocks following the connection event listener do the same for error and close events.
    // This way, we can monitor the connection to the rosbridge server.

    methods: {
        showAdvanced: function() {
            this.advanced=true;
        },
        hideAdvanced: function() {
            this.advanced=false;
        },
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
                //this.setCamera()
                this.setOdomListener()
                //this.setCmdVelistener()

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
                //console.log('Received message on ' + listener.name + JSON.stringify(message));
                this.odom = listener.name
                odomPosePositionX = message.pose.pose.position.x
                odomPosePositionY = message.pose.pose.position.y
                odomPosePositionZ = message.pose.pose.position.z
                odomPoseOrientationX = message.pose.pose.orientation.x
                odomPoseOrientationY = message.pose.pose.orientation.y
                odomPoseOrientationZ = message.pose.pose.orientation.z
                odomPoseOrientationW = message.pose.pose.orientation.w
                //arrayPosition[arrayPosition.length] = [message.pose.pose.position.x, message.pose.pose.position.y, message.pose.pose.position.z];
                //console.log('\n\n\n\n\n Odom value' + this.odom + "pos x " + odomPosePositionX)

                //console.log('\n array' + console.table(arrayPosition))

            });
        },
    },


    mounted() {
        //TODO
/*
if (localStorage.user && localStorage.idUser) {
			this.token = localStorage.user;
			this.getUserName();
		} else {
			this.$router.replace('/').catch(err => {});
		}
 */
    },
}                //Absolute 3D position and orientation relative to the Odometry frame (pure visual odometry for ZED, visual-inertial for ZED-M and ZED 2)
// console.log('Received message on ' + listener.name + '; linear velocity' + message.data.linear+ ', angular velocity: ' + message.data.angular);
