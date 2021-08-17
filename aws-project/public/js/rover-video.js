const RoverVideo = {
    template: `
      <div id="roverVideo" class="row " >
          <div class="col-md-12 text-center" >
            <h5>Streaming video</h5>
          </div>
          <div class="col-md-12 text-center container-fluid">
            <div id="mjpeg"></div>
          </div>
      </div>
  `,
    data () {
        return {//desktop video dimensions as default
            width: 940,
            height: 560,
        }
    },
    methods:{
        setCamera: function () {
            console.log('set camera method')
            this.cameraViewer = new MJPEGCANVAS.Viewer({
                width: this.width,
                height: this.height,
                divID: 'mjpeg',
                host: 'localhost',
                topic: '/camera/image_raw',
                port: 11315,
            })
        },
    },
  mounted(){
      if (screen.width <= 760) {
          this.width = 400
          this.height = 320
      }
      this.setCamera();
    },
}
