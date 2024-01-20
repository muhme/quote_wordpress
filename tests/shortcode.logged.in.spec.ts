/*
 * MIT License, Copyright (c) 2023 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 * shortcode.spec.ts - frontend E2E tests using the plugin with shortcode
 */
import { test } from '@wordpress/e2e-test-utils-playwright';
import { checkQuote, createPostWithPlugin } from './testHelper';

/*
 * Test shortcode in posts with different `language` attributes.
 * Needs to be logged-in as WordPress admin before.
 */
test.describe('Frontend – Shortcode', () => {

  test('german language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language Deutsch', {language: 'de'});
    await checkQuote(page, postId, 'de');
  });
  
  test('english language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language English', {language: 'en'});
    await checkQuote(page, postId, 'en');
  });

  test('spanish language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language español', {language: 'es'});
    await checkQuote(page, postId, 'es');
  });

  test('japanese language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language 日本語', {language: 'ja'});
    await checkQuote(page, postId, 'ja');
  });

  test('ukrainian language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language українська', {language: 'uk'});
    await checkQuote(page, postId, 'uk');
  });

  test('language attribute not set', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language not set', null);
    await checkQuote(page, postId, null);
  });

  test('language attribute not supported', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language Français', {language: 'fr'});
    await checkQuote(page, postId, 'en');
  });

  test('cheesecake attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Cheesecake attribute', {cheesecake: 'delicious'});
    await checkQuote(page, postId, null);
  });

  test('several nonsense attributes', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Several nonsense attributes', {one: 'A', two: 'B', three: 'C'});
    await checkQuote(page, postId, null);
  });

});
