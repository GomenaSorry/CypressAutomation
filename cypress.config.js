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
    // BDD tests
    // specPattern: 'cypress/integration/examples/**/*.{feature, features}'
    // amaysimDemo
    specPattern: 'cypress/integration/amaysimDemo/*.js',
    chromeWebSecurity: false,
      experimentalSessionAndOrigin: true
  },
  env: {
    url: 'https://www.amaysim.com.au/'
  },
  // reporter: 'mochawesome',
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 60000,
  requestTimeout: 60000,
  downloadsFolder: 'cypress/downloads'

});
