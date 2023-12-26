# Tests

To ensure the integrity and reliability of the WordPress plugin `zitat-service`, the `tests` subfolder contains a test suite. An overview of the plugin can be found in the [../README.md](../README.md) file in the parent directory.

## Test Environment

[Playwright](https://playwright.dev/) is used as the platform for End-to-End (E2E) testing and extended with Playwright test utils for WordPress [@wordpress/e2e-test-utils-playwright](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/). Playwright can be used local installed on host system or with docker container `quote_wp_playwright`. 

:bulb: **Tip:** Before testing, you have to complete WordPress installation and to activate the plugin with `scripts/install.sh`.

### Dockerized

You can run the E2E tests in Docker container `quote_wp_playwright` with `scripts/test.sh`, e.g. for Chromium browser:

```
host$ scripts/test.sh --project=chromium

Running 10 tests using 6 workers

  ✓   1 [login setup] › login.setup.ts:7:6 › do login (996ms)
  ✓   2 [chromium] › shortcode.spec.ts:17:7 › Shortcode › english language attribute (6.9s)
  ✓   3 [chromium] › shortcode.spec.ts:12:7 › Shortcode › german language attribute (9.8s)
  ✓   4 [chromium] › shortcode.spec.ts:22:7 › Shortcode › spanish language attribute (9.3s)
  ✓   5 [chromium] › shortcode.spec.ts:37:7 › Shortcode › language attribute not set (4.5s)
  ✓   6 [chromium] › shortcode.spec.ts:32:7 › Shortcode › ukrainian language attribute (10.7s)
  ✓   7 [chromium] › shortcode.spec.ts:27:7 › Shortcode › japanese language attribute (11.1s)
  ✓   8 [chromium] › shortcode.spec.ts:42:7 › Shortcode › language attribute not supported (7.2s)
  ✓   9 [chromium] › shortcode.spec.ts:47:7 › Shortcode › cheesecake attribute (6.2s)
  ✓  10 [chromium] › shortcode.spec.ts:52:7 › Shortcode › several nonsense attributes (4.7s)

  10 passed (17.2s)
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
