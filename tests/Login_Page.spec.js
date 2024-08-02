const { test, expect } = require("@playwright/test");

const getTimestamp = () => new Date().toISOString().replace(/[:.-]/g, "_");

let page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://next.medusajs.com/us");
});

test.afterAll(async () => {
  await page.close();
});

test("Validate Medusa website has title", async () => {
  await expect(page).toHaveTitle(/Medusa Next.js Starter Template/);
});

test("Validate Medusa website has URL", async () => {
  await expect(page).toHaveURL("https://next.medusajs.com/us");
});

test("Verify that 'Ecommerce Starter Template' heading is visible", async () => {
  const headingLocator = page.locator(
    '//h1[text()="Ecommerce Starter Template"]'
  );
  await expect(headingLocator).toBeVisible();

  const timestamp = getTimestamp();
  await page.screenshot({ path: `./screenshots/screenshots-${timestamp}.png` });
});

test("Verify that Medusa Store is visible", async () => {
  // const wording = page.getByText("Medusa Store");
  // await expect(wording).toBeVisible();
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "Medusa Store" })
  ).toBeVisible();
});

test("Verify button Menu is visible", async () => {
  await expect(page.locator('button:text("Menu")')).toBeVisible();
});

test("Verify button Search is visible", async () => {
  await expect(page.locator('a:text("Search")')).toBeVisible();
});

test("Verify button Account is visible", async () => {
  await expect(page.locator('a:text("Account")')).toBeVisible();
});

test("Verify button Cart is visible", async () => {
  await expect(page.locator('a[href="/us/cart"]')).toBeVisible();
});
