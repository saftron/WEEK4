import { test } from "@playwright/test";

import credentials from "./salesforceLogins.json";

test.describe("Test to be executed in serial mode", () => {
  test("Execute SaleForce credentials in loop", async ({ page, context }) => {
    for (const data of credentials) {
      await page.goto("https://login.salesforce.com/?locale=in ");
      await page.locator("#username").fill(data.Username);
      await page.locator("#password").fill(data.Password);
    //   await page.locator("#Login").click();
    //   const title = await page.title();
      console.log(`Executed for TestCaseId: ${data.TestCaseId}`);
    }
  });
});
