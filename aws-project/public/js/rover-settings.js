const RoverSettings = {
    props: ['connected'],
    template: `
      <!--
            <div class="jumbotron ">In aggiunta all'header e i link di navigazione, molti siti web hanno una grossa area centrale che visualizza i contenuti più importanti. Bootstrap la chiama jumbotron.
                  -->
      <div class="row"><!--"col-md-6">-->
        <h3>Workspace settings</h3>
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">Connection status:</label>
          <div class="col-sm-3">
            <input type="text" class="form-control" id="connectionStatus" v-if="connected" value="connected" readonly>
            <input type="text" class="form-control" id="connectionStatus" v-else value="Not connected" readonly>
          </div>

        </div>
        <div class="mb-3 row">
          <label class="col-sm-2 col-form-label">Websocket server address is:</label>
          <div class="col-sm-3">
            <input type="text" class="form-control" id="ws_address" v-model="ws_address" readonly>
          </div>
          <div class="col-sm-6">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="connected">
              Advanced options
            </button>
          </div>




          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Advanced Settings</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="ws_address" class="col-form-label">WorkSpace address:</label>
                      <input type="text" class="form-control" id="ws_address" v-model="ws_address">
                    </div>

                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          <!--
          <label>Websocket server address is: {{ws_address}} actual connection status is: {{connected}} </label>
        -->
          <!--
           <button @click="showAdvanced" class="btn btn-success" v-if="connected & !advanced"  data-toggle="tooltip" data-placement="top" title="Click here to show the advanced option ">Show Advanced option</button>
           
           <div v-if="advanced"  class="row">
             <label for="inputWorkspace" class="col-sm-3 col-form-label">Workspace</label>
             <input type="text" id="ws_address" placeholder="Workspace address" v-model="ws_address" placeholder="Type address of the workspace">
             
             <button @click="hideAdvanced" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Click here to hide the advanced option ">Hide Advanced option</button>

           </div>
         -->
          <div class="col-sm-5">
            <button type="button" @click="disconnect" class="btn btn-danger" v-if="connected"  data-toggle="tooltip" data-placement="top" title="Click here to tear down the connection ">Disconnect!</button>
            <button  type="button"  @click="connect" class="btn btn-success" v-else  data-toggle="tooltip" data-placement="top" title="Click here to connect to the simulation">Connect!</button>
          </div>
        </div>
      </div>
      <hr>
      <!--</div>-->

    `,

    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}