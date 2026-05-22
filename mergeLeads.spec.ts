import { test, expect } from '@playwright/test';

test('Merge two leads', async ({ page }) => {
  page.goto('https://leaftaps.com/opentaps/control/main');

  page.on('dialog', async (alert) => {
    await alert.message();
    await alert.type();
    await alert.accept();
  });

  await page.locator('#username').fill('Demosalesmanager');
  await page.locator('#password').fill('crmsfa');
  await page.locator('.decorativeSubmit').click();
  await page.locator('a:has-text("CRM/SFA")').click();
  await page.locator('a:has-text("Leads")').click();
  await page.getByText('Merge Leads', { exact: true }).click();
  // Step 1: Listen + click (NO await inside)
  const [lookupPage] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .locator(
        "//input[@id='partyIdFrom']/following-sibling::a[contains(@href,'lookup2autocomplete')]",
      )
      .click(),
  ]);

  // Step 2: Wait for popup to load
  await lookupPage.waitForLoadState();

  // Step 3: Perform action inside popup
  await lookupPage.locator("(//a[contains(@href,'set_value')])[1]").click();

  // Step 4: Switch back to parent page
  await page.bringToFront();

  // Step 1: Listen + click (NO await inside)
  const [popupPage] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .locator(
        "//input[@id='partyIdTo']/following-sibling::a[contains(@href,'lookup2autocomplete')]",
      )
      .click(),
  ]);

  // Step 2: Wait for popup to load
  await popupPage.waitForLoadState();

  // Step 3: Perform action inside popup
  await popupPage.locator("(//a[contains(@href,'set_value')])[16]").click();

  // Step 4: Switch back to parent page
  await page.bringToFront();
  await page.locator(':text-is("Merge")').click();
  console.log('Page Title of after Merge button clicked:', await page.title());
});
