import * as Sentry from "@sentry/nextjs"

export const logSentryEvent = (event: Error, context: Parameters<typeof Sentry.captureException>[1]): void => {
  Sentry.captureException(event, context)
}

// ? https://docs.sentry.io/platforms/javascript/guides/nextjs/enriching-events/identify-user/
type SetSentryUserParams = {
  id: string|number // Your internal identifier for the user.
  segment?: string // The user segment, for apps that divide users in user segments.
}

export const setSentryUser = (user?: SetSentryUserParams): void => {
  if (!user) {
    Sentry.setUser(null)
    return
  }

  Sentry.setUser({
    id: `${user.id}`,
    segment: user.segment
  })
}
