var app = new Vue({
    el: '#app',
    // storing the state of the page
    data: {
        connected: false,
        ros: null,
        ws_address: 'ws://localhost:9090/',
        logs: [],
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
                host: '127.0.0.1',
                width: 640,
                height: 480,
                topic: '/camera/rgb/image_raw',
                //topic: '/zed2/right_raw/image_raw_color',
            port: 11315,
            })
        },

    },
})