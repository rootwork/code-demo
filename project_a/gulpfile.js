/* eslint-env node, es6 */
/* eslint-disable key-spacing, one-var, no-multi-spaces, max-nested-callbacks, quote-props */

/**
 * PROJECT_A v2 site-wide tasks.
 */
(function () {
  'use strict';

/**
 * Requirements.
 */

// Node plugins.
let
    autoprefixer = require('autoprefixer'),
    beeper       = require('beeper'),
    browserSync  = require('browser-sync'),
    chalk        = require('chalk'),
    cssnano      = require('cssnano'),
    inquirer     = require('inquirer'),
    log          = require('fancy-log'),
    spawn        = require('child_process').spawn;

// Gulp plugins, using gulp-load-plugins to load them automatically.
let gulp = require('gulp-help')(require('gulp')),
    $    = require('gulp-load-plugins')({
             rename: {
               'gulp-cached': 'cache',
               'gulp-sass-lint': 'sassLint'
             }
           });

// Import the Pattern Lab gulp file, which includes all tasks.
let requireDir = require('require-dir'),
    dir        = requireDir('./patternlab');

/**
 * Options and paths
 */

const options = {};

// Path values are stored in the gulp.config.json file.
let config = require('./gulp.config.json');

// Theme
options.theme = {
  base: config.theme.base,
  assets: config.theme.base + config.theme.assets,
  templates: config.theme.base + '/templates'
};

// Styles (Sass/CSS)
options.styles = {
  includePaths: [
    options.theme.base + 'sass/**/*.scss'
  ],
  outputStyle: 'expanded',
  dest: options.theme.base + config.styles.dest
};

options.autoprefixer = {
  browsers: [
    '> 1%',
    'ie 11'
  ]
};

options.cssnano = {
  preset: 'default'
}

// Scripts (JS)
options.scripts = {
  includePaths: [
    options.theme.base + 'js/**/*.js'
  ],
  dest: options.theme.base + config.scripts.dest
};

// Images
options.images = {
  includePaths: [
    options.theme.base + 'images/**/*.*'
  ],
  dest: options.theme.base + config.images.dest
};

// Fonts
options.fonts = {
  dest: options.theme.base + config.fonts.dest
};

// Pattern Lab
options.plBase              = config.patternlab.base;
  // Scripts
  options.plScriptsBase     = options.plBase + config.scripts.base;
  options.plScriptsFiles    = config.scripts.files.map(i => options.plScriptsBase + i);
  options.plScriptsCompiled = config.scripts.compiled;
  // Styles
  options.plStylesBase      = options.plBase + config.styles.base;
  options.plStylesFiles     = config.styles.files.map(i => options.plStylesBase + i);
  options.plStylesCompiled  = config.styles.compiled;
  // Images
  options.plImagesBase      = options.plBase + config.images.base;
  options.plImagesFiles     = options.plImagesBase + '**/*';
  // Fonts
  options.plFontsBase       = options.plBase + config.fonts.base;
  options.plFontsFiles      = options.plFontsBase + '*.*';
  // Patterns
  options.plPatternsSource  = options.plBase + config.patternlab.source;
  options.plPatternsFiles   = options.plPatternsSource + '**/*';

// Watch tasks
//
// If your files are on a network share, you may want to turn on polling for
// Gulp watch. Since polling is less efficient, we disable polling by default.
options.gulpWatchOptions = {};
// options.gulpWatchOptions = { interval: 1000, mode: 'poll' };

/**
 * Handle errors.
 */

let onError = function (err) {
  $.notify.onError({
    title:    'Gulp error in ' + err.plugin,
    message:  err.toString()
  })(err);
  beeper();
  this.emit('end');
};

/**
 * Log path variables to the screen.
 */

gulp.task('varlist', function() {
  log.info('\n');
  log.info(chalk.magenta.bold.inverse(' PATHS                                                               '));
  log.info(chalk.magenta(' Theme:'), chalk.cyan(options.theme.base));
  log.info(chalk.magenta(' Theme assets:'), chalk.cyan(options.theme.assets));
  log.info(chalk.magenta(' Pattern Lab templates:'), chalk.cyan(options.plPatternsSource));
  log.info('\n');
});

/**
 * Clean tasks.
 */

// Remove compiled scripts from the theme.
gulp.task('clean:scripts', function () {
  return gulp.src(
    [
      options.scripts.dest
    ],
    { read: false }
  )
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.clean({
    force: true
  }));
});

// Remove compiled styles from the theme.
gulp.task('clean:styles', function () {
  return gulp.src(
    [
      options.styles.dest
    ],
    { read: false }
  )
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.clean({
    force: true
  }));
});

// Remove minified images from the theme.
gulp.task('clean:images', function () {
  return gulp.src(
    [
      options.images.dest
    ],
    { read: false }
  )
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.clean({
    force: true
  }));
});

// Remove copied fonts from the theme.
gulp.task('clean:fonts', function () {
  return gulp.src(
    [
      options.fonts.dest
    ],
    { read: false }
  )
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.clean({
    force: true
  }));
});

// All clean tasks.
gulp.task('clean', function() {
  log.info('\n\n🛁 ', chalk.white.bold.inverse(' Removing generated assets from the theme. '));
  gulp.start(
    'clean:scripts',
    'clean:styles',
    'clean:images',
    'clean:fonts'
  );
});

/**
 * Pattern Lab tasks
 */

// Run default gulp task in Pattern Lab.
gulp.task('pl-dev', function(done) {
  log.info('\n\n🔬 ', chalk.white.bold.inverse(' Starting internal Pattern Lab development build. '));
  spawn('gulp', { cwd: options.plBase, stdio: 'inherit' })
    .on('close', done);
});

// Run prod gulp task in Pattern Lab.
gulp.task('pl-prod', function(done) {
  log.info('\n\n🔬 ',chalk.white.bold.inverse(' Starting internal Pattern Lab production build. '));
  spawn('gulp', ['prod'], { cwd: options.plBase, stdio: 'inherit' })
    .on('close', done);
});

// Run serve gulp task in Pattern Lab.
gulp.task('pl-serve', function(done) {
  log.info('\n\n🔬 ', chalk.white.bold.inverse(' Starting internal Pattern Lab serving. '));
  spawn('gulp', ['serve'], { cwd: options.plBase, stdio: 'inherit' })
    .on('close', done);
});

/**
 * Drupal template tasks
 */

// Copy a Drupal template from the system to the theme.
gulp.task('template', function() {
  log.info(chalk.yellow.bold('Preparing to copy a Drupal template into the theme:\n'))

  let questions = [
    {
      type: 'input',
      name: 'path',
      message: 'What is the path of the source template? (Hint: Twig debug will tell you.)'
    },
    {
      type: 'input',
      name: 'modifier',
      message: 'Do you want to append a modifier to the base filename? (Hit enter for none.)'
    },
    {
      type: 'list',
      name: 'type',
      message: 'Choose the type of template:',
      choices: ['Blocks', 'Content', 'Forms', 'Paragraphs', 'Layout', 'Navigation', 'Misc'],
      filter: function(val) {
        return val.toLowerCase();
      }
    }
  ];

  return inquirer.prompt(questions).then(answers => {

    // Establish file and path variables.
    const sourceFile = 'web/' + answers.path.trim();
    const fileModifier = answers.modifier;
    const fileModifierPath = '--' + fileModifier.trim();
    const fileExt = '.html.twig';
    const fileName = answers.path.substr(answers.path.lastIndexOf('/') + 1).trim().replace(fileExt, '');

    if (fileModifier) {
      var destFile = fileName + fileModifierPath + fileExt;
    } else {
      var destFile = fileName + fileExt;
    }

    const destDir = options.theme.base + 'templates/' + answers.type;
    const destPath = options.theme.base + 'templates/' + answers.type + '/' + destFile;

    // Copy file.
    return gulp.src(sourceFile)
    .pipe($.plumber({
      errorHandler: onError
    }))
   .on('end', function() {
      log.info(chalk.yellow.bold('\n\nCopied Drupal template into theme:\n') + chalk.magenta.bold(destPath) + chalk.yellow.bold('\n\nRun ') + chalk.red.bold('drush cr') + chalk.yellow.bold(' to load the new template.'))
    })
    .pipe($.rename(destFile))
    .pipe(gulp.dest(destDir))
    .pipe(browserSync.reload({stream:true}));
  });
});

