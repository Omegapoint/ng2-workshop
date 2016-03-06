// Karma configuration
// Generated on Mon Feb 15 2016 15:21:58 GMT+0000 (GMT Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    files: [
      'node_modules/traceur/bin/traceur-runtime.js' // Required by PhantomJS2, otherwise it shouts ReferenceError: Can't find variable: require
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'jasmine'],


    // list of files / patterns to load in the browser
    jspm: {
      config: 'config.karma.js',
      loadFiles: [
        'app/init.spec.ts',
        'app/**/*.spec.ts'
      ],
      serveFiles: [
        'app/**/*!(*.spec).ts',
        'typings/**/*.*',
        'tsconfig.json'
      ]
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    proxies: { // avoid Karma's ./base virtual directory
      '/app/': '/base/app/',
      '/jspm_packages/': '/base/jspm_packages/',
      '/typings/': '/base/typings/',
      '/tsconfig.json': '/base/tsconfig.json',
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS2'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }

  })
}
