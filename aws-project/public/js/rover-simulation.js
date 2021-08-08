let arrayPosition = []
const RoverSimulation = {
    template: `
    <body>
      <div id="wrapper">
        <div class="content-area">
          <div class="container-fluid">
            <div class="row text-center" >
              <h1>Welcome to the Marsyard simulation {{userName}} {{arrayPosition}}</h1>                 
            </div>
            <hr>
            <div class="text-center">
              <button type="button" @click="disconnect" class="btn btn-danger rounded-pill btn-lg" v-if="connected"  data-toggle="tooltip" data-placement="top" title="Click here to tear down the connection ">Disconnect!</button>
              <button  type="button"  @click="connect" class="btn btn-success rounded-pill btn-lg" v-else  data-toggle="tooltip" data-placement="top" title="Click here to connect to the simulation">Connect!</button>
              <button class="btn btn-secondary btn-lg position-absolute end-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Settings</button>

            </div>
            <rover-setting :connected="connected" :ws_address="ws_address"></rover-setting>
            <!--updateWsAddress is the method called in the child component to emit the update event
                update_ws_address is the method called in the parent component to intercept the update event and update the ws variable--> 
            <rover-setting-advanced-option :connected="connected" :ws_address="ws_address" @update-ws="update_ws_address"></rover-setting-advanced-option>
        <div v-if="connected">
          <rover-video :connected="connected"></rover-video>
          <rover-commands :connected="connected"></rover-commands>
          <rover-charts :connected="connected" ></rover-charts>
        </div>

          </div>     
      </div>
      </div>
  </body>
	`,
    components: {
        'roverCommands': RoverCommands,
        'roverVideo': RoverVideo,
        'roverCharts': RoverCharts,
        'roverSetting': RoverSetting,
        'roverSettingAdvancedOption': RoverSettingAdvancedOption,
    },
    data () {
        return {
            connected: false, //variable to establish connection w/ ROS applicaation
            ros: null,
            ws_address: 'ws://localhost:9090/',  //address to at which ROS reply--> rosbridge node establish the connection on this port
            odom: '',  //TMP variable to check odom values read
            logs: [],
            userName: '',
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
                this.logs.unshift('Connected!'+ new Date().toTimeString())
                console.log('Connected!')
                this.connected = true
                this.setOdomListener()
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

                //console.log('Received message on ' + listener.name + JSON.stringify(message));
                this.odom = listener.name

                arrayPosition=[]
                arrayPosition.push(message.pose.pose.position.x)
                arrayPosition.push(message.pose.pose.position.y)
                arrayPosition.push(message.pose.pose.position.z)
                arrayPosition.push(message.pose.pose.orientation.x)
                arrayPosition.push(message.pose.pose.orientation.y)
                arrayPosition.push(message.pose.pose.orientation.z)
                arrayPosition.push(message.pose.pose.orientation.w)

                console.log("array" +arrayPosition )

                //arrayPosition[arrayPosition.length] = [message.pose.pose.position.x, message.pose.pose.position.y, message.pose.pose.position.z];
                //console.log('\n\n\n\n\n Odom value' + this.odom + "pos x " + odomPosePositionX)
                //console.log('\n array' + console.table(arrayPosition))

            });
        },
        getUserName: function() {
            axios
                .get(MONGO_URL + "/user/" + this.$route.params.id, {
                    headers: {
                        Authorization: this.token
                    }
                })
                .then(response => {
                    console.log("getUSerName then get "+ response.data.name)
                    this.userName = response.data.name
                })
                .catch(error => {
                    this.$router.replace('/401').catch(err => {});
                });
        },
        update_ws_address(ws_address_updated) {
            this.ws_address = ws_address_updated
        }

    },


    mounted() {
        if (localStorage.user && localStorage.idUser) {
			this.token = localStorage.user;
			this.getUserName();
		} else {
			this.$router.replace('/').catch(err => {});
		}
    },
}                //Absolute 3D position and orientation relative to the Odometry frame (pure visual odometry for ZED, visual-inertial for ZED-M and ZED 2)
// console.log('Received message on ' + listener.name + '; linear velocity' + message.data.linear+ ', angular velocity: ' + message.data.angular);
