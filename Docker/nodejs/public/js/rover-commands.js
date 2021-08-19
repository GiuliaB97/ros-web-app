const RoverCommands = {
    props: ['connected'],
    template: `
      <div id="rover controller"v-if="connected" class="row">
       
      <div class=" text-center">
         <h5>Commands</h5>
       </div>
      
       <!-- 1st row -->
      <div class="col-sm-12 text-center">
        <button @click="forward" :disabled="!connected" class="btn btn-primary">Go forward</button>
        <br><br>
      </div>
      <!-- 2nd row -->
      <div class="col-4 text-center">
        <button @click="turnLeft" :disabled="!connected" class="btn btn-primary">Turn left</button>
      </div>
      <div class="col-4 text-center">
        <button @click="stop" :disabled="!connected" class="btn btn-danger">Stop</button>
        <br><br>
      </div>
      <div class="col-4 text-center">
        <button @click="turnRight" :disabled=" !connected" class="btn btn-primary">Turn right</button>
      </div>
      <!-- 3rd row -->
      <div class="col-sm-12 text-center">
        <button @click="backward" :disabled=" !connected" class="btn btn-primary">Go backward</button>
      </div>
     </div>
  `,
    methods:{
        forward: function () {
            this.$emit('forward')
        },
        stop: function () {
            this.$emit('stop')

        },
        backward: function () {
            this.$emit('backward')
        },
        turnLeft: function () {
            this.$emit('turnLeft')
        },
        turnRight: function () {
            this.$emit('turnRight')
        },
    },
}
