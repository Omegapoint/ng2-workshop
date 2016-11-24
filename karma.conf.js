// Karma configuration
// Generated on Mon Feb 15 2016 15:21:58 GMT+0000 (GMT Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jspm', 'jasmine'],

        jspm: {
            stripExtension: false,

            /**
             * jspm.browser.js or custom name.
             */
            browserConfig: null,

            /**
             * jspm.dev.js or custom name.
             */
            devConfig: null,

            /**
             * jspm.node.js or custom name.
             */
            nodeConfig: null,

            /**
             * jspm.config.js or custom name.
             */
            jspmConfig: 'jspm.karma.config.js',

            packages: 'jspm_packages',

            /**
             * Adapters load application and test files,
             * do any pre-work needed to run tests,
             * and implement the karma.start method.
             *
             * 'angular2' is the only option for now.
             * If not defined, a standard set of files
             * needed for angular 2 testing are loaded,
             * provided they are installed via jspm.
             *
             * PR's welcome to implement other frameworks.
             *
             * @param path to adapter | 'angular2'
             */
            adapter: 'angular2',

            /**
             * If test files are wrapped in a method,
             * call the wrapper to initiate tests.
             *
             * @param wrapper method name
             */
            testWrapperFunctionName: 'main',


            /**
             * Files loaded by system js before app is loaded.
             * They will load in same order provided.
             *
             * Default files are set for 'angular2' adapter.
             * This property will override defaults if set.
             */
            preloadBySystemJS: [
                // 'es6-shim',
                // 'reflect-metadata/Reflect.js',
                //
                // // Test Assistance
                // 'zone.js/dist/zone.js',
                // 'zone.js/dist/proxy.js',
                // 'zone.js/dist/sync-test.js',
                // 'zone.js/dist/jasmine-patch.js',
                // 'zone.js/dist/async-test.js',
                // 'zone.js/dist/fake-async-test.js',
                // 'zone.js/dist/long-stack-trace-zone.js',
                //
                // // TestBed.initTestEnvironment
                // '@angular/core/testing',
                // '@angular/platform-browser-dynamic/testing'
            ],

            /**
             * SystemJS will load ts files.
             *
             * Glob 7.x supported.
             *
             * See https://www.npmjs.com/package/glob.
             *
             */
            files: [
                'app/**/!(*.e2e-spec).ts',
                'app/**/*.html'
            ]
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        proxies: { // avoid Karma's ./base virtual directory
            '/app/': '/base/app/',
            '/assets/': '/base/assets/',
            '/jspm_packages/': '/base/jspm_packages/',
            '/scss/': '/base/scss/'
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
        browsers: ['PhantomJS'],

        plugins: [
            'karma-uiuxengineering-jspm',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }

    })
};
