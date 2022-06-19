import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
    execTimeout: 10000,
    taskTimeout: 10000,
    defaultCommandTimeout: 10000,
  },
});
