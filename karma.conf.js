module.exports = function(config) {
    config.set({
        basePath: 'src',
        frameworks: ['detectBrowsers', 'jasmine', 'jasmine-matchers', 'sinon'],
        files: [
            '../bower_components/codemirror/lib/codemirror.js',
            '../bower_components/rsvp/rsvp.js',
            '../bower_components/domwork/dist/domwork.js',
            '../test/socket.io.js',
            '../test/jasmine-config.js',
            'common/constants.js',
            'client/**/*.js',
            '../test/client/**/*.js'
        ],
        preprocessors: {
            'client/**/*.js': 'coverage'
        },
        coverageReporter: {
            type : 'html',
            dir : '../coverage/'
        },
        exclude: [
        ],
        reporters: ['spec', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],//['Firefox'],
        plugins: [
            'karma-jasmine-matchers',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-sinon',
            'karma-detect-browsers',
            'karma-coverage'
        ],
        detectBrowsers: {
            enabled: false,
            usePhantomJS: true
        },
        captureTimeout: 60000,
        singleRun: true
    });
};