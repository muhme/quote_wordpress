# Scripts for a more pleasant and also faster development

These scripts support the development and testing of WordPress plugin `zitat-service` (see [../README.md](../README.md)).

The scripts are used on the Mac command line, but should also work on Linux and the Windows subsystem for Linux.

:smiley:
:smile:
:grinning:
:warning:

| Script | Description | Additional Info |
| --- | --- | --- |
| [scripts/install.sh](scripts/install.sh) | Install WordPress, install and activate the plugin | - using WP-CLI<br />- including five languages |
| [scripts/test.sh](scripts/test.sh) | Run E2E tests in Playwright container | see [../tests](../tests) |
| [scripts/pack.sh](scripts/pack.sh) | Create the plugin ZIP file |  |
| [scripts/compose.sh](scripts/compose.sh) | Delete the five Docker containers and build them new |  |
| [scripts/clean.sh](scripts/clean.sh) | Removes all quote_wp_* Docker containers |  |
| [scripts/deleteAllPosts.sh](scripts/deleteAllPosts.sh) | Testing creates posts, this script simple delete all posts | :warning: ALL posts are deleted |

And now you are ready for triple speed
:smiley:
:smile:
:grinning:
:warning:

with the creation of the five Docker containers, the installation of WordPress and the plugin and with running the E2E tests, all with only one command line:
```
host$ scripts/compose.sh && sleep 5 && scripts/install.sh && scripts/test.sh --project=chromium
```
