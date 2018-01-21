import bugsnagClient from 'lib/bugsnag'
// Note thet this app initializes and exports the bugsnagClient in bugsnag.js, in order to make the client available to all files in your app.

// attach the Vue plugin to your bugsnag-js client. Note that Bugsnag was loaded with two CDN links in index.html
bugsnagClient.use(bugsnag__vue(Vue))

// *********************************************************** 
//www.bugsnag.com
// https://github.com/bugsnag/bugsnag-vue/tree/master/example
//
// this example app demonstrates some of the basic syntax to get Bugsnag error reporting configured in your Vue project.
// ***********************************************************

// Define the <bad-button/> component
Vue.component('bad-button', {
  template: '#bad-button-template',
  data: function () {
    return { doARenderError: false }
  },
  methods: {
    triggerRenderError: function () {
      this.doARenderError = true
      setTimeout(function () {
        this.doARenderError = false
      }.bind(this), 100)
    }
  }
})
// Define the top-level Vue.js app
var app = new Vue({
  // Hooks into the div#app that exists in the DOM
  el: '#app',
  data: {
    // Just enough data to trigger the errors we need
    doARenderError: false,
    doAWatchError: false
  },
  watch: {
    // A watch function that will throw an error when the
    // value it is watching is set to `true`
    doAWatchError: function (val, oldVal) {
      if (val) {
        try {
          // potentially buggy code goes here
          //for this example, we're just throwing an error explicitly, but you do not need this syntax in your try clause.
          throw new Error('Bad thing!')
        } catch (e) {
          console.log('a handled error has been reported to your Bugsnag dashboard')
          // below modifies the handled error, and then sends it to your dashboard.
          bugsnagClient.notify(e, {
            context: 'Don\'t worry - I handled it.'
          });
        }
      }
    }
  },
  methods: {
    // Sets the data in a way that causes the next render() of this
    // component to throw an error (due to referencing a property
    // of an object that doesn't exist)
    triggerRenderError: function () {
      console.log('an unhandled error has been reported to your Bugsnag dashboard')
      this.doARenderError = true
      setTimeout(function () {
        this.doARenderError = false
      }.bind(this), 100)
    },
    // Throws an error using Vue.js's nextTick() function
    triggerNextTickError: function () {
      console.log('an unhandled error has been reported to your Bugsnag dashboard')
      Vue.nextTick(function () {
        JSON.parse('definitely not json')
      })
    },
    // Changes the value being watched such that it throws an error
    triggerWatchError: function () {
      console.log('an unhandled error has been reported to your Bugsnag dashboard')
      this.doAWatchError = true
      setTimeout(function () {
        this.doAWatchError = false
      }.bind(this), 100)
    }
  }
})


// below is the simplest notification syntax, akin to logging.
console.log('a notification has been reported to your Bugsnag dashboard')
bugsnagClient.notify('End of file')
