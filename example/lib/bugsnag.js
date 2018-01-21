//This app initializes and exports the bugsnagClient in a separate file, in order to make the client available to all files in your app. See app.js for for how the client can work with your code.

// Note that Bugsnag was loaded with two CDN links in index.html, but it will not be active until initialized, either in the html or here in javascript.
// *********************************************************************

// Initialize Bugsnag to begin tracking errors. Only an api key is required, but here are some other helpful configuration details:
const bugsnagClient = bugsnag({

    // get your own api key at bugsnag.com
    apiKey: 'c2f4a83fbb63b9c09898191a3da3cabd',

    // if you track deploys or use source maps, make sure to set the correct version.
    appVersion: '1.2.3',

    // Bugsnag can track the number of “sessions” that happen in your application, and calculate a crash rate for each release. This defaults to false.
    autoCaptureSessions: true,

    // defines the release stage for all events that occur in this app.
    releaseStage: 'development',

    //  defines which release stages bugsnag should report. e.g. ignore staging errors.
    notifyReleaseStages: [ 'development', 'production'],

    // one of the most powerful tools in our library, beforeSend lets you evaluate, modify, add and remove data before sending the error to bugsnag. The actions here will be applied to *all* errors, handled and unhandled.
    beforeSend: function (report) {
      if (report.errorClass === 'Error' && report.severity === 'warning')  {
        report.updateMetaData('example', {thing: "one"})
      }
      // note that if you return false from the beforeSend, this will cancel the entire error report.
    },

    // attached any user data you'd like to report.
    user: {
      name: "Katherine Johnson",
      email: "kj@nasa.gov",
      id: "0112358"
    },

    // add any custom attributes relevant to your app. Note that metadata can be added here, in a specific notify() or in a beforeSend.
    metaData: { company: {
      name: "Hogwarts School of Witchcraft and Wizardry"
      }
    },
    // N.B. our notifer automatically creates a metadata tab called "React" and populates it with component info.

    // because this is a demo app, below extends the default of 10 notifications per pageload. click away!
    maxEvents: 50
})

export bugsnagClient
