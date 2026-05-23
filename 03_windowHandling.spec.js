import { test } from "@playwright/test";
test("Assignment Window Handling", async ({ page, context }) => {
    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.locator("#username").fill("Demosalesmanager");
    await page.locator("#password").fill("crmsfa");
    await page.locator(".decorativeSubmit").click();
    await page.locator("text=CRM/SFA").click();
    await page.getByText('Leads', { exact: true }).click();
    await page.getByText('Merge Leads', { exact: true }).click();
    const [childPage] = await Promise.all([
        context.waitForEvent("page"), // Wait for the new page to open
        page.locator('//div[text()="Kechaoda A27"]').first().click(), // Click on the product to trigger the new page
    ]);
    await childPage.waitForLoadState("networkidle");
    console.log(await childPage.title());
    console.log(await page.title());
});
