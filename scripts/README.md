# Scripts for a more pleasant and also faster development

These scripts support the development and testing of WordPress plugin `zitat-service` (see [../README.md](../README.md)).

The scripts are used on the Mac command line, but should also work on Linux and the Windows subsystem for Linux.

| Script | Description | Additional Info |
| --- | --- | --- |
| [scripts/install.sh](install.sh) | Inside `quote_wp_wordpress` install WP-CLI, complete the WordPress installation, install additional languages and admin users, activate the plugin | must be executed first and only once |
| [scripts/test.sh](test.sh) | Run E2E tests in Playwright container | see [../tests](../tests) |
| [scripts/pack.sh](pack.sh) | Create the plugin ZIP file |  |
| [scripts/compose.sh](compose.sh) | Delete the five Docker containers and build them new | - with optional argument `build` the WordPress container is rebuild without cache |
| [scripts/clean.sh](clean.sh) | Removes all quote_wp_* Docker containers |  |
| [scripts/deleteAllPosts.sh](deleteAllPosts.sh) | Testing creates posts, this script simple delete all posts | :warning: ALL posts are deleted |
| [scripts/i18n-init.sh](i18n-init.sh) | Create portable object template .pot file and four portable object files | :warning: the .pot and the four .po files are  overwritten! |
| [scripts/i18n-compile.sh](i18n-compile.sh) | Compile the four translated portable object files into 20 locales | |

And now you are ready for triple speed :smiley: with the creation of the five Docker containers, the installation of WordPress and the plugin and with running the E2E tests, all with only one command line.
```
host$ scripts/compose.sh && sleep 5 && scripts/install.sh && scripts/test.sh --project=chromium
```
