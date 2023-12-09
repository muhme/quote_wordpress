# Scripts for a more pleasant and also faster development

These scripts support the development and testing of WordPress plugin `zitat-service` (see [../README.md](../README.md)).

The scripts are used on the Mac command line, but should also work on Linux and the Windows subsystem for Linux.

| Script | Description | Additional Info |
| --- | --- | --- |
| [scripts/compose.sh](scripts/compose.sh) | Delete the five Docker containers and build them new |  |
| [scripts/install.sh](scripts/install.sh) | Install WordPress, install and activate the plugin | - using WP-CLI<br />- including five languages |
| [scripts/clean.sh](scripts/clean.sh) | Removes all quote_wp_* Docker containers |  |
| [scripts/pack.sh](scripts/pack.sh) | Create the plugin ZIP file |  |

And now you are ready for ... double speed :smiley: with the creation of five Docker containers, the installation of WordPress and the plugin with only one command line:
```
$ scripts/compose.sh && sleep 5 && scripts/install.sh
```

> [!NOTICE]
> At the moment there are no other tests available than the installation of WordPress and the plugin, to be continued ...
