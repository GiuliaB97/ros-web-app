const HomePage = {
      template: `
        
		<div class="homeContainer">
			<div>
              <h1>This is the home page</h1>
            </div>
            <homeslider></homeslider>
            <home-footer></home-footer>
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
