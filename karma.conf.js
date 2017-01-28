module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
        'jasmine'
    ],

    files: [
      'node_modules/angular/angular.js',
      'src/app/**/*.spec.js',
      'dist/js/bundle.js',
    ],

    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ],

    reporters: [
        'spec'
    ],

    browsers: [
        'PhantomJS'
    ],

    colors: true,

    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  })
};
