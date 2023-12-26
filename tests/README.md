# Tests

To ensure the integrity and reliability of the WordPress plugin `zitat-service`, the `tests` subfolder contains a test suite. An overview of the plugin can be found in the [../README.md](../README.md) file in the parent directory.

## Test Environment

[Playwright](https://playwright.dev/) is used as the platform for End-to-End (E2E) testing and extended with Playwright test utils for WordPress [@wordpress/e2e-test-utils-playwright](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/). Playwright can be used local installed on host system or with docker container `quote_wp_playwright`. 

:bulb: **Tip:** Before testing, you have to complete WordPress installation and to activate the plugin with `scripts/install.sh`.

Playwright tests are grouped into `*-logged out` and `*-logged in`. The reason for this is that five different admin users with different locales are used for the backend tests with I18N. These tests are started logged out and themselves make a login with an administrative user in the locale to be tested.

The frontend tests change the plugin parameters in the backend and then check the expected result in the frontend. To change the plugin parameters, they have to first be logged in once as a WordPress admin user.

One more grouping are the different browsers. However you can simple run the actual 71 tests with:
```
host$ scripts/test.sh
```

### Dockerized

You can run the E2E tests in Docker container `quote_wp_playwright` with `scripts/test.sh`, e.g. for Chromium browser:

```
host$ scripts/test.sh --project=chromium-logged-out --project=chromium-logged-in

Running 15 tests using 6 workers

  ✓  1 [chromium-logged-out] › plugin.logged.out.spec.ts:39:7 › Backend – Plugin descriptions › ja - Japanese language (3.2s)
  ✓  2 [chromium-logged-out] › plugin.logged.out.spec.ts:25:7 › Backend – Plugin descriptions › de - German language (4.4s)
  ✓  3 [chromium-logged-out] › plugin.logged.out.spec.ts:18:7 › Backend – Plugin descriptions › en - English language (4.5s)
  ✓  4 [chromium-logged-out] › plugin.logged.out.spec.ts:32:7 › Backend – Plugin descriptions › es - Spanish language (2.1s)
  ✓  5 [chromium-logged-out] › plugin.logged.out.spec.ts:46:7 › Backend – Plugin descriptions › uk - Ukrainian language (3.6s)
  ✓  6 [login-setup] › login.setup.ts:17:6 › do login (1.2s)
  ✓  7 [chromium-logged-in] › shortcode.logged.in.spec.ts:41:7 › Frontend – Shortcode › language attribute not set (5.0s)
  ✓  8 [chromium-logged-in] › shortcode.logged.in.spec.ts:16:7 › Frontend – Shortcode › german language attribute (10.0s)
  ...
```

As the docker container volume is mapped, you can open the HTML report from file `playwright-report/index.html` in your preferred browser.

:bulb: **Tip:** To have WordPress working with HTTP and from localhost and inside Docker container, plus access WordPress from Playwrigth container the little trick is to use the URL `http://host.docker.internal:4080`. The hostname `host.docker.internal` is identical inside docker container and on host machine, if you make the following `/etc/hosts` entry:
```bash
127.0.0.1	host.docker.internal
```

### Local Host Installation

It is possible to run the E2E tests on your host machine if you install Playwright locally:

```bash
host$ npm install playwright --save-dev
host$ npm install @wordpress/e2e-test-utils-playwright --save-dev
host$ npx playwright install
host$ npx playwright install-deps
host$ npx playwright test 
```

Various options can used, such as `--ui` for interactive UI mode, see [Playwright command line otions](https://playwright.dev/docs/test-cli).
