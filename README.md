# Examples of code by Ivan Boothe

## Frontend

* [Drupal gulp example](project_a/gulpfile.js): I've been working on this set of gulp-based tasks for awhile, through multiple projects. I think this is a good example of what I've ended up with, which sets up watch tasks (using BrowserSync) for compiling, compressing and linting Sass, JavaScript, images and fonts within a Drupal theme. In this case, it integrates a separately-created and -compiled instance of PatternLab elsewhere in the original repo by compiling it and moving it into the theme directory. It also includes a helper function for grabbing Drupal Twig templates and copying them into the custom theme, so that they can be pointed to Pattern Lab Twig templates.

* [Drupal custom theme example](project_a/web/themes/custom/project_a_v2): This project involved a separate design agency delivering a Pattern Lab styleguide, which I then integrated into Drupal. Consequently, there's not a lot of Sass or JS here. What I did build was a component mapping (see [project_a_v2.info.yml](project_a/web/themes/custom/project_a_v2/project_a_v2.info.yml), lines 62-73) allowing us to directly reference Pattern Lab templates using the `@pl` prefix, put to use extensively in the [templates](project_a/web/themes/custom/project_a_v2/templates).


