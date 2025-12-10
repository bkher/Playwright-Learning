import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';

/**
 * In ESM, __dirname is not defined by default.
 * This block recreates it.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environment = process.env.ENV || 'local';
const envFile = `.env.${environment}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

console.log(`🧩 Loaded environment: ${environment} (${envFile})`);
console.log("CI =", process.env.CI);




/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/',
  //naveenLab, flipkart
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
 // forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,

  /* Opt out of parallel tests on CI — omit 'workers' when not in CI */
  workers: process.env.CI === "true" ? 1 : 1,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
 reporter: [
    ['list'],
    ['html', { open: 'always' }],
    ['junit', { outputFile: 'results.xml' }],
  ],

   /* Global timeout for each test (in ms) */
  timeout: 60 * 1000,

  /* Shared settings for all projects. */
  use: {
   /* Use baseURL from environment variable */
    baseURL: process.env.BASE_URL || 'https://www.lambdatest.com/selenium-playground/',
    /* Collect trace when retrying a failed test */
    headless:false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions : {
          args : [],
        //  args : ['--incognito'],
        },        
       },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Uncomment to test mobile browsers */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Uncomment to test branded browsers */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
     {
       name: 'GoogleChrome',
       use: { ...devices['Desktop Chrome'], channel: 'chrome' },
     },
  ],

  /* Optionally run your dev server before tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
