Information provided here is relevant to both backend and frontend developers
on this site.

# Basic requirements

- A POSIX-compliant machine (e.g. macOS or Linux). If you use Windows, you'll
need either a virtual machine or, possibly, the
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (
version 2.9 or later)
- PHP (version 7.1 or later)
- mySQL, mariadb, or equivalent

No specific local development setup is required, but some options for
satisfying the requirements above are installing them on your machine
directly, [MAMP](https://www.mamp.info/en/)/[WAMP](https://wamp.net/) or
[WAMP Server](http://www.wampserver.com/en/)/[XAMPP](https://www.apachefriends.org),
[vagrant](https://www.vagrantup.com/) (e.g.
[DrupalVM](https://www.drupalvm.com/)) and [Docker](https://www.docker.com/).

Please note that this project uses the `web` directory as the web root, one
level down from the repository root; you may need to alter the default
behavior of your local setup to match.

## Setting up your local environment

Once your environment is created, the following additional tools should be
installed (instructions are provided at the links):

- [composer](https://getcomposer.org/download/)
- [Node.js](https://nodejs.org/en/) (version 8.x or later)
- [Yarn](https://yarnpkg.com/en/docs/install)

If your local development environment has a separate virtual machine, be sure
these tools are installed in the virtual environment as well.

# Initial setup

1. Clone this repository.
2. Open a terminal at the root of the repo.
3. Run `composer install`.
4. Run `yarn install`.
5. Edit `web/sites/default/settings.local.php` and update the database
connection info to match your local setup.

**A note on Drush**: Drush is installed as part of the composer requirements.
If you want to use this version, you should prefix any `drush` commands with
the relative path to `vendor/bin` inside the project repo. (For instance, from
the root directory in the repo you would run `./vendor/bin/drush`; from inside
the `web` directory you would run `../vendor/bin/drush`.) If your local
environment includes drush already, you can use the `drush` commands without
prefixing from within the `web` directory.

## A clean install of Drupal

During the initial development of the site, as migrated content is prepared
and design choices are made, developers will be installing and reinstalling
the site from scratch.

Install the site by entering `composer run-script clean-install` in the
terminal when at the repository root (one level above the `web` directory).

You should now be able to visit `http://YOUR_LOCAL_HOSTNAME/` and see the site
with a clean installation using the verson controlled configuration.

To log in as the administrative user (user 1), enter
`drush uli -l YOUR_LOCAL_HOSTNAME` in the terminal.

# Working on tickets

Each time you start work on a new ticket, you should do the following:

1. Check out the `develop` branch and `git pull` the latest changes.
2. Branch off of the `develop` branch. In most cases, it's helpful to include
the ticket number in the branch name, for instance working on ticket #322 with
`git checkout -b PROJECT_AD8-322`.
4. Run `yarn ticket` from root directory of the repository. (If you're using a
virtual machine, run this command within the machine.) This ensures that any
new configuration from the `develop` branch is incorporated, any new composer
requirements are met, and any work from previous branches you may have done
are cleared out.
**This step will save you many headaches. Do not skip this step!**

## Coding standards

This project follows
[Drupal coding standards](https://www.drupal.org/docs/develop/standards) for
custom modules and themes. These are enforced using a git `pre-commit` hook
which is configured during `composer install` and `composer update`.

This hook will prevent commits if any coding standard violations are found. In
general, you should fix any such violations and then commit. In very rare
cases, you may bypass the pre-commit hook by using the `--no-verify` parameter
with `git commit`.

Some coding standard violations can be fixed automatically. If you have any,
look at the bottom of the output for a line like this:

```
----------------------------------------------------------------------
PHPCBF CAN FIX THE 23 MARKED SNIFF VIOLATIONS AUTOMATICALLY
----------------------------------------------------------------------
```

Run the following to automatically make those fixes:

`composer run-script code-fix`

## Publishing a pull request

When you're ready for your work on a ticket to be reviewed, do the following:

1. Make sure you've committed all the changes that are relevant to your
ticket. Did you
[export changed Drupal configuration](/backend/#importing-and-exporting-drupal-configuration)
with `drush cex`? Did you include
[composer additions or updates to modules](/backend/#mangaging-modules-with-composer)? Did you run `yarn compile` to
[generate styles](/frontend/#basic-setup)?
2. `git push` the branch to Beanstalk.
3. Visit
[Beanstalk's reviews page](https://project_a.beanstalkapp.com/dotorg/code_reviews/branches) and click on "Request a review" on the left.
4. Choose the branch you pushed from the drop-down list.
**Provide a one-sentence description of the branch** in "branch description".
Often, this can simply be the ticket name.
5. Unless otherwise instructed, check "merge to `develop` when approved".
6. Choose your reviewers and click "Request review"
7. *Optional:* If you want to enter additional information for reviewers to
read, once your PR is created you can leave a comment on the "discussion" tab.
8. *Optional:* Do a sanity check of the code that your PR is changing on the
"code" tab. Make sure the files that should be getting changed are, and that
files that are unrelated to your ticket are not being changed.

# Task-specific development information

Visit the [backend](/backend) or [frontend](/frontend) development
documentation for additional information relevant to that work.
