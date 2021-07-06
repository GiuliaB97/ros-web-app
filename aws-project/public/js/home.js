const Card =  {
    props: ['id'],
	data() {
		return {
			movie: {}
		}
	},
    template: `
		<div v-if="movie" class="filmCard">
			<div class="filmCardImg"><img v-if="movie.poster" v-bind:src=movie.poster class="card-img" alt=""></div>
			<div class="filmCardTxt">
				<h1>{{ movie.title }}</h1>
				<p>{{ movie.plot | limit(200) }}...</p>
			</div>
		</div>
    `,
	methods: {
		init: function () {
			axios.get("http://localhost:3000/api/movies/"+this.id)
			.then(response => {
				this.movie = response.data;
				if(this.movie.poster!=null) this.movie.poster = this.movie.poster.replace("http://ia.media-imdb.com/", "https://m.media-amazon.com/")
			})
			.catch(error => (console.log(error)));

		},
	},
	mounted(){
		this.init()
	},
	filters: {
		limit: function(text, length) {
			if(text==null) return "";
			return text.substring(0, length);
		}
	},
}

const Home = {
	components: {
        'card': Card
    },
	template: `
		<div class="homeContainer">
			<div class="last" v-if="movie">
				<div class="coverImage"><img v-if="movie.poster" v-bind:src=movie.poster class="card-img" alt=""></div>
	            <div class="pattern"></div>
	            <div class="coverText">
	                <div>
	    				<h1>{{ movie.title }}</h1>
	    				<p>{{ movie.plot | limit(50) }}...</p>
	                </div>
				</div>
			</div>
			<div>
				<card id="5692a15524de1e0ce2dfcfa3"></card>
				<card id="5692a51224de1e0ce2dfdc5f"></card>
				<card id="5692a54224de1e0ce2dfdcc7"></card>
			</div>
		</div>
	`,
	data() {
		return {
			movie: {}
		}
	},
	methods: {
		getmovie: function () {
			axios.get("http://localhost:3000/api/lastmovie")
			.then(response => {
				this.movie = response.data;
				if(this.movie.poster!=null) this.movie.poster = this.movie.poster.replace("http://ia.media-imdb.com/", "https://m.media-amazon.com/")
			})
			.catch(error => (console.log(error)));

		}
	},
	mounted(){
		this.getmovie();
	},
	filters: {
		limit: function(text, length) {
			if(text==null) return "";
			return text.substring(0, length);
		}
	},
}
