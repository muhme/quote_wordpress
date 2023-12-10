/*
 * MIT License, Copyright (c) 2023 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 * login.setup.ts - do WordPress admin login and store cookies
 */

import { test as setup, expect } from '@playwright/test';
import { ADMIN_USER, ADMIN_PASSWORD, STORAGE_STATE } from '../playwright.config';

/**
 * do login by own (not with @wordpress/e2e-test-utils-playwright) and save cookies
 */
setup('do login', async ({ page }) => {

    await page.goto('/wp-admin');
    await page.getByLabel('Username or Email Address').fill(ADMIN_USER);
    await page.locator('input#user_pass').fill(ADMIN_PASSWORD);
    await page.getByText('Log in').click();

    // wait until welcome
    await expect(page.getByText('Howdy, admin')).toBeVisible();

    await page.context().storageState({ path: STORAGE_STATE });

});
