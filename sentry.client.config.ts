// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"
import packageJson from "package.json"

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

declare global {
  interface Window {
    SENTRY_RELEASE: string
  }
}

if (process.env.NEXT_PUBLIC_WITH_SENTRY === "true") {
  window.SENTRY_RELEASE = `v${packageJson.version}`

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
    release: `v${packageJson.version}`,

    sampleRate: Number.parseFloat(process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE || "0")
  })
}
