/**
 * tests/testHelper.ts - utility methods used in the tests
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress
 *
 */

import { Page, Locator } from 'playwright';
import { expect, Editor, Admin } from '@wordpress/e2e-test-utils-playwright';

/**
 * Showing the post in frontend and verifying:
 *   1. expect to have div.quote
 *   2. expect to have div.quotation
 *   3. expect quotation link goes to given language code
 *
 * optional parameters are only checked if they are given (not null)
 *
 * @param page          - to be passed from WordPress utils for Playwright
 * @param postId        - unique post number, as returned from createPostWithPlugin()
 * @param languageCode  - two-letter language code, e.g. 'de' or defaults to null for all languages
 * @param quotation     - the quote or null, defaults to null
 * @param quotationLink - the zitat-service.de-link or null, defaults to null
 * @param source        - quotation source or null, defaults to null
 * @param sourceLink    - quotation source link or null, defaults to null
 * @param author        - auhors name or null, defaults to null
 * @param authorLink    - authors link or null, defaults to null
 */
async function checkQuote(
	page: Page,
	postId: number | null,
	languageCode: string | null = null,
	quotation: string | null = null,
	quotationLink: string | null = null,
	source: string | null = null,
	sourceLink: string | null = null,
	author: string | null = null,
	authorLink: string | null = null
) {
	// Navigate to the page with the specified post ID
	await page.goto( `/?p=${ postId }` );

	// Check for visibility of the 'div.quote' element
	const quoteDiv = page.locator( 'div.quote' );
	await expect( quoteDiv ).toBeVisible();

	// Check for visibility of the 'div.quotation' inside 'div.quote'
	const quotationDiv = page.locator( 'div.quote div.quotation' );
	await expect( quotationDiv ).toBeVisible();

	// Check for visibility of the zitat-service.de-link with language-specific URL
	let linkLocator: Locator;
	if (
		languageCode === null ||
		languageCode === 'all' ||
		languageCode === 'frontend'
	) {
		// if no language is given, then check beginning and it contains '/quotations/'
		linkLocator = page.locator(
			`div.quotation a[href^="https://www.zitat-service.de/"][href*="/quotations/"]`
		);
	} else {
		linkLocator = page.locator(
			`div.quotation a[href^="https://www.zitat-service.de/${ languageCode }/quotations/"]`
		);
	}
	await expect( linkLocator ).toBeVisible();

	/*
	 * tests the optional arguments with exactly comparing the results
	 */
	if ( quotation ) {
		const found = await page.textContent( 'div.quote div.quotation a' );
		expect( found ).toBe( quotation );
	}
	if ( quotationLink ) {
		const found = await page.getAttribute(
			'div.quote div.quotation a',
			'href'
		);
		expect( found ).toBe( quotationLink );
	}
	if ( source ) {
		const found = await page.textContent( 'div.quote div.source' );
		expect( found ).toBe( source );
	}
	if ( author ) {
		const found = await page.textContent( 'div.quote div.source' );
		expect( found ).toContain( author );
	}
	if ( sourceLink || authorLink ) {
		// .source can have two links, if source is existing it is always the first;
		// authorLink is the second, if sourceLink exists, else the first
		const sourceLinks = await page.$$eval(
			'div.quote div.source a',
			( links ) =>
				links.map( ( link ) => ( link as HTMLAnchorElement ).href )
		);
		if ( sourceLink ) {
			const found = sourceLinks[ 0 ];
			// some sourceLink's are URL encoded
			expect( decodeURIComponent( found ) ).toBe( sourceLink );
		}
		if ( authorLink ) {
			const found = sourceLinks[ sourceLink ? 1 : 0 ];
			// some authorLink's are URL encoded
			expect( decodeURIComponent( found ) ).toBe( authorLink );
		}
	}
}
export { checkQuote };

/**
 * Showing the post in frontend and verifying error message
 *
 * @param page   - to be passed from WordPress utils for Playwright
 * @param postId - unique post number, as returned from createPostWithPlugin()
 */
async function checkNoQuoteFound( page: Page, postId: number | null ) {
	// Navigate to the page with the specified post ID
	await page.goto( `/?p=${ postId }` );

	// Check for visibility of the plugin
	const quoteDiv = page.locator(
		'.wp-block-random-quote-zitat-service-random-quote'
	);
	await expect( quoteDiv ).toHaveCount( 1 );

	await expect( quoteDiv ).toContainText( 'Error 404' );
	await expect( quoteDiv ).toContainText(
		'No quote found for given parameter'
	);
}
export { checkNoQuoteFound };

/**
 * Creates a post with [zitat_service] block widget plugin and given parameters e.g. language="de" in backend.
 *
 * Does it simplified as with code editor (not selecting values in the GUI).
 *
 * @param editor     - active editor on the page, to be passed from WordPress utils for Playwright
 * @param admin      - to be passed from WordPress utils for Playwright
 * @param title      - used as post title and second time as paragraph in the blog post
 * @param attributes - keys/values object to create the plugin attributes
 * @return postId - unique post number or null
 */
async function createPostWithPlugin<
	T extends Record< string, string | number >,
>(
	editor: Editor,
	admin: Admin,
	title: string,
	attributes: T | null
): Promise< number | null > {
	let attributesStringified = '';
	if (
		attributes &&
		attributes !== undefined &&
		attributes !== null &&
		Object.keys( attributes ).length > 0
	) {
		attributesStringified = JSON.stringify( attributes );
	}

	await admin.createNewPost( { title } );
	// post is created via REST, set the content in additional step to prevent encoding HTML special chars
	await editor.setContent( `
<p>${ title }</p>
<!-- wp:random-quote-zitat-service/random-quote ${ attributesStringified } -->
<div class="zitat-service-quote"> ...</div>
<!-- /wp:random-quote-zitat-service/random-quote -->
` );

	return editor.publishPost();
}
export { createPostWithPlugin };

/**
 * Do admin login and store cookies if desired.
 *
 * Implemented it myself and didn't use @wordpress/e2e-test-utils-playwright (with the ?REST login?) because I didn't get it work.
 *
 * @param page        - to be passed from WordPress utils for Playwright
 * @param user        - WordPress user name, e.g. 'admin'
 * @param password    - users password
 * @param storagePath - Cookie storage file to reuse in Brwoser context, or null if not needed
 */
async function userLogin(
	page: Page,
	user: string,
	password: string,
	storagePath: string | null
) {
	await page.goto( '/wp-admin' );
	await page.getByLabel( 'Username or Email Address' ).fill( user );

	// sometimes it fails, so wait until the element is finished
	// await page.locator( 'input#user_pass' ).fill( password );
	const passwordInput = page.locator( 'input#user_pass' );
	await passwordInput.waitFor( { state: 'visible' } );
	await passwordInput.fill( password );

	// Changed with WordPress 6.7 from 'Log in' to 'Log In'
	await page.getByRole('button', { name: /log in/i }).click();

	// '#wpadminbar' is visible on Desktop and mobile
	await expect( page.locator( 'div#wpadminbar' ) ).toBeVisible();

	if ( storagePath !== null ) {
		await page.context().storageState( { path: storagePath } );
	}
}
export { userLogin };
