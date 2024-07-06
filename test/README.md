# Tests

To ensure the integrity and reliability of the WordPress plugin `Random Quote from Zitat-Service`, the `test` subfolder contains a test suite. An overview of the plugin can be found in the [../README.md](../README.md) file in the parent directory.

## Test Environment

[Playwright](https://playwright.dev/) is used as the platform for End-to-End (E2E) testing and extended with Playwright test utils for WordPress [@wordpress/e2e-test-utils-playwright](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/). Playwright can be used local installed on host system or with docker container `quote_wp_playwright`. 

Testing is performed against two WordPress Docker containers. The latest version of WordPress is installed in the docker container `quote_wp_wordpress` and the minimum required WordPress version is installed in the docker container `quote_wp_min`. The scripts for the installation and the test can be parameterised with a container name as the first argument. If no container name is specified, the installation or test is performed twice, once for each of the containers.

:bulb: **Tip:** Before testing, you have to complete WordPress installation and to activate the plugin with `scripts/install.sh`.

Playwright tests are grouped into `*-logged-out` and `*-logged-in`. The reason for this is that five different admin users with different locales are used for the backend tests with I18N. These tests are started logged out and themselves make a login with an administrative user in the locale to be tested.

The frontend tests create posts with the desired plugin parameters in the backend and then check the expected result in the frontend. To create posts, they have to first be logged in once as a WordPress admin user with `login-setup`.

One more grouping are the different browsers. Actual we can test with five different browsers: chromium, firefox, webkit, mobile-chrome and mobile-safari.

You can run all the actual 2 x 121 tests with:
```
scripts/test.sh
```

### Dockerized

You can run the E2E tests in Docker container `quote_wp_playwright` with `scripts/test.sh`.

<details>
  <summary>Sample for Chromium browser and the actual WordPress version:</summary>

```
scripts/test.sh quote_wp_wordpress --project=chromium-logged-out --project=chromium-logged-in
```
```
*** Testing: WP_BASE_URL=http://host.docker.internal:4080 npx playwright test --project=chromium-logged-out --project=chromium-logged-in
Running 25 tests using 6 workers
  ✓  1 [chromium-logged-out] › plugin.logged.out.spec.ts:22:7 › Backend – Plugin descriptions › en - English language (4.6s)
  ✓  2 [chromium-logged-out] › plugin.logged.out.spec.ts:29:7 › Backend – Plugin descriptions › de - German language (5.9s)
  ✓  3 [chromium-logged-out] › plugin.logged.out.spec.ts:36:7 › Backend – Plugin descriptions › es - Spanish language (5.9s)
  ✓  4 [chromium-logged-out] › plugin.logged.out.spec.ts:51:7 › Backend – Plugin descriptions › uk - Ukrainian language (3.1s)
  ✓  5 [chromium-logged-out] › plugin.logged.out.spec.ts:43:7 › Backend – Plugin descriptions › ja - Japanese language (5.9s)
  ✓  6 [login-setup] › login.setup.ts:17:6 › do login (4.2s)
  ✓  7 [chromium-logged-in] › plugin.logged.in.spec.ts:74:11 › Frontend – Widget › Language 'es' (5.9s)
  ✓  8 [chromium-logged-in] › plugin.logged.in.spec.ts:74:11 › Frontend – Widget › Language 'de' (7.0s)
  ✓  9 [chromium-logged-in] › plugin.logged.in.spec.ts:79:11 › Frontend – Widget › Language 'de', user 'heikoAdmin' (7.3s)
  ✓  10 [chromium-logged-in] › plugin.logged.in.spec.ts:79:11 › Frontend – Widget › Language 'en', user 'heikoAdmin' (6.9s)
  ✓  11 [chromium-logged-in] › plugin.logged.in.spec.ts:79:11 › Frontend – Widget › Language 'es', user 'heikoAdmin' (10.6s)
  ✓  12 [chromium-logged-in] › plugin.logged.in.spec.ts:74:11 › Frontend – Widget › Language 'en' (9.1s)
  ✓  13 [chromium-logged-in] › plugin.logged.in.spec.ts:74:11 › Frontend – Widget › Language 'ja' (6.8s)
  ✓  14 [chromium-logged-in] › plugin.logged.in.spec.ts:79:11 › Frontend – Widget › Language 'ja', user 'heikoAdmin' (7.0s)
  ✓  15 [chromium-logged-in] › plugin.logged.in.spec.ts:74:11 › Frontend – Widget › Language 'uk' (7.5s)
  ✓  16 [chromium-logged-in] › plugin.logged.in.spec.ts:79:11 › Frontend – Widget › Language 'uk', user 'heikoAdmin' (7.7s)
  ✓  17 [chromium-logged-in] › plugin.logged.in.spec.ts:86:7 › Frontend – Widget › Language not set (7.1s)
  ✓  18 [chromium-logged-in] › plugin.logged.in.spec.ts:91:7 › Frontend – Widget › Language 'all' (7.7s)
  ✓  19 [chromium-logged-in] › plugin.logged.in.spec.ts:96:7 › Frontend – Widget › Language 'frontend' (7.1s)
  ✓  20 [chromium-logged-in] › plugin.logged.in.spec.ts:101:7 › Frontend – Widget › Language 'fr' (not supported) (7.3s)
  ✓  21 [chromium-logged-in] › plugin.logged.in.spec.ts:106:7 › Frontend – Widget › Cheesecake attribute (7.4s)
  ✓  22 [chromium-logged-in] › plugin.logged.in.spec.ts:111:7 › Frontend – Widget › Several nonsense attributes (7.1s)
  ✓  23 [chromium-logged-in] › plugin.logged.in.spec.ts:116:7 › Frontend – Widget › 404 (no quote found) (6.6s)
  ✓  24 [chromium-logged-in] › plugin.logged.in.spec.ts:122:7 › Frontend – Widget › Language 'de', Category 'Ameise' (5.7s)
  ✓  25 [chromium-logged-in] › plugin.logged.in.spec.ts:128:7 › Frontend – Widget › Language 'uk', Author 'Шевченко', category 'Писання' (5.2s)
  25 passed (34.0s)
```
</details>

As the docker container volume is mapped, you can open the HTML report from file `playwright-report/index.html` in your preferred browser.

:bulb: **Tip:** To have WordPress working with HTTP and from localhost and inside Docker container, plus access WordPress from Playwrigth container the little trick is to use the URL `http://host.docker.internal:4080`. The hostname `host.docker.internal` is identical inside docker container and on host machine, if you make the following `/etc/hosts` entry:
```bash
127.0.0.1	host.docker.internal
```

You can run a single test, e.g. to check again after a failed test. Two examples: 
```
scripts/test.sh quote_wp_min --project=chromium-logged-in -g \'Language not set\'
```
```
scripts/test.sh quote_wp_wordpress --project=mobile-chrome-logged-out -g \'ja - Japanese language\'
```

You can also use patterns, e.g. to perform subsets of tests:
```
scripts/test.sh quote_wp_wordpress --project=webkit-logged-in -g 'Frontend – Widget › Language *'
```

### Local Host Installation

It is possible to run the E2E tests on your Docker host machine if you install Playwright locally:

```bash
npm install playwright --save-dev
npm install @wordpress/e2e-test-utils-playwright --save-dev
npx playwright install
npx playwright install-deps
npx playwright test 
```

Various options can used, such as `--ui` for interactive UI mode, see [Playwright command line otions](https://playwright.dev/docs/test-cli).

### Trouble-Shooting

The standard for the parallelization of Playwright is 6 workers. If this is too much load for your host, you can reduce the number of workers with the `--workers` option, for example:

```bash
scripts/test.sh --workers=2
```
