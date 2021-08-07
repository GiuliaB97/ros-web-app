const RoverVideo = {
    props: ['connected'],
    template: `
      
      <div id="roverVideo" class="row" >
          <div class="col-md-12 text-center" >
            <h5>Streaming video</h5>
          </div>
          
          <div class="col-md-12 text-center">
            <div id="mjpeg"></div>
          </div>
          
      </div>
  
  `,
    methods:{
        setCamera: function () {
            console.log('set camera method')
            this.cameraViewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg',
                host: 'localhost',
                width: 640,
                height: 480,
                topic: '/camera/image_raw',
                port: 11315,
            })
        },
    },

    // be careful you have commented the method call in the parent component
   mounted(){
       this.setCamera();
    },



}
