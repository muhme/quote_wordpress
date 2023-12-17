/*
 * MIT License, Copyright (c) 2023 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 * login.setup.ts - do WordPress admin login and store cookies
 * 
 * expects the Website amd admin user are configured to use "English (United States)" as language
 */

import { test as setup } from '@playwright/test';
import { ADMIN_USER, ADMIN_PASSWORD, STORAGE_STATE } from '../playwright.config';
import { userLogin } from './testHelper';

/**
 * do login by own (not with @wordpress/e2e-test-utils-playwright) and save cookies
 */
setup('do login', async ({ page }) => {

    await userLogin(page, ADMIN_USER, ADMIN_PASSWORD, STORAGE_STATE);

});
