const { test, expect } = require("@playwright/test");
const { searchForProduct } = require("./Function");

const getTimestamp = () => new Date().toISOString().replace(/[:.-]/g, "_");

let page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://next.medusajs.com/us");
});

test.afterAll(async () => {
  await page.close();
});

test("Search Function Redirects to Results Page with Relevant Content", async () => {
  await searchForProduct(page, "blender");
  await page.waitForSelector("//div/li/a/div/div/div/p", { state: "visible" });

  await page.waitForTimeout(500);

  await expect(page.locator("//div/li/a/div/div/div/p")).toContainText(
    /Blend./i
  );

  await page.click("//div/li/a/div/div/img");

  await page.waitForSelector("//div/h2", { state: "visible" });
  await expect(page.locator("//div/h2")).toContainText(/Blend./i);

  const timestamp = getTimestamp();
  await page.screenshot({
    path: `./screenshots/screenshots-${timestamp}.png`,
  });
});
