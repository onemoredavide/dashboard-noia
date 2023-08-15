"use client"

import { FC, useEffect } from "react"
import { useClientTranslation } from "$i18n/client"
import { logSentryEvent } from "$helpers/sentry"

const Error: FC<{
  error: Error
  reset: () => void
}> = ({
  error,
  reset
}) => {
  const { t } = useClientTranslation("common")

  useEffect(() => {
    logSentryEvent(error, {
      level: "fatal"
    })
  }, [error])

  return (
    <div>
      <h1>500</h1>
      <h2>{ t("ERROR.GENERIC_ERROR") }</h2>
      <button onClick={(): void => reset()}>
        { t("ERROR.RETRY_BUTTON") }
      </button>
    </div>
  )
}

export default Error
