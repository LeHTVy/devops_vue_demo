import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',

  e2e: {
    setupNodeEvents() {},
    baseUrl: 'http://localhost:5173',
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
