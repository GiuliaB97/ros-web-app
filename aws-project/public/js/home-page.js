const HomePage = {
      template: `
        
		<div class="homeContainer">
			<div class="blockquote text-center">
              <h1>ROS web app</h1>
              <h5>This is a web page that allow you to connect to control a rover simulation in a ROS workspace</h5>
            </div>
            <hr>
            <homeslider></homeslider>
            
            <homefooter></homefooter>
	</div>
		
	`,
    components:{
      'homefooter': HomeFooter,
      'homeslider': HomeSlider,
    },
    data: function(){
          return{

          }
    },

    methods: {

    },

}
