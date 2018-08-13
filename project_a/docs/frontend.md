# Frontend development: Theming and Pattern Lab

Be sure you've read the [development documentation](/development) first.

## Background information

This project integrates a Pattern Lab based style guide with the custom Drupal
theme.

Both Drupal and Pattern Lab use [Twig](https://twig.symfony.com/) templates, so
be sure to review the following information:

- [Twig Docs](https://twig.symfony.com/doc/1.x/)
- [Drupal Twig overview](https://www.drupal.org/docs/8/theming/twig)
- [Drupal's custom Twig filters](https://www.drupal.org/docs/8/theming/twig/filters-modifying-variables-in-twig-templates)
- [Drupal's custom Twig functions](https://www.drupal.org/docs/8/theming/twig/functions-in-twig-templates)

Other helpful guides to Drupal 8 theming:

- [The Drupal 8 Theming guide](https://sqndr.github.io/d8-theming-guide/) — a
great starting place if you're new to Drupal 8 theming.
- [Twig for Drupal 8 Development: Twig Templating](https://www.electriccitizen.com/blog/twig-drupal-8-development-twig-templating-part-1)
- [Discovering and inspecting variables in Twig templates](https://www.drupal.org/node/1906780)

The custom theme inherits Drupal templates from the core `stable` theme.

Pattern Lab itself is being built outside of Drupal, in the `patternlab`
directory at the root of this project. Our project compiles the assets (CSS,
JS, etc.) and moves them into the custom theme, while keeping the Pattern Lab
Twig templates in the Pattern Lab directory (see
"[Theme directory structure](#theme-directory-structure)").

## Basic setup

You must run `yarn compile` for the custom theme to integrate any changes to
styles, scripts, or templates from Pattern Lab. If you aren't also working in
Pattern Lab, this is all the setup you'll need.

To clear compiled assets, run `yarn compile clean`. This is run as the first
step of the `yarn compile` task.

If you get an error message, run `gulp` instead to get more detailed
information on the failure.

### Starting work on a new ticket

In order, from the root directory of the repository:

`git checkout develop && git pull`

`git checkout -b TICKET` where "TICKET" is the ticket number, such as
"PROJECT_AD8-386." (This is general guidance; there may be situations in which
you name the branch something other than the ticket number.)

`yarn ticket` If your development environment is in a virtual machine, run
this command within the VM. This command does several things:

* runs `composer install`
* removes any artifacts from composer within a VM
* imports configuration into Drupal
* runs any Drupal database updates
* clears the Drupal cache

Running this command *first* when you start a ticket will ensure you don't
have any work "bleeding into" other tickets.

If you experience an error such as "Entities exist of type ... These entities
need to be deleted before importing." you have two options:

1. Within the Drupal UI, find the entities that need to be deleted and remove
them. Note that in addition to nodes, this could include micro content,
paragraph types, menu items, and taxonomy terms.

2. If you're comfortable **removing all nodes** from your local environment,
you can run `drush genc --kill 0 0` on the command line (within the VM if
you're using one).

Then, run `yarn ticket` again.

## Frontend build process

From the root project directory, run `yarn start`. This will run the default
yarn task first, so it will take a minute, but after that it will just watch
files for changes.

If you want to use Browser Sync to automatically reload your browser whenever
asset file changes, run `yarn start-sync` instead, which will open your browser
to `http://192.168.50.51:3000`, proxying your development site.

You may want to run either of these tasks in a separate terminal window, so
you can review and commit changes in git without having to quit and restart
the watch process.

To stop the watch process, hit <kbd>Ctrl-C</kbd> in your terminal. (Yarn may give you an error because the process has been interrupted; you can safely ignore this.)

Note: The watch task in the yarn commands above *only* monitors changes in the
theme's Sass and JS files, not Pattern Lab's.
**TODO: Monitor Pattern Lab asset files too.**

### Troubleshooting the build process

If the `yarn start` process exits with an error, the text of the error will
probably not be very helpful. Temporarily, run `gulp watch`. This should tell
you exactly which part of the build process is failing.

## Theme directory structure

All compiled assets called directly from the browser (CSS, images, etc.) for
this theme are in the `assets` directory (i.e. this is analagous to the usual
`dist` directory). Files located here should not be edited directly.

Sass and JavaScript for the theme have their own source directories, `sass`
and `js`, the contents of which are concatenated, minified, and grouped
together in `assets` with similar files from Pattern Lab.

Pattern Lab is being built outside of Drupal, in the `patternlab` directory
at the root of this project. The Pattern Lab templates reside in
`patternlab/source/_patterns` and are mapped to Drupal templates using
Twig's `include` syntax. (See "[Point the Drupal template to the Pattern Lab
template](#point-the-drupal-template-to-the-pattern-lab-template)".)

Drupal configuration for the theme, imported upon first enabling the theme, is
located in `config`.

Paths for the build process are defined in `gulp.config.json` in the root of
the repository. They are imported in the gulp file with the `config` and
`options` constants, but if changes need to be made to the paths, they should
be made in the JSON file.

Options for the build process — for instance, compilation options — are also
defined in the `options` constant in the gulp file.

## Changing and rebuilding Pattern Lab

If the Pattern Lab templates themselves need to be changed (as opposed to just
mapping them to Drupal templates), or new ones need to be created, use the
following process.

### Pattern Lab development setup and concepts

First, from the project root, run `cd patternlab && composer install`. If the
post-installation prompt asks you questions, respond with `y` (for yes) or
`m` (for merge).

Then `cd` back up to the project root and run `yarn patternlab`. This will
begin watching the Pattern Lab directories for changes, and open a live
version of the compiled Pattern Lab style guide, which will be reloaded any
time changes are made. (If you get an error message, see "[Troubleshooting Pattern Lab](/frontend/#troubleshooting-pattern-lab)".)

Keep this process running in your terminal as long as you are working on
Pattern Lab templates.

Next, open the `patternlab` directory in your file editor. The templates
themselves are located in `patternlab/source/_patterns`, within directories
for atoms, molecules, organisms and the like. Most new templates should be
molecules or atoms; which type they are depend largely on context and your own instincts.
[Brad Frost's introduction](http://bradfrost.com/blog/post/atomic-web-design/)
is a good starting point if you want some guidance.

In this guide, we'll refer to them collectively as "components," which could be
atoms, molecules, or something else.

### Creating new components

If creating a brand new type of component, create a new directory, increasing
the leading number of the directory as necessary. If adding a new version of
an existing component (for instance, a block or an image), create new files
within the existing directory.

Generally, each new component should have two files created:

* **A Twig template file.** This is the markup that Pattern Lab should use for
this component. All valid HTML is acceptable within a Twig file. This file will
be compiled by Pattern Lab to an HTML file in the style guide, and this file
will be what is passed to Drupal to use as its template. Increase the leading
number of the file as necessary, for example `07-block-fancy-things.twig`.

* **A JSON data file.** This is the data that Pattern Lab uses internally to
display the component. This is essentially "dummy content" to allow Pattern Lab
to have something to render when it displays the component in the style guide.
Drupal will not use this file. There may occasionally be some components that
don't require this data file, but most will have it. Match the file name to the
Twig file you created, using `json` instead of `twig` as the file extension,
for example `07-block-fancy-things.json`.

For a good example of these files in the project, take a look at
`02-block-news-article-info.twig` and `02-block-news-article-info.json` inside
`01-molecules/01-block`.

Note that JSON can be a somewhat unforgiving syntax; you may wish to use a
[JSON validator](https://jsonformatter.curiousconcept.com/) if you're less
experienced with this format.

After you create these new files, Pattern Lab should regenerate the style guide
for you so you can view the new component in your browser. If it's not there,
try quitting the `yarn patternlab` in your terminal (<kbd>ctrl-c</kbd>) and
running it again.

### Modifying existing components

You can open any existing Pattern Lab template in your browser and modify it as
necessary. Run `yarn patternlab`, if it's not already running, to update the
style guide.

### Troubleshooting Pattern Lab

If the `yarn patternlab` process exits with an error, the text of the error
will probably not be very helpful. Temporarily, `cd` into the `patternlab`
directory and run `php core/console --generate`. This should tell you
exactly where the syntax or file error is occurring.

The
[Pattern Lab Twig engine documentation](https://github.com/pattern-lab/patternengine-php-twig#overview) is a good resource for troubleshooting
syntax issues.

Note that Drupal has
[custom Twig filters](https://www.drupal.org/docs/8/theming/twig/filters-modifying-variables-in-twig-templates)
that won't necessarily work directly in Pattern Lab templates.

## Integrating Drupal and Pattern Lab templates

This is a three-step process: Identify the Drupal template, copy the template
into the theme if necessary, and point the Drupal template to the Pattern Lab
template.

Before you begin, ensure that you've pulled in all the latest changes from
other branches that may have been merged by running `yarn ticket` (see
"[Starting work on a new ticket](#starting-work-on-a-new-ticket)," above) and
`yarn compile` from the root directory of the repository.

### Identify the Drupal template

The first step is to identify the relevant Drupal template rendering what we
want to control with Pattern Lab and copy it into our theme. In your browser,
inspect the the element with the template you want to copy. You'll see
something like the following just above the element:

```html
<!-- BEGIN OUTPUT from 'core/themes/stable/templates/block/block--system-branding-block.html.twig' -->
```

In this case, the relevant template is coming from Drupal core itself, but
it could also come from a module.

Some elements will require modifying a single template; others will require
more. For instance, an image field that takes multiple images will probably
entail going through this process for the field template (the wrapper div) to
set classes, and then going through it again for the field item (the
individual images) to set additional classes and map variables.

### Using Drupal template modifiers

Here's the path for a
[Paragraph module](https://www.drupal.org/project/paragraphs) element:

```html
<!-- BEGIN OUTPUT from 'modules/contrib/paragraphs/templates/paragraph.html.twig' -->
```

If you copied this template as is, it would apply to *all* Paragraphs —
probably not what you want! Instead, look just above and you'll see something
like the following:

```html
<!--
FILE NAME SUGGESTIONS:
  * paragraph--paragraph-name--default.html.twig
  * paragraph--paragraph-name.html.twig
  * paragraph--default.html.twig
  x paragraph.html.twig
-->
```

This list indicates Drupal's
[template naming inheritance](https://www.drupal.org/node/2354645) for this
element. The final file listed, `paragraph.html.twig`, is being used (
identified with the `x`) but moving upward, you can override it at increasing
levels of specificity. These "modifiers" will always come after a double-dash
(`--`).

So to prevent overriding *all* Paragraphs with your template, take note of the
most helpful modifier being offered — in this case, `paragraph-name` in the
second file listed.

The example in the previous section was also a modifier template for the
default block template (`block.html.twig`), specifying that it only applied to
the system branding block (`block--system-branding-block.html.twig`).

If the element you're working on requires a template specific to its type (a
type of field, a type of block, a type of Paragraph, a type of entity, etc.)
then in the next step you'll provide both the *path* and the *modifier*.

### Copy the Drupal template into the theme

Now, run `yarn compile template`. Copy the full path of the template you
identified (e.g.
`core/themes/stable/templates/block/block--system-branding-block.html.twig`)
and paste it in when it asks you for the path. If you need to use a modifier
for the template, you'll be asked to type that in at the second step. Finally,
choose the type of template (blocks, content, forms, etc.) you're importing.

The script will then copy this file into the appropriate spot in the theme
directory.

You will need to run `drush cr` to prompt Drupal to see the
updated template location. If you inspect the element in the browser again,
you should see something like the following now:

```html
<!-- BEGIN OUTPUT from 'themes/custom/project_a_v2/templates/blocks/block--system-branding-block.html.twig' -->
```

### Identify the Pattern Lab template

Open the [live Pattern Lab site](http://project_a-web.cgpclients.com) and locate the
component. A quick way to do this is to use the bottom link in any of the
drop-down menus, "view all" and then using find-in-page to search for the name
of the component. Next to the component itself, you should see the pattern
info, which includes a description (if set), the Twig markup, and the rendered
HTML markup. If you don't see this, go to the cog in the upper-right corner of
the screen and choose "show pattern info".

Directly above the name of the component you are viewing, you'll see a
breadcrumb-like line that shows the location of the template file, for example
"molecules / navigation".

Look in the `patternlab/source/_patterns` directory, and use the breadcrumb to
find the Twig file with a similar name, which will be something like
`00-site-nav.twig`. You will likely want to open this file in your editor to
inspect what types of data it expects.

Pattern Lab templates are grouped into five directories:

* `00-atoms`
* `01-molecules`
* `02-organisms`
* `03-templates`
* `04-pages`

You will largely be working with templates in the atoms and molecules
directories.

### Customize the Drupal template

In your editor, open the template that was copied into the theme.

The template will likely begin with a large comment block outlining the
variables present in the file. Leave this comment block in place for future
reference.

Below the comment block will be the Twig markup for the template. Replace
some or all of this markup with a Twig include of the Pattern Lab template
(see [below](#point-the-drupal-template-to-the-pattern-lab-template)) — how
much of the markup you replace depends on the needs of the
individual component.

In addition to *markup*, many templates also contain Twig *logic* to set
classes, map fields, establish
[Twig blocks](https://twig.symfony.com/doc/2.x/functions/block.html), or
create or call [macros](https://twig.symfony.com/doc/2.x/tags/macro.html). In
many cases, you'll want to leave this logic in place and simply change the
values to what is expected in the Pattern Lab template (see
"[Passing variables to Pattern Lab](#passing-variables-to-pattern-lab)"). Look
at the Pattern Lab template itself to see what data it expects.

### Point the Drupal template to the Pattern Lab template

Finally, we need to tell Drupal to use the Pattern Lab template each time it
calls this template.

The [Component Libraries](https://www.drupal.org/project/components) module is
used to create a `@pl`
[Twig namespace](https://symfony.com/doc/current/templating/namespaced_paths.html)
to reference the Pattern Lab template you identified earlier. For instance,
`00-site-nav.twig` is located in the
`patternlab/source/_patterns/01-molecules/05-navigation` directory. You can
call this file using the following method:

```php
{% include '@pl/05-navigation/00-site-nav.twig' %}
```

where `@pl` replaces all but the final directory of that path.

The `@pl` namespace will be able to call templates in any of the five Pattern
Lab directories; i.e.
`patternlab/source/_patterns/00-atoms` and
`patternlab/source/_patterns/01-molecules` can both be represented by
`@pl`.

### Pass variables to Pattern Lab

You may need to send variables to the Pattern Lab template, for instance
mapping Drupal field data to the Twig variables or setting classes.

#### Locating the variables

Where do you find these variables? In many cases, the default template will
list variables in a code block at the top of the file.

For variables specific to particular data (for instance, the width and height
of an image on an image field) you'll need to dig into the configuration
variables exposed via Devel module. On a given entity, use the "Devel" tab and
then the "Render" option to get a tree of all the variables. Alternately, and
in places where there is no "Devel" tab, insert the following in your template:

```php
{{ kint() }}
```

Then run `drush cr` to rebuild the page cache.

This will print all of the variables in an expandable list that you can drill
down into. You can also use the `kint()` function on a specific array — for
instance, a field name:

```php
{{ kint(field_machine_name) }}
```

See Drupal's documentation on
[discovering and inspecting variables](https://www.drupal.org/node/1906780)
for more on this topic, and
"[How to print variables using kint](https://www.webwash.net/how-to-print-variables-using-kint-in-drupal-8/)"
for a video on using it.

#### Mapping Drupal variables to Pattern Lab variables

Once you have the variables identified, use Twig's `with ... only` syntax to
map Drupal data to Pattern Lab templates. For instance:

```php
{% set image_url = content.field_profile_image|field_target_entity.field_image.entity.uri.value %}

{% set author = {
  'img_src': image_url|image_style('author_profile'),
  'name': node.label,
  'more_link': url,
  'bio': content.body|field_raw('summary'),
  'staff_title': content.field_staff_title|field_raw('value'),
} %}

{% include '@pl/01-block/02-block-news-article-info.twig' with {
  'article_classes': article_classes,
  'author': author,
  'view_mode': 'profile',
} only %}
```

Note above that in Twig syntax, our code standard is to *always* include a
final comma in key-value pairs ("hashes"), to prevent accidental syntax errors
down the line.
