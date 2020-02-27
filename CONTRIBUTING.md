# Contributing

We are open to, and grateful for, any contrubtions made by the community. As a contributor, here are the guidelines we
would like you to follow:

- [Code of Conduct](##code-of-conduct)
- [Got a question or problem?](##got-a-question-or-issue)
- [Issues and bugs](##found-a-bug)
- [Coding rules](##coding-rules)
- [Working with the code](##working-with-the-code)
- [Submission guidelines](##submission-guidelines)

## Code of Conduct

Help us keep OSRS Logs open and inclusive. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Got a question or problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests.
If you have questions about how to contribute to the project, please join our [Discord]() server.

## Found a bug?

If you find a bug in the soure code, you can help us by [submitting an issue](###submitting-an-issue) to our
[GitHub repository](https://github.com/osrslogs/osrs-exchange). Even better, you can [submit a pull request](###submitting-a-pull-request) with a fix.

## Coding rules

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

| Type       | Description                               |
| ---------- | ----------------------------------------- |
| `chore`    | Tooling change                            |
| `docs`     | Documentation change only                 |
| `feat`     | A new feature                             |
| `fix`      | A bug fix                                 |
| `refactor` | Code refactor                             |
| `revert`   | Reverting a previous commit               |
| `style`    | Change that do not affect meaning of code |
| `test`     | Adding or updating test                   |

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

We use [TypeScript](https://www.typescriptlang.org) for type checking, [ESLint](https://eslint.org) with
[Prettier](https://prettier.io) for linting and formatting the code, and [Jest](https://jestjs.io) for testing.

Our pre-commit hooks verify that the linter pass when committing.

## Working with the code

### Setup the workspace

1. [Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the project.
2. [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) your fork.

```
$ git clone https://github.com/<your-username>/osrs-exchange
```

3. Navigate to the cloned directory.

```
$ cd osrs-exchange
```

4. Assign the original repository as a new remote
   [upstream](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork).

```
$ git remote add upstream https://github.com/osrslogs/osrs-exchange
```

5. Install dependencies.

```
$ npm install
```

### Scripts

The `pacakge.json` file contains various scripts for common tasks:

| Script                  | Description                                  |
| ----------------------- | -------------------------------------------- |
| `npm install`           | Installs dependencies                        |
| `npm run build`         | Type-check and build with Typescript         |
| `npm run lint`          | Lint files with ESLint and Prettier          |
| `npm run lint:fix`      | Fix formatting and linting                   |
| `npm run test`          | Run unit tests with Jest                     |
| `npm run test:watch`    | Run unit tests in watch mode                 |
| `npm run test:coverage` | Generate a coverage report under `coverage/` |

## Submission guidelines

### Submitting an issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

You can file new issues by selecting from our [new issue templates](https://github.com/osrslogs/osrs-exchange/issues/new/choose) and filling out the issue template.

### Submitting a pull request

1. [Setup the workspace](###setup-the-workspace)
2. If you cloned a while ago, get the latest changes from upstream and update dependencies:

```
$ git checkout master
$ git pull upstream master
$ rm -rf node_modules
$ npm install
```

3. Create a new topic branch to contain your feature, change or fix:

```
$ git checkout -b <topic-branch-name>
```

4. Make your changes, including appropriate test cases, following our [coding rules](##coding-rules).
5. Commit your changes, following our [commit message convention](###commit-message-convention).

```
$ git commit -a
```

Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

6. Push your topic branch to GitHub:

```bash
$ git push origin <topic-branch-name>
```

7. [Open a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request#creating-the-pull-request) with clear title and description.
