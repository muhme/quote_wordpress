/**
 * tests/plugin.logged.in.spec.ts - frontend E2E tests using the plugin
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress-plugin Zitat-Service Random Quote, see https://github.com/muhme/quote_wordpress
 *
 */
import { test } from '@wordpress/e2e-test-utils-playwright';
import {
	checkQuote,
	checkNoQuoteFound,
	createPostWithPlugin,
} from './testHelper';

// zitat-service user 'heikoAdmin' (id 1) has exactly one quote in each language
interface TestData {
	quotation: string;
	quotationLink: string;
	source: string;
	sourceLink?: string;
	author?: string;
	authorLink?: string;
}
interface LanguageTestData {
	[ key: string ]: TestData;
}
const heikoAdminTestData: LanguageTestData = {
	de: {
		quotation: 'der zankapfel schmeckt bitter',
		quotationLink: 'https://www.zitat-service.de/de/quotations/1871',
		source: 'Mastodon Tröt, 2023, SprachFleisch',
		sourceLink: 'https://troet.cafe/@BauernHauer/109633116386811032',
		author: 'SprachFleisch',
		authorLink: 'https://troet.cafe/@BauernHauer',
	},
	en: {
		quotation: 'Hardware eventually fails. Software eventually works.',
		quotationLink: 'https://www.zitat-service.de/en/quotations/1872',
		source: 'Michael Hartung',
		// no authorLink in en
	},
	es: {
		quotation:
			'No se ve bien sino con el corazón. Lo esencial es invisible a los ojos.',
		quotationLink: 'https://www.zitat-service.de/es/quotations/1919',
		source: 'El principito, 1943, Antoine de Saint-Exupéry',
		sourceLink: 'https://es.wikipedia.org/wiki/Antoine_de_Saint-Exupéry',
		author: 'Antoine de Saint-Exupéry',
		// no authorLink in es
	},
	ja: {
		quotation: '七転び八起き',
		quotationLink: 'https://www.zitat-service.de/ja/quotations/1913',
		source: '日本の慣用句',
		// no sourceLink and no authorLink in ja
	},
	uk: {
		quotation: 'Лучше любить і робить, аніж писать і го­ворить.',
		quotationLink: 'https://www.zitat-service.de/uk/quotations/1917',
		source: 'Лист до Я. В. Тарновському, 1860, Тарас Григорович Шевченко',
		author: 'Тарас Григорович Шевченко',
		authorLink: 'https://uk.wikipedia.org/wiki/Шевченко_Тарас_Григорович',
		// no sourceLink in uk
	},
};

/*
 * Test block widget in posts with different `language` attributes.
 * Needs to be logged-in as WordPress admin before.
 */
test.describe( 'Frontend – Widget', () => {
	Object.entries( heikoAdminTestData ).forEach(
		( [
			lang,
			{
				quotation,
				quotationLink,
				source,
				sourceLink,
				author,
				authorLink,
			},
		] ) => {
			test(
				"Language '" + lang + "'",
				async ( { editor, page, admin } ) => {
					const postId = await createPostWithPlugin(
						editor,
						admin,
						'Language ' + lang,
						{ userId: 1, language: lang }
					);
					await checkQuote( page, postId, lang );
				}
			);
			// choose zitat-service user 'heikoAdmin' (id 1) as this one has exactly one quote in each language
			test(
				"Language '" + lang + "', user 'heikoAdmin'",
				async ( { editor, page, admin } ) => {
					const postId = await createPostWithPlugin(
						editor,
						admin,
						"User 'heikoAdmin' and language " + lang,
						{ userId: 1, language: lang }
					);
					await checkQuote(
						page,
						postId,
						lang,
						quotation,
						quotationLink,
						source,
						sourceLink,
						author,
						authorLink
					);
				}
			);
		}
	);

	test( 'Language not set', async ( { editor, page, admin } ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			'Language not set',
			null
		);
		await checkQuote( page, postId );
	} );

	test( "Language 'all'", async ( { editor, page, admin } ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			"Language 'all'",
			{ language: 'all' }
		);
		await checkQuote( page, postId );
	} );

	test( "Language 'frontend'", async ( { editor, page, admin } ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			"Language 'frontend'",
			{ language: 'frontend' }
		);
		await checkQuote( page, postId );
	} );

	test( "Language 'fr' (not supported)", async ( {
		editor,
		page,
		admin,
	} ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			'Language Français',
			{ language: 'fr' }
		);
		await checkQuote( page, postId, 'en' );
	} );

	test( 'Cheesecake attribute', async ( { editor, page, admin } ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			'Cheesecake attribute',
			{ cheesecake: 'delicious' }
		);
		await checkQuote( page, postId, null );
	} );

	test( 'Several nonsense attributes', async ( { editor, page, admin } ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			'Several nonsense attributes',
			{ one: 1, two: 2, three: 3 }
		);
		await checkQuote( page, postId, null );
	} );

	test( '404 (no quote found)', async ( { editor, page, admin } ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			'404 (no quote found)',
			{ userId: 4711, language: 'ja' }
		);
		await checkNoQuoteFound( page, postId );
	} );

	// category 'Ant' (id 305) has only one quote in German
	test( "Language 'de', Category 'Ameise'", async ( {
		editor,
		page,
		admin,
	} ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			"Category 'Ameise'",
			{ language: 'de', categoryId: 305 }
		);
		await checkQuote(
			page,
			postId,
			'de',
			'Treffen sich zwei Ameisen. Fragt die eine: „Und – was machen Sie so?” Sagt die andere: „Sie meinen beruflich?”'
		);
	} );

	// author Шевченко, Тарас Григорович (id 599) and category Writing (id 292) has one quote in ukrainian
	test( "Language 'uk', Author 'Шевченко', category 'Писання'", async ( {
		editor,
		page,
		admin,
	} ) => {
		const postId = await createPostWithPlugin(
			editor,
			admin,
			"Author 'Шевченко', category 'Писання'",
			{ language: 'uk', authorId: 599, categoryId: 292 }
		);
		await checkQuote(
			page,
			postId,
			'uk',
			null,
			null,
			null,
			null,
			heikoAdminTestData.uk.author,
			heikoAdminTestData.uk.authorLink
		);
	} );
} );
