# Contributing to This Project

Thank you for your interest in contributing to this project! 🛠️ Whether you’re fixing a bug, implementing a feature, or improving documentation, the following guide will help you participate effectively.

---

## Branch Workflow

This project follows a structured branch-based workflow:

- **Main branch (`main`)**:
  The production-ready branch. All changes on this branch are stable and deployed.
  **Do not push directly to `main`.**

- **Development branch (`dev`)**:
  The working branch for testing and staging changes. All Pull Requests should target `dev`.

- **Feature and Fix branches (`feat/*`, `fix/*`, etc.):**
  Individual tasks, features, or fixes should start in separate branches off `dev`. Use a clear and descriptive branch naming convention, e.g.:
    - `feat/add-user-authentication`
    - `fix/fix-login-bug`

**Flow**:
`feat/*` → `dev` → `main`

---

## Requirements

Before contributing, make sure to have the correct setup:

1. **Node.js**
   This project uses `Node.js v24.11.0`. Ensure you have this version by using the `.nvmrc` file:
   ```bash
   nvm install
   nvm use
   ```

2. **Dependencies**
   Install all dependencies before working by running:
   ```bash
   npm ci
   ```

3. **Environment Variables**
    - Never commit secrets like API keys!
    - Use the file `.env.example` as a guideline to create your `.env` file with the required configuration.

To verify your setup, run:

```bash
npm ci
```

---

## Quality Standards

To maintain the quality of this project, follow these practices strictly:

1. **Code Linting**
   Run `npm run lint` to ensure your code adheres to the project coding standards.

2. **Type Safety**
   Run `npm run typecheck` to verify TypeScript typings.

3. **Conventional Commits**
   Use the [Conventional Commits](https://www.conventionalcommits.org) format for commits:
   ```
   <type>: <subject>
   ```
   **Examples**:
    - `feat: add user authentication`
    - `fix(auth): resolve issue with login redirect`
    - `chore: update dependencies`

   **Allowed types**:
    - `feat` → New feature
    - `fix` → Bug fixes
    - `docs` → Documentation updates
    - `style` → Changes to formatting (no code behavior changes)
    - `chore` → Changes to tooling, configuration, etc.
    - `refactor` → Code restructuring without functionality changes
    - `test` → Adding or updating tests
    - `perf` → Performance optimizations

---

## Pull Requests

Follow these guidelines for submitting Pull Requests:

1. **Target Branch**
   Always submit Pull Requests to the `dev` branch.

2. **Templates**
   Fill out the provided PR template completely.

3. **CI Pipeline**
   The CI will automatically validate your PR by running:
    - Type checking (`npm run typecheck`)
    - Linting (`npm run lint`)
    - Build (`npm run build`)

   **Make sure all steps pass**.

4. **Conversations**
   Resolve all comments and suggestions during the code review process before requesting a merge.

5. **CODEOWNER Approval**
   All Pull Requests require explicit approval from the designated CODEOWNER before they can be merged.

6. **Descriptive Title**
   Your PR title should follow the Conventional Commits format, e.g., `feat: add user profile page`.

7. **Checklist Before Submission**
    - [ ] Branch name follows convention (`feat/*`, `fix/*`, etc.)
    - [ ] Code passes all `npm` commands (see “Requirements”).
    - [ ] The PR template is filled out.
    - [ ] No breaking changes, or they are well-documented.
    - [ ] All conversations are resolved before marking the PR as ready.
   - [ ] CODEOWNER approval has been obtained.

---

## Security

Your contributions must follow these security guidelines:

1. **Never Commit Secrets**
   Do not commit API keys, tokens, or secrets directly to the project. Configure all sensitive data through environment variables and ensure they’re added to `.env.example` for reference.

2. **Security Standards**
   Refer to the `SECURITY.md` file for detailed security guidelines and reporting vulnerabilities.

3. **Access Control**
   Make sure your changes do not expose sensitive data or introduce vulnerabilities that could compromise the project.

---

## Reporting Issues and Suggesting Features

- **Bugs**: Use the `bug_report.md` template to report bugs with detailed steps to reproduce the issue.
- **Features**: Use the `feature_request.md` template to propose enhancements or new features.

Don’t forget to provide as much information as possible to help us assess and address your feedback effectively.

---

## Thank You! 🎉

Your contributions are vital to the success of this project. Following these guidelines ensures that your work can be easily reviewed and quickly merged.
Let’s build something amazing together!
