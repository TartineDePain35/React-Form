import { test, expect } from '@playwright/test';

test('test create a task and go to this atsh page detail', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'titre' }).click();
  await page.getByRole('textbox', { name: 'titre' }).fill('Test de la tache');
  await page.getByRole('textbox', { name: 'description' }).click();
  await page.getByRole('textbox', { name: 'description' }).fill('Description bidon');
  await page.getByRole('button', { name: 'Ajouter une tache' }).click();
  await page.getByRole('link', { name: 'Test de la tache Description' }).click();
  await expect(page.getByText('l\'id de la tache')).toBeVisible();
});