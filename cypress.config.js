const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: 'dqy8am',
  e2e: {
    setupNodeEvents,
    // specPattern: 'cypress/integration/examples/*.js'
    specPattern: 'cypress/integration/examples/BDD/*.feature'
  },
  env: {
    url: 'https://rahulshettyacademy.com/'
  },
  reporter: 'mochawesome',
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000
});
