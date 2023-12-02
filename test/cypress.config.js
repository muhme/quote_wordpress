const { defineConfig } = require("cypress");
const fs = require('fs');

const port = '4080';
const host = fs.existsSync('/.dockerenv') ? 'host.docker.internal' : 'localhost';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: `http://${host}:${port}/`,
    supportFile: false,
    chromeWebSecurity: false // enable cookies
  },
  env: {
    title: "WordPress Plugin Zitat Service Test & Development",
    email: "admin@example.com",
    user: "admin",
    password: "admin"
  },
});
