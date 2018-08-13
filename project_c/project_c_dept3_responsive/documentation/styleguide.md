# PROJECT_C Department 3 living style guide

This style guide documents design components defined by this theme and its base theme.

The content below is generated from code comments in the project&rsquo;s Sass files and processed using [kss-node](https://github.com/kss-node/kss-node), which uses [Knyle Style Sheets (KSS)](https://github.com/kneath/kss).

The style guide sections are defined in `sass/style.scss`. Sample markup for many items is kept in Twig template files, with JSON files providing sample data, in the same folders as the Sass partials **in the parent theme**. Because of the way the style guide is compiled, this theme's Sass has to duplicate imports from the base theme prior to adding its own styles, but should not need to define its own markup or sample data.

Note that [per the KSS documentation](http://warpspire.com/kss/syntax/), "not every CSS rule should be documented." Only rules that describe visual UI elements are documented in the styleguide. Therefore, there is not (and does not need to be) a 1:1 correspondence between the style guide sections and the Sass folders and partials.

**For documentation of Sass breakpoints, functions and mixins in this theme and its parent theme, [see this theme's SassDoc](../sassdoc).**

## Resources

- [KSS syntax](https://github.com/kss-node/kss/blob/spec/SPEC.md), including annotations specific to KSS-node.
- [KSS-node documentation](https://github.com/kss-node/kss-node/wiki) &#8212; our style guide home page (the source of this information) is located at `documentation/styleguide.md`.

## Updating this documentation

This style guide is pulled directly from Sass files using KSS syntax. We use [Gulp.js](http://gulpjs.com/) to update this documentation automatically when theme files are updated &#8212; documentation generation is part of the default `gulp` task defined in `/gulpfile.js`.
