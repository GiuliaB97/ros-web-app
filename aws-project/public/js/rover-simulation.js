

const RoverSimulation = {
    template: `
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
            <div class="log-message-container" style="max-height:200px; overflow:auto;">  
              <h3>Log messages</h3>
                <div>
                
                    <p v-for="log in logs">
                        {{ log }}
                    </p>
                    
                </div>
            </div>
        </div>

        <!--
        <div class="col-md-6" style="max-height:200px; overflow:auto;">
            <h3>Log messages</h3>
            <div>
            
                <p v-for="log in logs">
                    {{ log }}
                </p>
                
            </div>
        </div>
-->

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
        <div class="col-md-6">
            <div id="mjpeg"></div>
        </div> 
        
		</div>
	`,

    data: function(){
        return {
            connected: false,
            ros: null,
            ws_address: 'ws://localhost:9090/',
            logs: [],
        }
    },
    // helper methods to connect to ROS
    methods: {
        connect: function() {
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
                this.setCamera()
            })
        },
        disconnect: function() {
            this.ros.close()
        },
        setTopic: function() {
            this.topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist'
            })
        },
        forward: function() {
            this.message = new ROSLIB.Message({
                linear: { x: 1, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        stop: function() {
            this.message = new ROSLIB.Message({
                linear: { x: 0, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        backward: function() {
            this.message = new ROSLIB.Message({
                linear: { x: -1, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        turnLeft: function() {
            this.message = new ROSLIB.Message({
                linear: { x: 0.5, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0.5, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        turnRight: function() {
            this.message = new ROSLIB.Message({
                linear: { x: 0.5, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: -0.5, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        setCamera: function() {
            console.log('set camera method')
            this.cameraViewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg',
                //host: '54.167.21.209',
                //host: '192.168.178.22',
                //host: '127.0.0.1',
                host: 'localhost',
                width: 640,
                height: 480,
                topic: '/camera/image_raw',
                //topic: '/zed2/right_raw/image_raw_color',
                port: 11315,
            })
        },
    },
}