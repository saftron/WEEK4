import { expect, test } from '@playwright/test';
test("Assignment of Alerts and Frames", async ({ page }) => {
    await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");
    page.on("dialog", async (dialog) => {
        await page.waitForTimeout(5000);
        console.log("Message: " + dialog.message());
        console.log("Type: " + dialog.type());
        await dialog.accept();
    });
    //Click Try it.  
    const frame = page.frameLocator("#iframeResult");
    await frame.locator("//button[text()='Try it']").click();
    //Retrieve the text “You pressed OK!” and verify it.  
    await page.waitForTimeout(5000);
    const message = await frame.locator("#demo").innerText();
    console.log("Message after accepting alert: " + message);
    expect(message).toBe("You pressed OK!");
});
