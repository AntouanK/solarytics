
'use strict';

const gulp          = require('gulp'),
      glob          = require('glob'),
      fs            = require('fs'),
      path          = require('path'),
      browserify    = require('browserify'),
      babelify      = require('babelify'),
      Consologger   = require('consologger'),
      // eslint        = require('eslint'),
      source        = require('vinyl-source-stream'),
      runSequence   = require('run-sequence');
const logger        = new Consologger(),
      DEST_PATH     = './dist',
      entryScript   = path.resolve('./src/scripts/entry.js'),
      NODE_ENV      = process.env.NODE_ENV;


console.log('NODE_ENV', NODE_ENV);

//  --------------------------------------------------  tasks

gulp.task('copy-index', () => {
  return gulp.src('./src/index.html')
  .pipe(gulp.dest(DEST_PATH));
});


// gulp.task('lint-scripts', (done) => {
//
//   return gulp.src(['./src/scripts/**/*.js', './src/scripts/**/*.jsx'])
//   .pipe(
//     tap((file, t) => {
//
//       let fileContents = file.contents.toString();
//       let messages = linter.verify(fileContents, eslintrc);
//
//       if(messages.length > 0){
//         messages
//         .map(msg => {
//           msg.filePath = file.path;
//           return msg;
//         })
//         .forEach(errorPrinter);
//       }
//     })
//   );
// });



gulp.task('bundle-scripts', () => {

  return browserify(
    entryScript,
    { debug: NODE_ENV !== 'production' }
  )
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(DEST_PATH));
});


//----------------------------------------------------------------
//-------------------------------- default
gulp.task('default', () => {

  logger
  .blue('Options\n')
  .text('- build-dev\n')
  .text('- build-dist\n')
  .print();
});


//-------------------------------- build-dev
gulp.task('build-dev', (done) => {

  runSequence(
    ['copy-index', 'bundle-scripts'],
    done
  );
});
