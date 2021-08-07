const RoverCommands = {
    props: ['connected'],
    template: `
      <div id="rover controller" class="row" v-if="connected" >
      <!--<div id="rover controller" class="row">-->
       <div class="col-md-12 text-center row">
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
      <!--</div>-->
  
  `,
    components: {

    },
    data: function() {
        return {

        }
    },
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
    mounted(){
        console.log('\n\n\n\n connection value:' + this.connected)
    },
    created () {
        console.log('\n\n\n\n connection value:' + this.connected)
    },
    beforeUpdate () {
        console.log('\n\n\n\n connection value:' + this.connected)
    }

}
