# Scripts for a more pleasant and also faster development

These scripts support the development and testing of WordPress plugin `Random Quote from Zitat-Service` (see [../README.md](../README.md)).

The scripts are used on the Mac command line or in the container, but should also work on Linux and the Windows subsystem for Linux.

| Script | Description | Additional Info |
| --- | --- | --- |
| [scripts/install.sh](install.sh) | Inside WordPress containers install WP-CLI, complete the WordPress installation, install additional languages and admin users and activate the plugin. | - first argument is the container name `quote_wp_wordpress` or `quote_wp_min`, otherwise it will be installed in both containers<br />- must be executed first and only once |
| [scripts/test.sh](test.sh) | Run E2E tests in Playwright container. | - first argument is the container name `quote_wp_wordpress` or `quote_wp_min`, otherwise it will be tested in both containers<br />- see [../test](../test) |
| [scripts/pack.sh](pack.sh) | Create the plugin ZIP file. |  |
| [scripts/compose.sh](compose.sh) | Delete the five Docker containers and build them new. | - with optional argument `build` the WordPress containers are rebuild without cache |
| [scripts/clean.sh](clean.sh) | Removes all quote_wp_* Docker containers. |  |
| [scripts/deleteAllPosts.sh](deleteAllPosts.sh) | Testing creates posts, this script simply deletes all posts. | - :warning: ALL posts are deleted<br />- first argument is the container name `quote_wp_wordpress` or `quote_wp_min`, otherwise posts will be deleted in both containers |
| [scripts/i18n-init.sh](i18n-init.sh) | Create the portable object template .pot file and four portable object files. | - :warning: the .pot and the four .po files are  overwritten<br>- see [../languages](../languages) |
| [scripts/i18n-create.sh](i18n-create.sh) | Create 20 .mo and 20 .json files from the 4 .po files. | - intended to be run in quote_wp_wordpress container, see [../languages](../languages) |

And now you are ready to quintuple the speed :smiley: Create the six Docker containers, install WordPress and the plugin twice and running the E2E tests twice. All with just one command line:
```
host$ scripts/compose.sh && scripts/install.sh && scripts/test.sh
```
