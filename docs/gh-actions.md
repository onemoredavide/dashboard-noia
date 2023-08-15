# Github Action: Eslint & Build

This GitHub Action performs several operations related to code integration and quality checks. It is triggered when pull requests are opened, edited, or synchronized on GitHub, as well as when code is pushed directly to the `main` or `master` branches. The workflow is named [Eslint & Build](../.github/workflows/build.yml).

The workflow is designed with a condition to not trigger if the pull request's title starts with [WIP], indicating "Work in Progress". If the workflow is triggered by a push event to the `main` or `master` branches, it will run regardless of the title.

Here are the tasks performed by the action:

1. **Trigger condition**: The workflow checks if it is a push to the main or master branch or if it's a pull request which doesn't start with [WIP]. If the condition is true, it sets an environment variable TRIGGER as true.

2. **Checkout**: Checks out the code repository using `actions/checkout@v3`.

3. **Install cwebp**: Installs `cwebp`, a tool to create WebP images.

4. **Set up Node.js**: Sets up the specified version of Node.js in the runtime environment using `actions/setup-node@v3`. The version is specified in the project's `.nvmrc` file. It also caches npm dependencies for faster subsequent runs.

5. **Set up SSH key**: Creates an SSH key using a private key from the GitHub Secrets.

6. **Install npm**: Installs the 9th version of npm.

7. **Install dependencies**: Installs project dependencies with `npm ci`.

8. **Eslint**: Runs the ESLint tool to identify and report on patterns found in ECMAScript/JavaScript code, with a focus on simplifying code and avoiding bugs.

9. **Create env file**: Creates a local `.env.local` file and assigns dummy values to certain variables. This file is usually used to store sensitive information for development purposes.

10. **Test Coverage Report**: Executes the `jest-coverage-report-action@v2`, which is an action that comments a Jest coverage report for pull requests.

11. **Build**: Runs the `build` script from the `package.json` file.

Every task, except the trigger condition, only executes if the `TRIGGER` environment variable is true, i.e., if it's not a Work In Progress (starts with [WIP]) or if it's a push to the `main` or `master` branches.

> **Note**: This workflow assumes the existence of certain files (like `.nvmrc`) and certain npm scripts (`build`), which need to be available in your repository. The usage of SSH also implies that the target resources are available to SSH connections initiated from the workflow.

This is a brief overview of the workflow. For a more detailed understanding, consider studying the syntax of GitHub Actions and the specific tools and commands used in this workflow.
