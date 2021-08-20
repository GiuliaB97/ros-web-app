const HomePage = {
      template: `
		<div class="homeContainer">
        <figure class="text-center">
          <h1>Ros Web App</h1>
          <blockquote class="blockquote">
            <p>Ros Web App is a web page that allow you to control a rover simulation in a ROS environment</p>
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
}
