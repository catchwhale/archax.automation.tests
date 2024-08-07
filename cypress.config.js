const { defineConfig } = require('cypress')
const {configFromEnvOrJsonFile} = require('@cypress/env-or-json-file')
const URLs = configFromEnvOrJsonFile('./url.json')
const Environment = URLs['environment']

module.exports = defineConfig({
  defaultCommandTimeout: 48000,
  pageLoadTimeout: 4000,
  viewportWidth: 1440,
  viewportHeight: 900,
  failOnStatusCode: false,
  waitForAnimations: true,
  chromeWebSecurity: false,
  trashAssetsBeforeRuns: true,
  numTestsKeptInMemory: 0,
  video: false,
  videosFolder: 'cypress/videos',
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/reports/mochareports/assets',
  downloadsFolder: 'cypress/downloads',
  fixturesFolder: 'cypress/fixtures',
  env: {
    apiUrl: URLs.url[`${Environment}`].apiUrl,
    websocketUrl: URLs.url[`${Environment}`].websocketUrl
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    charts: true,
    reporterEnabled: 'mochawesome',
    reportPageTitle: 'Archax Crypto Report',
    embeddedScreenshots: true,
    quiet: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportFilename: 'archax_e2e_report',
    timestamp: 'yyyy-mm-dd-HH-MM-ss',
    reportDir: 'cypress/reports/mochareports',
    json: true,
    html: true,
    overwrite: false
  },
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config),
        on('before:run', async (details) => {
        }),
        on('after:run', async () => {
        }),
        on('task', {
          log(message) {
            console.log(message)
            return null
          },
        })
    },
    watchForFileChanges: false,
     specPattern: [
      'cypress/e2e/**/*.cy.js', // First directory
      'cypress/integration/*.cy.js' // Second directory
    ],
    supportFile: 'cypress/support/e2e.js',
    baseUrl: URLs.url[`${Environment}`].baseUrl
  },
})
