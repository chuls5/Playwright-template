# Playwright Test Framework - Starter Template 🚀

A comprehensive starter template for setting up Playwright Node.js test automation with Azure DevOps integration using the [@alex_neo/playwright-azure-reporter](https://www.npmjs.com/package/@alex_neo/playwright-azure-reporter) package.

## Why This Template? 💡

Running tests with Playwright is straightforward, but the real challenge lies in integrating test results with tracking systems like Azure DevOps. This template solves that problem by providing a pre-configured setup with Azure reporting capabilities.

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

2. Update the `.env` file with your specific configuration values

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

2. Configure the Azure reporter in `playwright.config.js` with:

   - Organization URL
   - Project name
   - Test plan ID
   - Personal Access Token (PAT)

3. The Azure reporter is disabled by default (commented out) - enable it only when you're ready to publish results

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