/**
 * Script tasks.
 */

// Grab the Pattern Lab compiled scripts.
gulp.task('scripts:pl', function () {
  gulp.src(options.plScriptsFiles)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .on('end', function() {
    log.info(chalk.white.bold('Copied Pattern Lab scripts into theme assets.'))
  })
  .pipe($.concat(options.plScriptsCompiled))
  .pipe(gulp.dest(options.scripts.dest))
  .pipe(browserSync.reload({stream:true}));
});

// Compile theme scripts.
gulp.task('scripts:theme', function () {
  gulp.src(options.scripts.includePaths)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .on('end', function() {
    log.info(chalk.white.bold('Compiled theme scripts.'))
  })
  .pipe($.uglify())
  .pipe(gulp.dest(options.scripts.dest))
  .pipe(browserSync.reload({stream:true}));
});

// All script tasks.
gulp.task('scripts', ['clean:scripts'], function() {
  gulp.start(
    'scripts:pl',
    'scripts:theme'
  );
});

/**
 * Styles (Sass/CSS) tasks.
 */

// Grab the Pattern Lab compiled styles and refine them.
gulp.task('styles:pl', function () {
  gulp.src(options.plStylesFiles)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .on('end', function() {
    log.info(chalk.white.bold('Compiled Pattern Lab styles.'))
  })
  .pipe($.if('**/style.css', $.rename({basename: 'pl'})))
  .pipe($.sourcemaps.init())
  .pipe($.postcss([
    autoprefixer(options.autoprefixer),
    cssnano(options.cssnano)
  ]))
  .pipe($.concat(options.plStylesCompiled))
  .pipe($.size({showFiles: true}))
  .pipe($.sourcemaps.write('./maps'))
  .pipe(gulp.dest(options.styles.dest))
  .pipe(browserSync.reload({stream:true}));
});

// Compile theme styles.
gulp.task('styles:theme', function () {
  gulp.src(options.styles.includePaths)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .on('end', function() {
    log.info(chalk.white.bold('Compiled theme styles.'))
  })
  .pipe($.sourcemaps.init())
  .pipe($.sass(options.styles))
  .pipe($.postcss([
    autoprefixer(options.autoprefixer),
    cssnano(options.cssnano)
  ]))
  .pipe($.rename({dirname: ''}))
  .pipe($.size({showFiles: true}))
  .pipe($.sourcemaps.write('./maps'))
  .pipe(gulp.dest(options.styles.dest))
  .pipe(browserSync.reload({stream:true}));
});

// All styles tasks.
gulp.task('styles', ['clean:styles'], function() {
  gulp.start(
    'styles:pl',
    'styles:theme'
  );
});

/**
 * Image tasks.
 */

// Grab the Pattern Lab images and minify them.
gulp.task('images:pl', function () {
  gulp.src(
    options.plImagesFiles,
    { base: options.plImagesBase }
  )
  .pipe($.plumber({
    errorHandler: onError
  }))
  .on('end', function() {
    log.info(chalk.white.bold('Minified Pattern Lab images.'))
  })
  .pipe($.imagemin())
  .pipe(gulp.dest(options.images.dest));
});

// Grab theme images and minify them.
gulp.task('images:theme', function () {
  gulp.src(options.images.includePaths)
  .on('end', function() {
    log.info(chalk.white.bold('Minified theme images.'))
  })
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.imagemin())
  .pipe(gulp.dest(options.images.dest));
});

// All image tasks.
gulp.task('images', ['clean:images'], function() {
  gulp.start(
    'images:pl',
    'images:theme'
  );
});

/**
 * Font tasks.
 */

