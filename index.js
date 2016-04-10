'use strict';

const path = require('path');
const gulp = require('gulp');

module.exports = function(sails) {
  const gulpFilePath = path.join(sails.config.appPath, 'gulpfile');
  const isProduction = sails.config.environment === 'production';

  return {
    defaults: {
      gulp: {
      }
    },
    configure: function() {
      require(gulpFilePath);

      let taskName = isProduction ? 'production' : 'default';

      gulp.task('run-gulp', [taskName], function(){
        sails.emit('hook:gulp:done');
      });
    },
    initialize: function(cb) {
      sails.on('hook:gulp:done', cb);

      gulp.start('run-gulp');
    }
  };
};
