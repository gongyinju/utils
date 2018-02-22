// Karma configuration
// const webpack = require("webpack");
module.exports = function(config) {
  config.set({
    frameworks: ['mocha','chai'],
    files: [
        './../../src/s3.js',
        './../specs/*.js',
    ],
    exclude: [],
    preprocessors: {
        './../../src/s3.js': ['webpack','coverage'],
        './../specs/*.js': ['webpack']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
      webpack: {
          module: {
              loaders: [{
                  test: /\.js$/,
                  loader: 'babel-loader',
                  exclude: /node_modules/,
                  query: {
                      presets: ['es2015'],
                      plugins: ['istanbul']
                  }
              }]
          }
      },
    plugins: [
      "karma-webpack",
      "karma-mocha",
      "karma-chai",
      "karma-coverage",
      "karma-chrome-launcher"
    ],
    reporters: ['progress','coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
