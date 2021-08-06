const RoverSidebar = {
    template: `
      <div class="advanced-settings">
      <div class="modal fade mt-5"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
           aria-labelledby="staticBackdropLabel" aria-hidden="true"><!--:id="this.$props.modalid"-->
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title m-0 ml-4"> </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form v-if="!this.completed" method="post">
              <div class="modal-body">
                  <div class="pb-3">
                    <div class="bootstrap-select-wrapper">
                      
                    </div>
                  </div>
                  <div class="row">
                    
                  </div>
                
              </div>
              <div class="modal-footer">
                <input type="submit" value="Salva" class="btn btn-success rounded-pill"/>
              </div>
          </form>
            <div v-else class="modal-content">
              <h5 class="form-ok"> ✓ Change confirmed </h5>
            </div>
          </div>
        </div>
      </div>
      </div>
    `,
    props: {

    },
    watch:{

    },
    data() {
        return {
            errors: [],
            completed:false,
        }
    },
    methods: {
    },
    mounted() {
        document.addEventListener('show.bs.modal', (e) => (this.completed = false))
    }
}