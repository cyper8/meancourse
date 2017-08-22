module.exports = function(config) {
  config.set({
    files: [
      'frontend/build/js/main.js',
      'frontend/build/test/index.js',
      { pattern: './templates/*.html', included: false, served: true }
    ],
    frameworks: ['mocha', 'chai'],
    browsers: ['Chrome'],
    port: 8081,
    proxies : {
      '/': 'http://localhost:8081/base/'
    }
  });
};
