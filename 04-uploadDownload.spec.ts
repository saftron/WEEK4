

import { test, expect } from "@playwright/test";
import path from "path";

test("Upload file - Without the input tag and type='file'", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com/upload");

  const filePromise = page.waitForEvent("filechooser"); 

  await page.locator('[id="drag-drop-upload"]').click();

  const fileUpload = await filePromise;

  await fileUpload.setFiles([
    path.join(__dirname, "../../../Screenshot.png"),
    path.join(__dirname, "../../../Screenshot2.png"),
  ]);

  const uploadfile = await page.locator("div.dz-filename:visible").nth(1);
  expect(uploadfile).toHaveText("Screenshot2.png");
});
