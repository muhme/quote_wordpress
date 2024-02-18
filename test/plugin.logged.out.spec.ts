/**
 * tests/plugin.logged.out.spec.ts - backend E2E tests plugin description, without login
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress-plugin Zitat-Service Random Quote, see https://github.com/muhme/quote_wordpress
 *
 */

import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import { userLogin } from './testHelper';
import { ADMIN_USER, ADMIN_PASSWORD } from '../playwright.config';

/*
 * I18N Test of the five different languages in the backend, with five admins, each with their own language settings
 *
 * simplified there is only one locale tested for the translated language, e.g. only de_DE for German and not e.g. de_AT
 * needs the admins created with scripts/install.sh
 * data-slug is the translated plugin name and this is checked together with the plugin description
 */
test.describe( 'Backend – Plugin description', () => {
	test( 'en - English language', async ( { page } ) => {
		await userLogin( page, ADMIN_USER, ADMIN_PASSWORD, null );
		await page.goto( '/wp-admin/plugins.php' );
		const desc =
			( await page.textContent(
				'tr[data-slug="zitat-service-random-quote"] .plugin-description p'
			) ) ?? '';
		expect( desc.startsWith( 'Displays a random quote' ) ).toBeTruthy();
	} );

	test( 'de - German language', async ( { page } ) => {
		await userLogin( page, ADMIN_USER + '_de', ADMIN_PASSWORD, null );
		await page.goto( '/wp-admin/plugins.php' );
		const desc =
			( await page.textContent(
				'tr[data-slug="zitat-service-random-quote"] .plugin-description p'
			) ) ?? '';
		expect( desc.startsWith( 'Zeigt ein zufälliges Zitat' ) ).toBeTruthy();
	} );

	test( 'es - Spanish language', async ( { page } ) => {
		await userLogin( page, ADMIN_USER + '_es', ADMIN_PASSWORD, null );
		await page.goto( '/wp-admin/plugins.php' );
		const desc =
			( await page.textContent(
				'tr[data-slug="zitat-service-random-quote"] .plugin-description p'
			) ) ?? '';
		expect( desc.startsWith( 'Muestra una cita aleatoria' ) ).toBeTruthy();
	} );

	test( 'ja - Japanese language', async ( { page } ) => {
		await userLogin( page, ADMIN_USER + '_ja', ADMIN_PASSWORD, null );
		await page.goto( '/wp-admin/plugins.php' );
		// zitat-service-ランダム引用
		const desc =
			( await page.textContent(
				'tr[data-slug="zitat-service-random-quote"] .plugin-description p'
			) ) ?? '';
		expect( desc.startsWith( 'ドイツ語' ) ).toBeTruthy();
	} );

	test( 'uk - Ukrainian language', async ( { page } ) => {
		await userLogin( page, ADMIN_USER + '_uk', ADMIN_PASSWORD, null );
		await page.goto( '/wp-admin/plugins.php' );
		// zitat-service-випадковий-цитат
		const desc =
			( await page.textContent(
				'tr[data-slug="zitat-service-random-quote"] .plugin-description p'
			) ) ?? '';
		expect( desc.startsWith( 'Показує випадковий цитат' ) ).toBeTruthy();
	} );
} );
