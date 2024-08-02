const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  timeout: 30000,
  //retries: 2,
  //reporter: "list",
  use: {
    headless: true,
  },
  projects: [
    // {
    //   name: "firefox",
    //   use: { browserName: "firefox" },
    // },
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  workers: 8,
});
