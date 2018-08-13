# Documentation for the Project S Movement theme

## Component-based design

This style guide documents design components defined by this theme and its base theme (Zen).

In general, all design components — Sass partials, related JavaScript, Twig templates, and JSON sample data for the style guide — are kept in subdirectories of the `components` directory.

Drupal 8 manages these component files through its [libraries system](https://www.drupal.org/node/2216195) in `project_s.info.yml` and `project_s.libraries.yml`, and intelligently concatenates and compresses as needed. Both of these files are heavily commented, and they will help guide you in creating new components when necessary.

### Sass and CSS

Sass files are kept in component directories. Directories are loaded by the theme in SMACSS order: `components/base`, then `components/layouts`, then alphabetically by component name. See `project_s.libraries.yml` for more.

The `init` directory contains basic variables and mixins for the project. If you want to reference them, you'll need to include `@import 'init';` at the top of your Sass partial. Colors are [automagically displayed as swatches](/themes/custom/project_s/styleguide/section-sass.html#kssref-sass-colors) using [Chroma](https://johnalbin.github.io/chroma/) as long as you include them in the colors map at the top of `init/_colors.scss`.

Somewhat confusingly, Zen creates a `components` subdirectory of `components` to contain styles for many Drupal-generated items like status messages, watermarks, and comments.

Style guide entries are created automatically based on comments in Sass partials. See "Style guide," below, for more information.

CSS is built (see "Build process," below), in the `components/asset-builds` directory, with a separate CSS file for each component.

### JavaScript

Instead of having a top-level `scripts` or `js` folder in the theme, scripts should be narrowly tailored to a specific component and placed within the component directory. See, for instance, `components/scorecards-node/scorecards-pdf-open.js`. This ensures they are only loaded on pages which require them.

### Twig template files

One of the primary advantages to component design is being able to keep Drupal's templates and this style guide in sync, using the same template files to display components. To that end, overriding a Drupal or module template is a three-step process.

First, copy the original template file (`...html.twig`) to the `templates` directory and the appropriate subdirectory. Copy the file in its entirety, including any documentation at the top of the file. Ensure it has the same filename as the original.

Second, copy the original template file a second time to the appropriate components directory and save it with a simple `...twig` extension and any filename you choose (it often helps to match the component name in the template filename).

Third, open the first copy of the original, in the `templates` folder, and replace the code portion of the file with path to the component template. Because Zen uses the [Components Libraries module](https://www.drupal.org/project/components), you can simplify the path by replacing `themes/custom/project_s/components` with `@project_s`. So, for instance, the file `templates/block--socialmedialinks.html.twig` includes the path this way:

    {% include "@project_s/navigation/social-media/block--social-media.twig" with {
      modifier_class: 'social-media--header'
    } %}

The `with` attribute of a Twig include allows you to automatically set any variables within the template. For more on working with Twig templates in Drupal, [view the documentation](https://www.drupal.org/docs/8/theming/twig).

### Sample JSON data

When a component is displayed in the style guide, it may need some sample data to accurately display the styles — for instance, a blog post needs a title, teaser and image in order to demonstrate what a real blog post would look like.

KSS uses JSON files within the component directory to display sample data. For instance, the `components/components/highlight-mark` directory contains `highlight-mark.json`, which inserts content into the `{{ content }}` placeholder when rendered by the style guide. The JSON file must have the same name as its corresponding Twig template.

JSON files have no effect on the Drupal side.

### Images

Because images are often used in multiple components, both their source files and web-ready versions are stored in top-level directories of this theme.

They are processed during the build process (see "build process," below).

Note the helpful Sass mixin `imagemin-url()`, defined in `components/init/image-url`, which allows you to automatically insert the correct path to a minified image using the image's original filename.

### CKEditor

Settings for CKEditor are finicky enough that they have their own component directory, `components/ckeditor`. These styles are not included in the style guide, and are narrowly scoped to CKEditor fields. This is also the location of the styles that are offered to site editors within the "styles" drop-down list.

Besides these CKEditor-specific styles, not all site styles are pulled into CKEditor fields — only those necessary for content areas are included. These are configured within the `ckeditor_stylesheets` section of `project_s.info.yml`. If you create a new component that might be visible in a content area edited by site editors, be sure to include it here!

## Style guide

The content in this file and directory is generated from code comments in the project&rsquo;s Sass files and processed using [kss-node](https://github.com/kss-node/kss-node), which uses [Knyle Style Sheets (KSS)](https://github.com/kneath/kss).

Here&rsquo;s an example of a KSS Sass comment:

    // Highlight mark
    //
    // The "new" or "updated" marker. This is a very thin component. A front-end
    // developer may choose to delete this component and just style the `<mark>`
    // element directly.
    //
    // Markup: highlight-mark.twig
    //
    // Style guide: components.highlight-mark

The first line is the component's title in the style guide. The section (before the second full line break) is the component's description. The third section tells the style guide where to find the markup to display the component. The third section tells the style guide where to categorize the component.

The style guide categories are defined in `components/_init.scss`.

[Several other attributes are available](https://github.com/kss-node/kss/blob/spec/SPEC.md), including most notably _modifiers_, which allow you to display different variants of a given component without having to separately code each one.

Note that [per the KSS documentation](http://warpspire.com/kss/syntax/), "not every CSS rule should be documented." Only rules that describe visual UI elements are documented in the styleguide. Therefore, there is not (and does not need to be) a 1:1 correspondence between the style guide sections and the Sass folders and partials. Styles not included in the style guide should still include a KSS-style comment with a name, a description if needed, and a note that it is not in the style guide. For example, in `components/scorecards/scorecards-form/_scorecards-form.scss`:

    // Scorecard node creation and edit forms.
    //
    // No style guide entry.

## Build process

Our build process includes several things:

- Sass compilation into CSS
- Auto-prefixing of CSS using [Autoprefixer](https://github.com/postcss/autoprefixer)
- Creation of CSS sourcemaps
- Generating this style guide from KSS comments within the Sass partials
- Minifying images
- Sass and JavaScript linting, using [sass-lint](https://github.com/sasstools/sass-lint) and [ESlint](http://project_s.dev/themes/custom/project_s/styleguide/index.html). See the `.sass-lint.yml` and `.eslintrc` files at the theme root for configuration options.
- A watch function to automatically regenerate assets when needed.

The build process is set out in great detail, and well-commented, within the `gulpfile.js` file in the theme directory.

`gulp` will run the build process once and then quit.

`gulp watch` will run the build process once and then continue to watch for any changes, regenerating assets when needed. It also initiates a BrowserSync proxy to enable you to reload your browser automatically when assets change.

Several other `gulp` tasks are available: `styles`, `images`, `styleguide`, `lint`, and `clean`, which should be self-explanatory.

## Local development

You should have a `sites/default/settings.local.php` file, which makes several helpful local development settings, including:

- Loads `sites/development.services.yml`, which turns on Twig debugging and turns off caching.
- Sets PHP error reporting to verbose.
- Sets Environment Indicator colors.
- Forces the active theme. This can be helpful if and when you need to develop a new theme.
