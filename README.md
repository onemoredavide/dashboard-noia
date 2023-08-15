# SF Next Template

## Table of contents

## Documentation
1. [Environment variables](./docs/environment-variables.md)
2. [Internationalization](./docs/internationalization.md)
3. [Styling](./docs/styling.md)
4. [Managing Metadata](./docs/metadata.md)
5. [Import/Relative paths](./docs/import.md)
6. [GIT hooks](./docs/git-hooks.md) *WIP*
7. [SDK](./docs/api.md)
8. Components
    1. [Icons](./docs/components/icons.md)
    2. [Images](./docs/components/images.md)
    2. [TLink](./docs/components/link.md)
9. [Sentry](./docs/sentry.md)
10. [Google ReCAPTCHA](./docs/recaptcha.md)
11. [SSE](./docs/sse.md)
12. [Error handling](./docs/error-handling.md)
13. [Listing](./docs/listing.md)
14. Testing
    1. [End to end tests](./docs/e2e.md)
    2. [Unit tests](./docs/unit-test.md)
15. [tsconfig](./docs/tsconfig.md)
16. [GH Actions](./docs/gh-actions.md)

## Setup
1. Install the dependencies
```bash
npm ci
```
2. copy the `.env.sample` file to `.env.local` (more info about the environment variables in the [Environment Variables](./environment-variables.md) section)
```bash
cp .env.sample .env.local
```

## Development
Run the development server:
```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

## Build
Optimize and build the project:
```bash
npm run build
```

You can test the built version by running:
```bash
npm start
```
Open http://localhost:3000 with your browser to see the result.
