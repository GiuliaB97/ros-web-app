const HomeSlider = {
    template: `
      <div>
      <transition-group name='fade' tag='div' >
        <div  v-for="i in [currentIndex]" :key='i'>
          <!--rounded mx-auto d-block: is magic tag to center the image-->
          <img :src="currentImg" id="image-slider" class="rounded mx-auto d-block"/>
        </div>
      </transition-group>
      <a class="prev" @click="prev" href='#'>&#10094;</a>
      <a class="next" @click="next" href='#'>&#10095;</a>

      </div>
      
		
	`,
    components:{
    },
    data: function(){
        return{
            images: [
                '/static/img/erc1.jpg',
                '/static/img/erc3.jpeg',
                '/static/img/erc4.jpg',
                '/static/img/erc5.jpg'
            ],
            timer: null,
            currentIndex: 0,
        }
    },
    mounted: function() {
        this.startSlide();
    },

    methods: {
        startSlide: function() {
            this.timer = setInterval(this.next, 2000);
        },


        next: function() {
            this.currentIndex += 1
        },
        prev: function() {
            this.currentIndex -= 1
        }
    },

    computed: {
        currentImg: function() {
            return this.images[Math.abs(this.currentIndex) % this.images.length];
        }
    }

}
