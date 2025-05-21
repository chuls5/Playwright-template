# Playwright (Node.js) Test Framework - Starter Template 🚀

This repository provides a starter template for users who plan to use Playwright Node.js with @alex_neo/playwright-azure-reporter to integrate test results with Azure Devops. The Documentation for the @alex_neo reporter can be found here [@alex_neo/playwright-azure-reporter](https://www.npmjs.com/package/@alex_neo/playwright-azure-reporter). When it comes to Playwright, running tests isn't the hard part - the difficulty arises when you want to integrate the results of your tests with Azure DevOps or other tracking systems.

## Prerequisites 🛠️

Before getting started, ensure you have the following installed:

- Node.js (v14 or newer)
- npm (comes with Node.js)
- Git

The commands are:

- "npm -v" : To display the installation version of npm
- "git -v" : To display the installation version of git
- "git remote -v" : To verify where your local git repository is connected / pointing to

If this is your first time here, please continue with project setup below.

## Project Setup 🔧

### 1. Connect to and Clone the Repository 📁

Cloning creates a local copy of the repository on your machine, allowing you to use and modify the code independently of the original repository.
There are two methods to clone the repository: HTTPS (username/password) or SSH (key-based). HTTPS is the simplest for new users.

#### HTTPS Method (Recommended for New Users)

1. Open your terminal or command prompt
2. Navigate to the directory where you want to clone the project
3. Run the clone command:

```bash
git clone https://github.com/chuls5/Playwright-template
cd playwright-template
```

#### Verify Repository Connection

After cloning, you most likely want to set up your own Git repository for your new Playwright project. You are going to need to initilize a new git repository on your local machine. Then you wll push your repository to your choice of version control. To do this you must first make sure you are NOT connected to my (Cody's) Playwright template on Github. The commands to check & re establish your git origin are as follows:

```bash
git remote -v

git remote remove origin

git remote add origin <URL>
```

## Project Structure 📁

The project is already setup for you. You just need to follow the instructions from [@alex_neo/playwright-azure-reporter](https://www.npmjs.com/package/@alex_neo/playwright-azure-reporter) to specify the testcase ID in the title of your tests. By default use, '@[111234]' where the numbers correspond to your testcase ID. You will need to specify the testplanID, Organization URL, and project name in the configuration file.

Remember - You only use the Azure reporter when you are publishing your results, so it is commented out by default in the configuration file. Don't worry about turning it 'ON' until you are confident in your tests.

You will need to generate an Azure Personal Access Token (PAT) whi

```
├── enow-playwright/        # Main project directory
│   ├── .github/workflows/  # Github pipelines
│   ├── node_modules/       # Project dependencies
│   ├── tests/              # Test files
|   |
│   ├── tests-examples/     # Example test files
│   ├── .env                # Environment variables (gitignored)
│   ├── .env.example        # Example environment file
│   ├── playwright.config.js # Playwright configuration
│   ├── package.json        # Project dependencies and scripts
│   └── README.md           # Project documentation
|
├── playwright/             # Playwright artifacts (auth states, etc.)
├── playwright-report/      # Generated test reports
└── test-results/           # Screenshots, videos, and logs
```

## Test Structure 🧪

Tests are organized to cover core application functionality and follow best practices for maintainability and reliability:

- 🔑 Authentication state storage to optimize test performance
- ⚙️ Environment configuration through dotenv
- 🌐 Cross-browser testing capabilities
- 📊 Detailed reporting for test results analysis

## Configuration ⚙️

The project uses `playwright.config.js` to configure test execution. Key configuration options include:

- 🌐 Browsers to test (Chromium, Firefox, WebKit)
- 📱 Viewport sizes
- ⏱️ Test timeouts
- 📸 Screenshot and video capture settings
- ⚡ Parallel execution options

## CI Pipeline 🔄

The project is configured to run tests in CI using Github Pipelines. The workflow configuration is located in `.github/workflows/`. Pipeline configurations handle:

- 🔄 Automated test runs on Pull Requests
- 📊 Test report generation and publishing
- 🏗️ Parallel test execution across browsers
- 🔔 Notification of test results

## Viewing Test Reports 📊

After running tests, HTML reports are generated that show detailed test results:

1. Run tests with the report option:

   ```bash
   npx playwright test
   ```

2. View the generated report:
   ```bash
   npx playwright show-report
   ```

This will open a browser with detailed test results, including screenshots and traces for failed tests.

## Writing Tests 📝

Tests are written using Playwright's test framework. Here's a basic example:

```javascript
import { test, expect } from "@playwright/test";

test("example test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.locator("h1")).toContainText("Example Domain");
});
```

### Best Practices 💡

1. Use page objects to encapsulate page-specific selectors and actions
2. Organize tests by requirements, feature, or page
3. Make tests independent from each other
4. Use descriptive test names
5. Avoid hardcoded timeouts with `waitFor` functions instead
6. Use test data helpers for generating test data

## Tutorial Videos 🎬

Get started quickly with these helpful tutorial videos:

1. [Getting Started with Playwright and VS Code](https://www.youtube.com/watch?v=Xz6lhEzgI5I) - Basic introduction to the framework
2. [Generating Playwright Tests in VS Code](https://www.youtube.com/watch?v=5XIZPqKkdBA) - Step-by-step guide for creating a test
3. [Debugging Playwright Tests using Traceviewer](https://www.youtube.com/watch?v=yP6AnTxC34s) - Debug your tests using VS Code + Playwright trace view
4. [Advanced Playwright Youtube Tutorials](https://www.youtube.com/watch?v=ePy0Xl-JpRg&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-&index=3) - Excellent Playwright Playlist on Youtube

## Documentation & Resources 📚

- [Official Playwright Documentation](https://playwright.dev/docs/intro)
- [Build your first end-to-end test with Playwright](https://learn.microsoft.com/en-us/training/modules/build-with-playwright/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Swagger API Documentation](https://api.dev-encounterservices.com/api/v2/swagger#)

Happy Hacking! 🚀👩‍💻👨‍💻 & Remember! Always obey the testing GOAT! 🐐🐐
