import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  allowCypressEnv: false,
  env: {
    CYPRESS_API_URL: process.env.CYPRESS_API_URL,
    CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL,
  },
  e2e: {
    setupNodeEvents(_on, _config) {},
    baseUrl: process.env.CYPRESS_BASE_URL,
  },
});