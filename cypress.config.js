const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

// uncomment for setupNodeEvents for BDD tests
// async function setupNodeEvents(on, config) {
//   // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
//   await preprocessor.addCucumberPreprocessorPlugin(on, config);

//   on(
//     "file:preprocessor",
//     webpack({
//       webpackOptions: {
//         resolve: {
//           extensions: [".ts", ".js"],
//         },
//         module: {
//           rules: [
//             {
//               test: /\.feature$/,
//               use: [
//                 {
//                   loader: "@badeball/cypress-cucumber-preprocessor/webpack",
//                   options: config,
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     })
//   );

//   // Make sure to return the config object as it might have been modified by the plugin.
//   return config;
// }

module.exports = defineConfig({
  projectId: 'dqy8am',
  e2e: {
    // uncomment for setupNodeEvents for BDD tests
    // setupNodeEvents,
    // non-BDD tests
    // specPattern: 'cypress/integration/examples/*.js'
    specPattern: 'cypress/integration/bankDemo/*.js'
    // BDD tests
    // specPattern: 'cypress/integration/examples/**/*.{feature, features}'
  },
  env: {
    url: 'https://rahulshettyacademy.com',
    demoUrl: 'https://www.demo.bnz.co.nz/client'
  },
  // reporter: 'mochawesome',
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  downloadsFolder: 'cypress/downloads'
});
