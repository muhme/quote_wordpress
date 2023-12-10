/*
 * MIT License, Copyright (c) 2023 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 * shortcode.spec.ts - frontend E2E tests using the plugin with shortcode
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import { checkQuote, createPostWithShortcode } from './testHelper';

test.describe('Shortcode', () => {

  test('german language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Language Deutsch', {language: 'de'});
    await checkQuote(page, postId, 'de');
  });
  
  test('english language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Language English', {language: 'en'});
    await checkQuote(page, postId, 'en');
  });

  test('spanish language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Language español', {language: 'es'});
    await checkQuote(page, postId, 'es');
  });

  test('japanese language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Language 日本語', {language: 'ja'});
    await checkQuote(page, postId, 'ja');
  });

  test('ukrainian language attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Language українська', {language: 'uk'});
    await checkQuote(page, postId, 'uk');
  });

  test('language attribute not set', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Language not set', null);
    await checkQuote(page, postId, 'en');
  });

  test('language attribute not supported', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Language Français', {language: 'fr'});
    await checkQuote(page, postId, 'en');
  });

  test('cheesecake attribute', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Cheesecake attribute', {cheesecake: 'delicious'});
    await checkQuote(page, postId, 'en');
  });

  test('several nonsense attributes', async ({ editor, page, admin }) => {
    const postId = await createPostWithShortcode(editor, admin, 'Several nonsense attributes', {one: 'A', two: 'B', three: 'C'});
    await checkQuote(page, postId, 'en');
  });

});
