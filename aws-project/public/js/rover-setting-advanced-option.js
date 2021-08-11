const RoverSettingAdvancedOption = {
    props: ['ws_address'],

    template: `
      <div id="roverAdvancedSetting">
      <!-- Modal -->
          <div class="modal fade" id="advancedSettingModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="ModalLabel">Worksapce Advanced Settings</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="row">
                      <label for="ws_address" class="row">WorkSpace address:</label>
                    </div>
                    <div class="row">
                      <input type="text" class="form-control" v-model="ws_address" v-on:input="updateWsAddress($event.target.value)">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
      </div>
  `,
    methods:{
        updateWsAddress (ws_address) {
            this.$emit('update-ws', this.$props.ws_address)
            //first arg evt (it is the arg passed as value for the parent method @update_ws when the child component is created in the parent)
            //second arg variable passed
        }
    },
}
