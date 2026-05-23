import { test } from "@playwright/test";


test(`Learn using locators for drop down `, async ({ page }) => {


    await page.goto(`https://leaftaps.com/opentaps/control/main`);
    await page.locator(`//input[@id="username"]`).fill("democsr2");
    await page.locator(`//input[@id="password"]`).fill("crmsfa");
    await page.locator(`//input[@class="decorativeSubmit"]`).click();
    await page.locator(`//a[contains(text(),"CRM/SFA")]`).click();
    await page.locator('//a[text()="Create Lead"]').click();
    await page.locator('//input[@id="createLeadForm_companyName"]').fill("Testleaf");
    await page.locator(`//input[@id="createLeadForm_firstName"]`).fill("Jag");
    await page.locator(`//input[@id="createLeadForm_lastName"]`).fill("Nalla");
    await page.selectOption('//select[@id="createLeadForm_dataSourceId"]', { label: 'Direct Mail' });
    const marketingDropDown = await page.locator('#createLeadForm_marketingCampaignId');
    await marketingDropDown.selectOption({ label: 'Demo Marketing Campaign' });
    const count = await marketingDropDown.count();
    
    for (let x = 0; x < count; x++) {
        const dropDownValues = await marketingDropDown.nth(x).innerText();
        console.log(`List of drop down values found under Marketing Campaign dropdown: ${dropDownValues}`);
    }

    await page.locator('//select[@id="createLeadForm_industryEnumId"]').selectOption({ label: 'General Services' });
    await page.locator('//select[@id="createLeadForm_currencyUomId"]').selectOption({ label: 'INR - Indian Rupee' });
    await page.locator('//select[@id="createLeadForm_generalCountryGeoId"]').selectOption({ label: 'India' });
    const stateDropDown = await page.locator('//select[@id="createLeadForm_generalStateProvinceGeoId"]');
    await stateDropDown.selectOption({ label: 'TAMILNADU' });
    const stateCount = await stateDropDown.count();
    
    for (let state = 0; state < stateCount; state++) {
        const stateDropDownValues = await stateDropDown.nth(state).innerText();
        console.log(`List of drop down values found under State dropdown: ${stateDropDownValues}`);
    }

    await page.locator('.smallSubmit').click();

 
})