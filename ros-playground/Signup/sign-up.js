var app = new Vue({
  el: '#app',
  data: function() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      storeData: 'Yes',
      isSubmitted: false
    }
  },
  methods: {
    submitted() {
      this.isSubmitted = true;
    }
  }
});
