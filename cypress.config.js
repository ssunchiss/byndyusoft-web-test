const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 120000,
  projectId: 'vps3ev',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
