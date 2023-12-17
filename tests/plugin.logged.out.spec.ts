/*
 * MIT License, Copyright (c) 2023 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 *
 * plugin.logged.out.spec.ts - backend E2E tests plugin description, starting without login
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import { userLogin } from './testHelper';
import { ADMIN_USER, ADMIN_PASSWORD } from '../playwright.config';

/*
 * I18N Test of the five different languages in the backend, with five admins, each with their own language settings
 *
 * needs the admins created with scripts/install.sh
 */
test.describe('Backend – Plugin descriptions', () => {

  test('en - English language', async ({ page }) => {
    await userLogin(page, ADMIN_USER, ADMIN_PASSWORD, null);
    await page.goto('/wp-admin/plugins.php');
    const desc = await page.textContent('tr[data-slug="zitat-service"] .plugin-description p') ?? "";
    expect(desc.startsWith('Display a random quote')).toBeTruthy();
  });

  test('de - German language', async ({ page }) => {
    await userLogin(page, ADMIN_USER + '_de', ADMIN_PASSWORD, null);
    await page.goto('/wp-admin/plugins.php');
    const desc = await page.textContent('tr[data-slug="zitat-service"] .plugin-description p') ?? "";
    expect(desc.startsWith('Anzeige eines zufälliges Zitats')).toBeTruthy();
  });

  test('es - Spanish language', async ({ page }) => {
    await userLogin(page, ADMIN_USER + '_es', ADMIN_PASSWORD, null);
    await page.goto('/wp-admin/plugins.php');
    const desc = await page.textContent('tr[data-slug="zitat-service"] .plugin-description p') ?? "";
    expect(desc.startsWith('Muestra una cita aleatoria')).toBeTruthy();
  });

  test('ja - Japanese language', async ({ page }) => {
    await userLogin(page, ADMIN_USER + '_ja', ADMIN_PASSWORD, null);
    await page.goto('/wp-admin/plugins.php');
    const desc = await page.textContent('tr[data-slug="zitat-service"] .plugin-description p') ?? "";
    expect(desc.startsWith('ユーザーコミュニテ')).toBeTruthy();
  });

  test('uk - Ukrainian language', async ({ page }) => {
    await userLogin(page, ADMIN_USER + '_uk', ADMIN_PASSWORD, null);
    await page.goto('/wp-admin/plugins.php');
    const desc = await page.textContent('tr[data-slug="zitat-service"] .plugin-description p') ?? "";
    expect(desc.startsWith('Відобразити випадкову цитату')).toBeTruthy();
  });

});
