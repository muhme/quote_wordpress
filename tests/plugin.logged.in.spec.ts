/**
 * tests/plugin.logged.in.spec.ts - frontend E2E tests using the plugin
 *
 * MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 * 
 */
import { test } from '@wordpress/e2e-test-utils-playwright';
import { checkQuote, checkNoQuoteFound, createPostWithPlugin } from './testHelper';

/*
 * Test block widget in posts with different `language` attributes.
 * Needs to be logged-in as WordPress admin before.
 */
test.describe('Frontend – Widget', () => {

  test('german language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language Deutsch', { language: 'de' });
    await checkQuote(page, postId, 'de');
  });

  test('english language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language English', { language: 'en' });
    await checkQuote(page, postId, 'en');
  });

  test('spanish language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language español', { language: 'es' });
    await checkQuote(page, postId, 'es');
  });

  test('japanese language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language 日本語', { language: 'ja' });
    await checkQuote(page, postId, 'ja');
  });

  test('ukrainian language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language українська', { language: 'uk' });
    await checkQuote(page, postId, 'uk');
  });

  test('language attribute not set', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language not set', null);
    await checkQuote(page, postId, null);
  });

  test('language attribute not supported', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Language Français', { language: 'fr' });
    await checkQuote(page, postId, 'en');
  });

  test('cheesecake attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Cheesecake attribute', { cheesecake: 'delicious' });
    await checkQuote(page, postId, null);
  });

  test('several nonsense attributes', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, 'Several nonsense attributes', { one: 1, two: 2, three: 3 });
    await checkQuote(page, postId, null);
  });

  test('404 no quote found', async ({ editor, page, admin }) => {
    const postId = await createPostWithPlugin(editor, admin, '404 no quote found', { userId: 4711, language: 'ja' });
    await checkNoQuoteFound(page, postId);
  });

});
