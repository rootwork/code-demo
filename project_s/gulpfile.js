/* eslint-env node, es6 */
/* global Promise */
/* eslint-disable key-spacing, one-var, no-multi-spaces, max-nested-callbacks, quote-props */

'use strict';

var importOnce = require('node-sass-import-once'),
  path = require('path'),
  glob = require('glob');

var options = {};

// #############################
// Edit these paths and options.
// #############################

// The root paths are used to construct all the other paths in this
// configuration. The "project" root path is where this gulpfile.js is located.
// While Zen distributes this in the theme root folder, you can also put this
// (and the package.json) in your project's root folder and edit the paths
// accordingly.
options.rootPath = {
  project     : __dirname + '/',
  styleGuide  : __dirname + '/styleguide/',
  theme       : __dirname + '/'
};

options.theme = {
  name       : 'project_s',
  root       : options.rootPath.theme,
  components : options.rootPath.theme + 'components/',
  build      : options.rootPath.theme + 'components/asset-builds/',
  css        : options.rootPath.theme + 'components/asset-builds/css/',
  js         : options.rootPath.theme + 'js/',
  imgsrc     : options.rootPath.theme + 'images-source/',
  imgdst     : options.rootPath.theme + 'images/'
};

// Set the URL used to access the Drupal website under development. This will
// allow Browser Sync to serve the website and update CSS changes on the fly.
options.drupalURL = 'http://project_s.dev';
// options.drupalURL = 'http://localhost';

// Define the node-sass configuration. The includePaths is critical!
options.sass = {
  importer: importOnce,
  includePaths: [
    options.theme.components,
    options.rootPath.project + 'node_modules/breakpoint-sass/stylesheets',
    options.rootPath.project + 'node_modules/chroma-sass/sass',
    options.rootPath.project + 'node_modules/support-for/sass',
    options.rootPath.project + 'node_modules/typey/stylesheets',
    options.rootPath.project + 'node_modules/zen-grids/sass'
  ],
  outputStyle: 'expanded'
};

// Define which browsers to add vendor prefixes for.
options.autoprefixer = {
  browsers: [
    '> 1%',
    'ie 9'
  ]
};

// Help KSS to automatically find new component CSS files
var cssFiles = glob.sync('*.css', {cwd: options.theme.css}),
  cssStyleguide = [];

cssFiles.forEach(function (file) {
  file = path.relative(options.rootPath.styleGuide, options.theme.css) + '/' + file;
  cssStyleguide.push(file);
});

// Define the style guide paths and options.
options.styleGuide = {
  source: [
    options.theme.components
  ],
  mask: /\.less|\.sass|\.scss|\.styl|\.stylus/,
  destination: options.rootPath.styleGuide,

  builder: 'builder/twig',
  namespace: options.theme.name + ':' + options.theme.components,
  'extend-drupal8': true,

  // The css and js paths are URLs, like '/misc/jquery.js'.
  // The following paths are relative to the generated style guide.
  css: cssStyleguide,
  js: [
      // Drupal JS
      '../../../../core/assets/vendor/domready/ready.min.js',
      '../../../../core/assets/vendor/jquery/jquery.min.js',
      '../../../../core/assets/vendor/jquery-once/jquery.once.min.js',
      '../../../../core/misc/drupalSettingsLoader.js',
      '../../../../core/misc/drupal.js',
      '../../../../core/misc/drupal.init.js',
      '../../../../core/assets/vendor/picturefill/picturefill.min.js',
      '../../../../core/assets/vendor/matchMedia/matchMedia.min.js?v=0.2.0',

      // Contrib module JS
      '../../../../modules/contrib/extlink/extlink.min.js',

      // Theme JS
      '../js/fontfaceobserver.js',
      '../js/script.js',

      // Style guide-specific JS
      '../components/style-guide/styleguide_slideout.min.js',
      '../components/style-guide/styleguide.js'
    ],

  homepage: 'homepage.md',
  title: 'Project S Movement Style Guide'
};

// Define the paths to the JS files to lint.
options.eslint = {
  files  : [
    options.rootPath.project + 'gulpfile.js',
    options.theme.js + '**/*.js',
    '!' + options.theme.js + '**/*.min.js',
    options.theme.components + '**/*.js',
    '!' + options.theme.build + '**/*.js'
  ]
};

// If your files are on a network share, you may want to turn on polling for
// Gulp watch. Since polling is less efficient, we disable polling by default.
options.gulpWatchOptions = {};
// options.gulpWatchOptions = {interval: 1000, mode: 'poll'};


// ################################
// Load Gulp and tools we will use.
// ################################
var gulp      = require('gulp'),
  $           = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  del         = require('del'),
  // gulp-load-plugins will report "undefined" error unless you load gulp-sass manually.
  sass        = require('gulp-sass'),
  kss         = require('kss'),
  cache       = require('gulp-cached'),
  notify      = require('gulp-notify'),
  imagemin    = require('gulp-imagemin');

// The default task.
gulp.task('default', ['build']);

// #################
// Build everything.
// #################
gulp.task('build', ['styles:production', 'styleguide', 'lint', 'images']);

