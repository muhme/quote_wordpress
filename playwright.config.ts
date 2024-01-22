/**
 * MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 * playwright.config.ts - Playwright configuration for E2E tests
 * @see ./tests
 */

import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

// admin login and cookie storage
export const STORAGE_STATE = process.env.WP_ADMIN_AUTH_STORAGE ?? path.join(__dirname, '.playwright_auth.json');
export const ADMIN_USER = process.env.WP_ADMIN_USERNAME ?? 'admin';
export const ADMIN_PASSWORD = process.env.WP_ADMIN_PASSWORD ?? 'admin';
// WordPress base URL
export const BASE_URL = process.env.WP_BASE_URL ?? 'http://host.docker.internal:4080';

// see https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: 'tests',
  // run tests in files in parallel
  fullyParallel: true,
  // fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  // retry on CI only
  retries: process.env.CI ? 2 : 0,
  // opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  // reporter to use, see https://playwright.dev/docs/test-reporters
  reporter: [['html', { open: 'never' }], ['list']],
  // shared settings, see https://playwright.dev/docs/api/class-testoptions.
  use: {
    // use relative paths in tests, see
    // https://playwright.dev/docs/test-webserver#adding-a-baseurl
    baseURL: BASE_URL,
    // save as much information as possible to make debugging easier, see
    // https://playwright.dev/docs/api/class-testoptions
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // using project dependencies to have global login setup,
    // see https://playwright.dev/docs/test-global-setup-teardown
    {
      name: 'login-setup',
      testMatch: 'tests/login.setup.ts'
    },
    // major browser tests, starting without login
    {
      name: 'chromium-logged-out',
      testMatch: 'tests/*.logged.out.spec.ts',
      use: {
        ...devices['Desktop Chrome']
      },
    },
    {
      name: 'firefox-logged-out',
      testMatch: 'tests/*.logged.out.spec.ts',
      use: {
        ...devices['Desktop Firefox']
      },
    },
    {
      name: 'webkit-logged-out',
      testMatch: 'tests/*.logged.out.spec.ts',
      use: {
        ...devices['Desktop Safari']
      },
    },
    // tests against mobile viewports
    {
      name: 'mobile-chrome-logged-out',
      testMatch: 'tests/*.logged.out.spec.ts',
      use: {
        ...devices['Pixel 5']
      },
    },
    {
      name: 'mobile-safari-logged-out',
      testMatch: 'tests/*.logged.out.spec.ts',
      use: {
        ...devices['iPhone 12']
      },
    },
    // major browsers tests, logged in
    {
      name: 'chromium-logged-in',
      testMatch: 'tests/*.logged.in.spec.ts',
      dependencies: ['login-setup'],
      use: {
        storageState: STORAGE_STATE,
        ...devices['Desktop Chrome']
      },
    },
    {
      name: 'firefox-logged-in',
      testMatch: 'tests/*.logged.in.spec.ts',
      dependencies: ['login-setup'],
      use: {
        storageState: STORAGE_STATE,
        ...devices['Desktop Firefox']
      },
    },
    {
      name: 'webkit-logged-in',
      testMatch: 'tests/*.logged.in.spec.ts',
      dependencies: ['login-setup'],
      use: {
        storageState: STORAGE_STATE,
        ...devices['Desktop Safari']
      },
    },
    // test against mobile viewports
    {
      name: 'mobile-chrome-logged-in',
      testMatch: 'tests/*.logged.in.spec.ts',
      dependencies: ['login-setup'],
      use: {
        storageState: STORAGE_STATE,
        ...devices['Pixel 5']
      },
    },
    {
      name: 'mobile-safari-logged-in',
      testMatch: 'tests/*.logged.in.spec.ts',
      dependencies: ['login-setup'],
      use: {
        storageState: STORAGE_STATE,
        ...devices['iPhone 12']
      },
    },

    // test against branded browsers - only local installed, not available in quote_wp_playwright
    // {
    //   name: 'Microsoft Edge',
    //   testMatch: 'tests/*.logged.in.spec.ts',
    //   dependencies: ['login setup'],
    //   use: { 
    //     storageState: STORAGE_STATE,
    //     ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   testMatch: 'tests/*.logged.in.spec.ts',
    //   dependencies: ['login setup'],
    //   use: { 
    //     storageState: STORAGE_STATE,
    //     ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
