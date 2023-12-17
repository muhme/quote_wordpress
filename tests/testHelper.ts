/*
 * MIT License, Copyright (c) 2023 Heiko Lübbe
 * https://github.com/muhme/quote_wordpress
 * 
 * testHelper.ts - utility methods used in the tests
 */

import { Page } from 'playwright';
import { expect, Editor, Admin } from '@wordpress/e2e-test-utils-playwright';

/**
 * Showing the post in frontend and verifying:
 *   1. expect to have div.quote
 *   2. expect to have div.quotation
 *   3. expect quotation link goes to given language code
 * 
 * @param page - to be passed from WordPress utils for Playwright
 * @param postId - unique post number, as returned from createPostWithShortcode()
 * @param languageCode - two-letter language code, e.g. 'de'
 */
async function checkQuote(page: Page, postId: number | null, languageCode: string) {
    // Navigate to the page with the specified post ID
    await page.goto(`/?p=${postId}`);

    // Check for visibility of the 'div.quote' element
    const quoteDiv = page.locator('div.quote');
    await expect(quoteDiv).toBeVisible();

    // Check for visibility of the 'div.quotation' inside 'div.quote'
    const quotationDiv = page.locator('div.quote div.quotation');
    await expect(quotationDiv).toBeVisible();

    // Check for visibility of the link with language-specific URL
    const link = page.locator(`div.quotation a[href^="https://www.zitat-service.de/${languageCode}/quotations/"]`);
    await expect(link).toBeVisible();

}
export { checkQuote };

/**
 * Creates a post with [zitat_service] shortcode and parameters e.g. language="de" in backend.
 * 
 * @param editor - to be passed from WordPress utils for Playwright
 * @param admin - to be passed from WordPress utils for Playwright
 * @param title - used as post title and second time as paragraph in the blog post
 * @param attribute - keys/values object to create the shortcode attributes
 * @returns postId - unique post number or null
 */
async function createPostWithShortcode<T extends Record<string, string>>(editor: Editor, admin: Admin, title: string, attribute: T | null): Promise<number | null> {

    let attributesWithSpaces = '';
    if (attribute) {
        attributesWithSpaces = " " + Object.entries(attribute).map(([key, value]) => `${key}="${value}"`).join(" ")
    }

    await admin.createNewPost({ title: title });
    // post is created via REST, set the content in additional step to prevent encoding HTML special chars
    await editor.setContent(`
<p>${title}</p>
<!-- wp:shortcode -->
[zitat_service${attributesWithSpaces}]
<!-- /wp:shortcode -->
`);

    return editor.publishPost();;
}
export { createPostWithShortcode };

/**
 * Do admin login and store cookies if desired.
 * 
 * Implemented it myself and didn't use @wordpress/e2e-test-utils-playwright (with the ?REST login?) because I didn't get it work.
 *
 * @param page - to be passed from WordPress utils for Playwright
 * @param user - WordPress user name, e.g. 'admin'
 * @param password - users password
 * @param storage_path - Cookie storage file to reuse in Brwoser context, or null if not needed
 */
async function userLogin(page: Page, user: string, password: string, storage_path: string | null) {
    await page.goto('/wp-admin');
    await page.getByLabel('Username or Email Address').fill(user);
    await page.locator('input#user_pass').fill(password);
    await page.getByText('Log in').click();

    // '#wpadminbar' is visible on Desktop and mobile
    await expect(page.locator('div#wpadminbar')).toBeVisible();

    if (storage_path != null) {
        await page.context().storageState({ path: storage_path });
    }
}
export { userLogin };