// Copy fonts from Pattern Lab.
gulp.task('fonts', ['clean:fonts'], function () {
  gulp.src(
    options.plFontsFiles,
    { base: options.plFontsBase }
  )
  .pipe($.plumber({
    errorHandler: onError
  }))
  .on('end', function() {
    log.info(chalk.white.bold('Compiled Pattern Lab fonts into theme assets.'))
  })
  .pipe(gulp.dest(options.fonts.dest))
  .pipe(browserSync.reload({stream:true}));
});

/**
 * Linting tasks.
 */

// Lint scripts.
gulp.task('lint:scripts', function () {
  gulp.src(options.scripts.includePaths)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.eslint())
  .pipe($.eslint.format());
});

// Lint styles.
gulp.task('lint:styles', function () {
  gulp.src(options.styles.includePaths)
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.sassLint())
  .pipe($.sassLint.format());
});

// All lint tasks.
gulp.task('lint', ['lint:styles', 'lint:scripts']);

/**
 * BrowserSync tasks
 */

gulp.task('browser-sync', function () {

  // Query for site development URL.
  let questions = [
    {
      type: 'input',
      name: 'url',
      message: 'What is your local site development URL?',
      default: 'http://project_a.test'
    }
  ];

  // Pass in site development URL and launch BrowserSync.
  return inquirer.prompt(questions).then(answers => {
    const siteURL = answers.url;

    return browserSync.init({
      proxy: siteURL,
      open: 'external'
    });
  });
});

/**
 * Watch tasks.
 */

// Watch notifications.
gulp.task('watch:notify:cli', function () {
  log.info('\n\n🔄 ', chalk.bold.white.bgMagenta(' File changes detected. Recompiling. '));
});
gulp.task('watch:notify:os', function () {
  $.notify('File changes detected. Recompiling.  🔄').write('');
});

// Watch scripts.
gulp.task('watch:scripts', ['clean:scripts', 'scripts'], function () {
  return gulp.watch(options.scripts.includePaths, options.gulpWatchOptions, ['scripts:theme', 'lint:scripts'])
  .on('change', function () {
    browserSync.reload();
    gulp.start(
      'watch:notify:cli',
      'watch:notify:os'
    );
  });
});

// Watch styles (Sass/CSS).
gulp.task('watch:styles', ['clean:styles', 'styles'], function () {
  return gulp.watch(options.styles.includePaths, options.gulpWatchOptions, ['styles:theme', 'lint:styles'])
  .on('change', function () {
    browserSync.reload();
    gulp.start(
      'watch:notify:cli',
      'watch:notify:os'
    );
  });
});

// Watch images.
gulp.task('watch:images', ['clean:images', 'images'], function () {
  return gulp.watch(options.images.includePaths, options.gulpWatchOptions, ['images:theme'])
  .on('change', function () {
    browserSync.reload();
    gulp.start(
      'watch:notify:cli',
      'watch:notify:os'
    );
  });
});

// Watch Pattern Lab templates.
gulp.task('watch:patterns', function () {
  return gulp.watch(options.plPatternsFiles, options.gulpWatchOptions)
  .on('change', function () {
    browserSync.reload();
    gulp.start(
      'watch:notify:cli',
      'watch:notify:os'
    );
  });
});

// Watch theme templates.
gulp.task('watch:templates', function () {
  return gulp.watch(options.theme.templates + '/**/*', options.gulpWatchOptions)
  .on('change', function () {
    browserSync.reload();
  });
});

// All default watch tasks
gulp.task('watch', ['default'], function() {
  gulp.start(
    'watch:scripts',
    'watch:styles',
    'watch:patterns',
    'watch:templates'
  );
});

// Watch task with Browser Sync
gulp.task('watch-sync', function () {
  gulp.start(
    'browser-sync',
    'watch'
  );
});

/**
 * General gulp tasks
 */

// `gulp`
gulp.task('default', ['varlist', 'pl-prod', 'clean'], function() {
  gulp.start(
    'fonts',
    'images',
    'scripts',
    'styles',
    'lint'
  );
});

// `gulp pl`
gulp.task('pl', ['varlist', 'pl-serve'], function() {
});

})();
