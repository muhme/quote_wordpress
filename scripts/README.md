# Scripts for a more pleasant and also faster development

These scripts support the development and testing of WordPress plugin `zitat-service` (see [../README.md](../README.md)).

The scripts are used on the Mac command line, but should also work on Linux and the Windows subsystem for Linux.

| Script | Description | Additional Info |
| --- | --- | --- |
| `scripts/compose.sh` | Delete the five Docker containers and build them new |  |
| `scripts/cypress.sh` | Open Cypress in GUI mode on local host for testing | Needs Cypress installed on host. |
| `scripts/install.sh` | Install WordPress, install and activate the plugin | - Using Cypress in headless mode<br>- With environment variable `CYPRESS_OPTIONS`, e.g., `CYPRESS_OPTIONS="video=true" scripts/install.sh` |
| `scripts/test.sh` | Module end-to-end test | - Using Cypress in headless mode<br>- With environment variable `CYPRESS_OPTIONS`, e.g., `CYPRESS_OPTIONS="video=true" scripts/test.sh 5` |
| `scripts/clean.sh` | Removes all quote_joomla_* Docker containers |  |

And now you are ready for ... double speed :smiley: with the creation of five Docker containers, the installation of WordPress and the plugin with only one command line:
```
$ scripts/compose.sh && sleep 5 && scripts/install.sh && scripts/test.sh
```

> [!NOTICE]
> At the moment there are no other tests available than the installation of WordPress and the plugin, to be continued ...
