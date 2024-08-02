const { expect } = require("@playwright/test");

async function searchForProduct(page, productName) {
  await page.click('a:text("Search")');
  await expect(page.getByPlaceholder("Search products...")).toBeVisible();

  await page.waitForSelector("//div/li");
  const listItemLocator = page.locator("//div/li");
  const count = await listItemLocator.count();
  expect(count).toBe(6);

  await page.getByPlaceholder("Search products...").fill(productName);
}

module.exports = { searchForProduct };