// ##########
// Build CSS.
// ##########
var sassFiles = [
  options.theme.components + '**/*.scss',
  // Do not open Sass partials as they will be included as needed.
  '!' + options.theme.components + '**/_*.scss',
  // Chroma markup has its own gulp task.
  '!' + options.theme.components + 'style-guide/kss-example-chroma.scss'
];

gulp.task('styles', function () {
  return gulp.src(sassFiles)
    .pipe($.sourcemaps.init())
    .pipe(cache())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.rename({dirname: ''}))
    .pipe($.size({showFiles: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(options.theme.css))
    .pipe($.if(browserSync.active, browserSync.stream({match: '**/*.css'})));
});

gulp.task('styles:production', ['clean:css'], function () {
  return gulp.src(sassFiles)
    .pipe($.sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.rename({dirname: ''}))
    .pipe($.size({showFiles: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(options.theme.css));
});

// ##################
// Build style guide.
// ##################
gulp.task('styleguide', ['clean:styleguide', 'styleguide:kss-example-chroma'], function () {
  return kss(options.styleGuide);
});

gulp.task('styleguide:kss-example-chroma', function () {
  return gulp.src(options.theme.components + 'style-guide/kss-example-chroma.scss')
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe($.replace(/(\/\*|\*\/)\n/g, ''))
    .pipe($.rename('kss-example-chroma.twig'))
    .pipe($.size({showFiles: true}))
    .pipe(gulp.dest(options.theme.build + 'twig'));
});

// Debug the generation of the style guide with the --verbose flag.
gulp.task('styleguide:debug', ['clean:styleguide', 'styleguide:kss-example-chroma'], function () {
  options.styleGuide.verbose = true;
  return kss(options.styleGuide);
});

// ##############
// Minify images.
// ##############
gulp.task('images:minify', function() {
  return gulp.src(options.theme.imgsrc + '**')
    .pipe(imagemin())
    .pipe(gulp.dest(options.theme.imgdst + '.'));
});

gulp.task('images', ['images:minify', 'clean:images']);

// #########################
// Lint Sass and JavaScript.
// #########################
gulp.task('lint', ['lint:sass', 'lint:js']);

// Lint JavaScript.
gulp.task('lint:js', function () {
//  return gulp.src(options.eslint.files)
//    .pipe($.eslint())
//    .pipe($.eslint.format());
});

// Lint JavaScript and throw an error for a CI to catch.
gulp.task('lint:js-with-fail', function () {
//  return gulp.src(options.eslint.files)
//    .pipe($.eslint())
//    .pipe($.eslint.format())
//    .pipe($.eslint.failOnError());
});

// Lint Sass.
gulp.task('lint:sass', function () {
//  return gulp.src(options.theme.components + '**/*.scss')
//    .pipe($.sassLint())
//    .pipe($.sassLint.format());
});

// Lint Sass and throw an error for a CI to catch.
gulp.task('lint:sass-with-fail', function () {
//  return gulp.src(options.theme.components + '**/*.scss')
//    .pipe($.sassLint())
//    .pipe($.sassLint.format())
//    .pipe($.sassLint.failOnError());
});

// ##############################
// Watch for changes and rebuild.
// ##############################
gulp.task('watch', ['browser-sync', 'watch:lint-and-styleguide', 'watch:js', 'watch:images']);

gulp.task('browser-sync', ['watch:css'], function () {
  if (!options.drupalURL) {
    return Promise.resolve();
  }
  return browserSync.init({
    proxy: options.drupalURL,
    open: false
  });
});

gulp.task('watch:css', ['clean:css', 'styles'], function () {
  return gulp.watch(options.theme.components + '**/*.scss', options.gulpWatchOptions, ['styles']);
});

gulp.task('watch:lint-and-styleguide', ['styleguide', 'lint:sass'], function () {
  return gulp.watch([
    options.theme.components + '**/*.scss',
    options.theme.components + '**/*.twig'
  ], options.gulpWatchOptions, ['styleguide', 'lint:sass']);
});

gulp.task('watch:js', ['lint:js'], function () {
  return gulp.watch(options.eslint.files, options.gulpWatchOptions, ['lint:js']);
});

gulp.task('watch:images', ['images'], function () {
  return gulp.watch(options.theme.imgsrc + '*', options.gulpWatchOptions, ['images']);
});

// ######################
// Clean all directories.
// ######################
gulp.task('clean', ['clean:css', 'clean:styleguide', 'clean:images']);

// Clean style guide files.
gulp.task('clean:styleguide', function () {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del([
    options.styleGuide.destination + '*.html',
    options.styleGuide.destination + 'kss-assets',
    options.theme.build + 'twig/*.twig'
  ], {force: true});
});

// Clean CSS files.
gulp.task('clean:css', function () {
  return del([
    options.theme.css + '**/*.css',
    options.theme.css + '**/*.map'
  ], {force: true});
});

// Clean minified images.
gulp.task('clean:images', function () {
  return del([
    options.theme.imgdst + '*'
  ], {force: true});
});


// Resources used to create this gulpfile.js:
// - https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js
// - https://github.com/dlmanning/gulp-sass/blob/master/README.md
// - http://www.browsersync.io/docs/gulp/
