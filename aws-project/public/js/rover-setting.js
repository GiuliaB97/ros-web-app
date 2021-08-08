const RoverSetting = {
    props: ['ws_address', 'connected'],
    components:{

    },
    template: `
    <div id="roverSetting">

    <!--offcanvas-->
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Workspace advanced configuration</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class=" mt-3">
          <label class="row col-form-label">Connection status:</label>
          <input type="text" class="form-control" id="connectionStatus" v-if="connected" value="connected" readonly>
          <input type="text" class="form-control" id="connectionStatus" v-else value="Not connected" readonly>

        </div>
        <div class=" mt-3">
          <label class="col-form-label">Websocket server address is:</label>
          <input type="text" class="form-control" id="ws_address" v-model="ws_address" readonly>
        </div>

        <div class="mt-3">
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Advanced options</button>

        </div>

      </div>
    </div>
    </div>
  `,
    watch: {
        connected: function (val) {
        },

    },
    data: function() {

    },
    methods:{

    },
    mounted(){

    }
}
