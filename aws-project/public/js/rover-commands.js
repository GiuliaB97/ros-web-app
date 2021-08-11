const RoverCommands = {
    template: `
      <div id="roverController" class="row">
       <div class="col-md-12 text-center row">
         <h5>Commands</h5>
       </div>
      
       <!-- 1st row -->
      <div class="col-md-12 text-center">
        <button @click="forward" class="btn btn-primary">Go forward</button>
        <br><br>
      </div>

      <!-- 2nd row -->
      <div class="col-md-4 text-center">
        <button @click="turnLeft" class="btn btn-primary">Turn left</button>
      </div>
      <div class="col-md-4 text-center">
        <button @click="stop" class="btn btn-danger">Stop</button>
        <br><br>
      </div>
      <div class="col-md-4 text-center">
        <button @click="turnRight" class="btn btn-primary">Turn right</button>
      </div>

      <!-- 3rd row -->
      <div class="col-md-12 text-center">
        <button @click="backward" :disabled=" !connected" class="btn btn-primary">Go backward</button>
      </div>
     </div>
  `,

    methods:{
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
    },
}
