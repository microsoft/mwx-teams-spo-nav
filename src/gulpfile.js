'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

let copyPackageSubtask = build.subTask('copy-package-subtask', function(gulp, buildOptions, done) {
  return gulp.src('./sharepoint/solution/*.sppkg')
             .pipe(gulp.dest('./../solution/'));  
});

// Register the task with gulp command line
let copyPackageTask = build.task('copy-solution', copyPackageSubtask);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(require('gulp'));