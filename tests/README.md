# Tests

This `tests` subfolder contains an automated installation and configuration for WordPress and the `zitat-service` plugin. This is the base for the tests to be implemented to ensure the integrity and reliability of the plugin functionality. 

For an overview of the plugin please refer to the main [../README.md](../README.md) file located in the parent directory.

## Test Environment

[Playwright](https://playwright.dev/) is used as the platform for End-to-End (E2E) testing and extended with Playwright test utils for WordPress @wordpress/e2e-test-utils-playwright.

host$ npm install playwright --save-dev # TODO im docker container testen
host$ npm install @wordpress/e2e-test-utils-playwright --save-dev
host$ npx playwright test 

Different options can used like `--ui` for interactive UI mode, see [Playwright command line otions](https://playwright.dev/docs/test-cli)











It can be used either headless with Docker container `quote_wp_playwright` or from local host installation with GUI. Some scripts are used for a more pleasant working, see folder [../scripts](../scripts/) and commented list of scripts there.

:warning: You have to remember for each new created docker container you can run installation only once.

To install with Cypress headless mode:
```
host$ scripts/install.sh

  (Run Starting)

  ┌──────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.3.0                                                               │
  │ Browser:        Electron 114 (headless)                                              │
  │ Node Version:   v20.6.1 (/usr/local/bin/node)                                        │
  │ Specs:          1 found (install.cy.js)                                              │
  │ Searched:       cypress/e2e/install.cy.j                                             │
  └──────────────────────────────────────────────────────────────────────────────────────┘
                                                                                                    
  Running:  install.cy.js                                                         (1 of 1)

  Install WordPress and plugin zitat-service
    ✓ Install WordPress (6896ms)
    ✓ Login, install and activate plugin (5378ms)

  (Run Finished)
```

#### Interactive on Local Host

To install with local installed [Cypress](https://www.cypress.io/) in GUI mode:
```
host$ scripts/cypress.sh
```

In Cypress, you use E2E Testing, launch your favorite browser and with the `install.cy.js` script you have automatic WordPress and plugin installation. This can run once after the Docker containers are created. Enjoy watching :smile:
