# Playwright Test Framework - Starter Template 🚀

A comprehensive starter template for setting up Playwright Node.js test automation with seamless Azure DevOps integration using the [@alex_neo/playwright-azure-reporter](https://www.npmjs.com/package/@alex_neo/playwright-azure-reporter) package.

## Why This Template? 💡

Setting up Playwright is straightforward, but integrating test results with Azure DevOps can be complex. This template solves that problem by providing a pre-configured setup that handles the heavy lifting for you.

**What this template provides:**
- Pre-configured Azure DevOps integration
- JUnit XML reporting for CI/CD compatibility
- Multi-browser configuration support
- Automated test result publishing
- Screenshot, video, and trace attachment handling

The integration works by using Playwright's built-in JUnit reporter alongside the @alex_neo/playwright-azure-reporter package to automatically publish test results to your Azure DevOps test plans.

## Quick Start 🚀

### Prerequisites

- Node.js (v14 or newer)
- npm (included with Node.js)
- Git
- Azure DevOps account with appropriate permissions

### 1. Clone and Setup

```bash
# Clone the template
git clone https://github.com/chuls5/Playwright-template
cd playwright-template

# Remove original remote and add your own
git remote remove origin
git remote add origin <YOUR_REPOSITORY_URL>

# Install dependencies
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Edit the `.env` file with your Azure DevOps details:
```env
AZURE_TOKEN=your_personal_access_token_here
```

### 3. Configure Azure DevOps Integration

In `playwright.config.js`, update the Azure reporter configuration with your specific details:

```javascript
// Uncomment and configure when ready to use Azure integration
/*
[
  "@alex_neo/playwright-azure-reporter",
  {
    orgUrl: "https://dev.azure.com/<your-organization-name>",
    token: process.env.AZURE_TOKEN,
    planId: <your-test-plan-id>,
    projectName: "<your-project-name>",
    environment: "QA",
    logging: true,
    testRunTitle: "Playwright Test Run",
    publishTestResultsMode: "testRun",
    uploadAttachments: true,
    attachmentsType: ["screenshot", "video", "trace"],
    testCaseIdMatcher: /@\[(\d+)\]/,
    // ... rest of configuration
  },
]
*/
```

**You'll need these four pieces of information:**
1. **Personal Access Token (PAT)** - Create one in Azure DevOps with Test Plan permissions
2. **Organization URL** - Format: `https://dev.azure.com/your-organization-name`
3. **Project Name** - Your Azure DevOps project name
4. **Test Plan ID** - The numeric ID of your test plan

### 4. Link Tests to Azure DevOps (Optional)

To link your Playwright tests to Azure DevOps test cases, include the test case ID in your test title:

```javascript
test('Should login successfully @[123456]', async ({ page }) => {
  // Your test code here
});
```

## Running Tests ▶️

```bash
# Run all tests
npx playwright test

# Run specific browser
npx playwright test --project=chromium

# Debug mode
npx playwright test --debug

# View HTML report
npx playwright show-report
```

## Project Structure 📂

```
├── tests/                 # Your test files go here
├── tests-examples/        # Example test files for reference
├── .github/workflows/     # CI/CD pipeline configurations
├── playwright.config.js   # Main Playwright configuration
├── package.json           # Dependencies and scripts
├── .env                   # Your environment variables (gitignored)
├── .env.example           # Template for environment variables
└── README.md              # This documentation

# Generated during test runs:
├── playwright-report/     # HTML test reports
├── test-results/          # Screenshots, videos, traces
└── playwright/            # Playwright internal files
```

## Writing Tests 📝

### Basic Test Example

```javascript
import { test, expect } from "@playwright/test";

test('User can reset password @[114944]', async ({ page }) => {
  // Navigate and interact with the page
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Enter email' }).fill('user@example.com');
  await page.getByRole('button', { name: 'Next' }).click();
  
  // Click forgot password link
  await page.getByRole('link', { name: 'Forgot Password' }).click();
  await page.getByRole('button', { name: 'Send Email' }).click();
  
  // Verify the result
  await expect(page).toHaveURL(/.*\/password-reset-confirmation/);
  await expect(page.getByRole('heading', { name: 'Your reset password link was' })).toBeVisible();
});
```

### Best Practices

- **Use descriptive test names** that explain what you're testing
- **Make tests independent** - each test should work on its own
- **Use reliable selectors** - prefer `getByRole()`, `getByText()`, and `getByTestId()`
- **Include test case IDs** in titles when linking to Azure DevOps
- **Group related tests** in the same file or describe blocks

## Azure DevOps Integration Details 🔄

### How It Works

1. Run your tests locally with the Azure reporter enabled
2. The reporter automatically creates a test run in your specified Azure DevOps test plan
3. Test results are published with full details including:
   - Pass/fail status
   - Execution time
   - Screenshots on failure
   - Video recordings
   - Trace files for debugging

### Multi-Browser Support

The template includes configuration mapping for different browsers:
- **Chromium/Chrome** → Maps to "Browser Web" configuration
- **Chrome Mobile** → Maps to "Browser Chrome Mobile" configuration  
- **Safari Mobile** → Maps to "Browser Safari Mobile" configuration

This allows you to run the same tests across multiple browser configurations and see separate results in Azure DevOps.

### Enabling Azure Integration

The Azure reporter is commented out by default. To enable it:

1. Ensure your `.env` file has the correct `AZURE_TOKEN`
2. Update the configuration values in `playwright.config.js`
3. Uncomment the Azure reporter section
4. Run your tests normally - results will automatically publish to Azure DevOps

## CI/CD Pipeline 🔄

The template includes GitHub Actions workflows for:
- Automated test execution on pull requests
- Parallel test runs across multiple browsers
- Automatic report generation and publishing
- Integration with Azure DevOps for result tracking

## Troubleshooting 🔧

### Common Issues

**Tests not linking to Azure DevOps:**
- Verify your test case ID format: `@[123456]`
- Ensure the test case exists in your test plan
- Check your Personal Access Token permissions

**Reporter not publishing results:**
- Confirm all four required configuration values are correct
- Verify your PAT has "Test Plans (read & write)" permissions
- Check the Azure reporter is uncommented in the config

**Tests failing to run:**
- Run `npx playwright install` to ensure browsers are installed
- Check your base URL configuration matches your test environment

## Learning Resources 📚

### Video Tutorials
- [Getting Started with Playwright and VS Code](https://www.youtube.com/watch?v=Xz6lhEzgI5I)
- [Generating Playwright Tests in VS Code](https://www.youtube.com/watch?v=5XIZPqKkdBA)
- [Advanced Playwright Tutorial Playlist](https://www.youtube.com/watch?v=ePy0Xl-JpRg&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-)

### Documentation
- [Official Playwright Documentation](https://playwright.dev/docs/intro)
- [Azure Test Plans Documentation](https://learn.microsoft.com/en-us/azure/devops/test/overview?view=azure-devops)
- [Microsoft Learn: Build with Playwright](https://learn.microsoft.com/en-us/training/modules/build-with-playwright/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## Support 💬

If you run into issues or have questions:
1. Check the troubleshooting section above
2. Review the example tests in the `tests-examples/` folder
3. Consult the official Playwright documentation
4. Open an issue in this repository

---

Happy testing! 🎭✨

Happy Testing! 🚀👩‍💻👨‍💻 Remember to always obey the testing GOAT! 🐐
