// @ts-check
import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', {open: 'never'}], // Always set to 'never' for CI to avoid hanging
    ['junit', {outputFile: 'test-results/results.xml'}], // JUnit reporter for Azure DevOps
    // [
    //   '@alex_neo/playwright-azure-reporter',
    //   {
    //     orgUrl: 'https://dev.azure.com/globalmeddev',
    //     token: process.env.AZURE_TOKEN,
    //     planId: 114816,
    //     projectName: 'eNow2',
    //     environment: 'QA',
    //     logging: true,
    //     testRunTitle: 'Playwright Test Run',
    //     publishTestResultsMode: 'testRun',
    //     uploadAttachments: true,
    //     attachmentsType: ['screenshot', 'video', 'trace'],
    //     testCaseIdMatcher: /@\[(\d+)\]/,
    //     testPointMapper: async (testCase, testPoints) => {
    //       // Get the browser name from the test project
    //       const browserName = testCase.parent.project()?.name;
    //       // Map browser names to configuration IDs in Azure DevOps
    //       switch(browserName) {
    //         case 'chromium':
    //         case 'desktop-chrome':
    //           return testPoints.filter((testPoint) => testPoint.configuration.name.includes('Browser Web'));
    //         case 'chrome-mobile':
    //           return testPoints.filter((testPoint) => testPoint.configuration.name.includes('Browser Chrome Mobile'));
    //         case 'safari-mobile':
    //           return testPoints.filter((testPoint) => testPoint.configuration.name.includes('Browser Safari Mobile'));
    //         default:
    //           // If no specific mapping is found, return the first test point
    //           return testPoints.length > 0 ? [testPoints[0]] : [];
    //       }
    //     },
    //     testRunConfig: {
    //       owner: {
    //         displayName: 'Cody Huls',
    //       },
    //       comment: 'Playwright Test Run',
    //     },
    //   },
    // ]
  ], 
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    /* Desktop Chrome - matches "Browser Web" in Azure DevOps */
    /* All tests will run on this configuration */
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Chrome Mobile - matches "Browser Chrome Mobile" in Azure DevOps */
    {
      name: 'chrome-mobile',
      use: { ...devices['Pixel 5'] },
    },

    /* Safari Mobile - matches "Browser Safari Mobile" in Azure DevOps */
    {
      name: 'safari-mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],
});

