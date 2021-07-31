const HomeUpdated = {

    template: `
	`,

    method: {
        data() {
            return {
                slide: 0,
                sliding: null
            }
        },
        methods: {
            onSlideStart: function(slide) {
                this.sliding = true
            },
            onSlideStart: function(slide) {
                this.sliding = false
            }
        }
    },

}
