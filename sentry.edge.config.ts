// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"
import packageJson from "package.json"

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

if (process.env.NEXT_PUBLIC_WITH_SENTRY === "true") {
  process.env.SENTRY_RELEASE = `v${packageJson.version}`

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
    release: `v${packageJson.version}`,

    sampleRate: Number.parseFloat(process.env.NEXT_PUBLIC_SENTRY_SAMPLE_RATE || "0")
  })
}
