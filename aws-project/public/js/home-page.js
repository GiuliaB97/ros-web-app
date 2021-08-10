const HomePage = {
      template: `
		<div class="homeContainer">
        <figure class="text-center">
          <h1>ROS Web Application</h1>
         
          <blockquote class="blockquote">
            <p>This is a web page interface that allow you to control a rover simulation in a ROS environment</p>
          </blockquote>

        </figure>
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
