# Playwright Test Framework - Starter Template 🚀

A comprehensive starter template for setting up Playwright Node.js test automation with Azure DevOps integration using the [@alex_neo/playwright-azure-reporter](https://www.npmjs.com/package/@alex_neo/playwright-azure-reporter) package.

## Why This Template? 💡

When you run Playwright tests without specifying a reporter, it uses the list reporter by default. This reporter provides a simple output in the console, showing the status of each test (passed, failed, skipped), along with the duration of each test. This default output is helpful for quick test runs and local development but may not be sufficient for larger projects or CI/CD pipelines where more detailed reporting is required.

This template solves that problem by providing a pre-configured setup with Azure reporting capabilities. It uses the built-in JUnit reporter along with the npm package, @alex_neo/playwright-azure-reporter, to publish results for different configurations.

The JUnit reporter produces test results in XML format, which is a standard format used by many CI/CD systems. This XML includes information about each testcase, including its status, time taken, and any error messages.

The @alex_neo/playwright-azure-reporter is a reporter for Playwright that's specifically designed to integrate test results with Azure DevOps. It works by first generating JUnit XML reports using Playwright's built-in JUnit reporter, and then it processes those reports to create test attachments and annotations that are compatible with Azure DevOps pipelines.
The flow typically works like this:

1. The reporter uses Playwright's JUnit reporter to generate XML test results
2. It then parses those results and transforms them into a format that can be properly displayed in Azure DevOps
3. Test results, screenshots, traces, and other artifacts are uploaded as attachments to the Azure DevOps test runs

You'll need to configure it in your Playwright config file with appropriate Azure DevOps connection settings, but you don't need to separately configure the JUnit reporter - that dependency is handled internally by the package.

## Prerequisites 🛠️

Ensure you have the following installed:

- Node.js (v14 or newer)
- npm (included with Node.js)
- Git

Verify your installation with:

```bash
node -v
npm -v
git --version
```

## Getting Started 🔧

### 1. Clone and Set Up Your Repository 📁

#### Clone this template repository:

```bash
git clone https://github.com/chuls5/Playwright-template
cd playwright-template
```

#### Set up your own Git repository:

1. Check current remote connection:

   ```bash
   git remote -v
   ```

2. Remove the original remote:

   ```bash
   git remote remove origin
   ```

3. Connect to your own repository:
   ```bash
   git remote add origin <YOUR_REPOSITORY_URL>
   ```

### 2. Install Dependencies 📦

```bash
npm install
```

### 3. Configure Environment Variables ⚙️

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your specific configuration values:
   - AZURE_PAT: Your Azure DevOps Personal Access Token
   - Other environment variables as needed for your tests

## Project Structure 📂

```
├── tests/                 # Test files
├── tests-examples/        # Example test files
├── .github/workflows/     # GitHub pipeline configurations
├── playwright.config.js   # Playwright configuration
├── package.json           # Project dependencies and scripts
├── .env                   # Environment variables (gitignored)
├── .env.example           # Example environment file
└── README.md              # Project documentation

# Generated during test execution:
├── playwright/            # Playwright artifacts (auth states, etc.)
├── playwright-report/     # Generated test reports
└── test-results/          # Screenshots, videos, and logs
```

## Azure DevOps Integration 🔄

This template includes setup for reporting test results to Azure DevOps:

1. Use `@[TestID]` in your test titles to link them to Azure DevOps test cases

   ```javascript
   test("Should login successfully @[123456] ", async ({ page }) => {
     // Test implementation
   });
   ```

2. Configure the Azure reporter in `playwright.config.js` with your enviorment:

   - {Personal Access Token (PAT) } = token: process.env.AZURE_TOKEN
   - {Organization URL} = orgUrl: "https://dev.azure.com/<your-organization-name>"
   - {Project name} = projectName: "<your-project-name>"
   - {Test plan ID} = planId: <your-test-planId>
   

4. The Azure reporter is disabled by default (commented out) - enable it only when you're ready to publish results.

   ```javascript
   [
     "@alex_neo/playwright-azure-reporter",
     {
       orgUrl: "https://dev.azure.com/globalmeddev",
       token: process.env.AZURE_TOKEN,
       planId: 123456,
       projectName: "exampleProject",
       environment: "QA",
       logging: true,
       testRunTitle: "Playwright Test Run",
       publishTestResultsMode: "testRun",
       uploadAttachments: true,
       attachmentsType: ["screenshot", "video", "trace"],
       testCaseIdMatcher: /@\[(\d+)\]/,
       testPointMapper: async (testCase, testPoints) => {
         // Get the browser name from the test project
         const browserName = testCase.parent.project()?.name;
         // Map browser names to configuration IDs in Azure DevOps
         switch (browserName) {
           case "chromium":
           case "desktop-chrome":
             return testPoints.filter((testPoint) =>
               testPoint.configuration.name.includes("Browser Web")
             );
           case "chrome-mobile":
             return testPoints.filter((testPoint) =>
               testPoint.configuration.name.includes("Browser Chrome Mobile")
             );
           case "safari-mobile":
             return testPoints.filter((testPoint) =>
               testPoint.configuration.name.includes("Browser Safari Mobile")
             );
           default:
             // If no specific mapping is found, return the first test point
             return testPoints.length > 0 ? [testPoints[0]] : [];
         }
       },
       testRunConfig: {
         owner: {
           displayName: "<your-azureDevOps-account-name>",
         },
         comment: "Playwright Test Run",
       },
     },
   ];
   ```

## Running Tests ▶️

Execute all tests:

```bash
npx playwright test
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

## Viewing Test Reports 📊

After test execution, view the HTML report with:

```bash
npx playwright show-report
```

This opens a detailed report in your browser with test results, screenshots, and traces.

## Writing Effective Tests 📝

### Basic Example

```javascript
import { test, expect } from "@playwright/test";

test("example test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.locator("h1")).toContainText("Example Domain");
});
```

### Best Practices 🔍

1. **Page Object Pattern**: Encapsulate page-specific selectors and actions
2. **Organized Structure**: Group tests by features or pages
3. **Independence**: Each test should run independently
4. **Descriptive Naming**: Use clear test names that explain the test purpose
5. **Reliable Waits**: Avoid hardcoded timeouts; use `waitFor` functions
6. **Test Data Management**: Create helpers for generating test data

## CI Pipeline Configuration 🔄

The template includes GitHub Workflows for continuous integration:

- Automated test runs on pull requests
- Parallel test execution across browsers
- Report generation and publishing
- Result notifications

## Learning Resources 📚

### Tutorial Videos 🎬

1. [Getting Started with Playwright and VS Code](https://www.youtube.com/watch?v=Xz6lhEzgI5I)
2. [Generating Playwright Tests in VS Code](https://www.youtube.com/watch?v=5XIZPqKkdBA)
3. [Debugging Playwright Tests using Traceviewer](https://www.youtube.com/watch?v=yP6AnTxC34s)
4. [Advanced Playwright YouTube Tutorials](https://www.youtube.com/watch?v=ePy0Xl-JpRg&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-&index=3)

### Documentation 📖

- [Official Playwright Documentation](https://playwright.dev/docs/intro)
- [Microsoft Learn: Build your first end-to-end test with Playwright](https://learn.microsoft.com/en-us/training/modules/build-with-playwright/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Swagger API Documentation](https://api.dev-encounterservices.com/api/v2/swagger#)

---

Happy Testing! 🚀👩‍💻👨‍💻 Remember to always obey the testing GOAT! 🐐
