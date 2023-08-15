# Sentry Integration Guide

This document provides an overview of the changes made for Sentry integration and how to configure and use it.

## :wrench: Configuration

Update your `.env.local` file with the new Sentry-related environment variables:

- `NEXT_PUBLIC_SENTRY_DSN`: Your Sentry Data Source Name (DSN). This will be provided by Sentry when you set up your project.
- `NEXT_PUBLIC_WITH_SENTRY`: This boolean variable will determine whether Sentry is enabled or not. Set this to `true` to enable Sentry.
- `NEXT_PUBLIC_SENTRY_SAMPLE_RATE`: This is a number between `0` and `1` that defines the percentage of sessions to be randomly selected for sending to Sentry. For example, `1` means that all sessions will be sent to Sentry, while `0.1` means that only 10% of sessions will be sent.

**Note:** Please ensure that the `.sentryclirc` file (which should contain your Sentry Auth Token) is added to your `.gitignore` file to prevent it from being committed to version control.

## :dart: Usage

### Tracking Errors

The [`@sentry/nextjs`](https://www.npmjs.com/package/@sentry/nextjs) library automatically tracks errors and performance in your Next.js application. Once the environment variables are set correctly, no additional action is needed to start tracking errors.

### Manual Error Logging

You can also manually log errors using the [`logSentryEvent`](../src/helpers/sentry.ts) function located in `src/helpers/sentry.ts`. This function takes in two parameters: `event` (the Error object) and [`context`](https://docs.sentry.io/platforms/javascript/guides/nextjs/enriching-events/context/#passing-context-directly) (additional context for the error).

```javascript
import { logSentryEvent } from '../helpers/sentry.ts'

try {
  // code that can throw an error
} catch (error) {
  logSentryEvent(error)

  // or with context

  logSentryEvent(error, {
    level: "warning",
    tags: {
      page: "page_name"
    }
  })
}
```

### Setting User Information
You can set user information in Sentry using the [`setSentryUser`](../src/helpers/sentry.ts) function, also located in `src/helpers/sentry.ts`. This can help you understand the impact of an issue, see who is affected, and more.

```javascript
import { setSentryUser } from '../helpers/sentry.ts'

// set user info
setSentryUser({
  id: 'user_id', // unique user id
  segment: 'user_segment' // free, paid, etc.
})

// clear user info
setSentryUser()
```
