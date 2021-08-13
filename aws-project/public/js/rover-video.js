const RoverVideo = {
    template: `
      <div id="roverVideo" class="row" >
          <div class="col-md-12 text-center" >
            <h5>Streaming video</h5>
          </div>
          
          <div class="col-md-12 text-center container-fluid">
            <div id="mjpeg"></div>
          </div>
      </div>
  `,
    methods:{
        setCamera: function () {
            console.log('set camera method DESKTOP')
            this.cameraViewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg',
                host: 'localhost',
                width: 640,
                height: 480,
                topic: '/camera/image_raw',
                port: 11315,
            })
        },
        setCamera2: function () {
            console.log('set camera method MOBILE')
            this.cameraViewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg',
                host: 'localhost',
                width: 400,
                height: 320,
                topic: '/camera/image_raw',
                port: 11315,
            })
        },

    },
  mounted(){
      if (screen.width <= 760) {
          console.log("res")
          this.setCamera2();
      }else{
          this.setCamera();
      }
    },
}
