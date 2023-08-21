import { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import ReCAPTCHA from "react-google-recaptcha"
import { reCaptchaKeyV2 } from "$constants/env"
import { useClientTranslation, useI18n } from "$i18n/client"
import parse from "html-react-parser"
import styles from "$styles/components/ReCaptcha.module.css"

type UseReCaptcha = {
  checkReCaptcha: () => Promise<string>
  isSubmitted: boolean
  isV2: boolean
  enableV2: () => void
  disableV2: () => void
  renderReCaptcha: () => JSX.Element | null
  renderReCaptchaDisclaimer: () => JSX.Element
}

const useReCaptcha = (): UseReCaptcha => {
  const lng = useI18n(({ lng }) => lng)
  const { executeRecaptcha: executeReCaptcha } = useGoogleReCaptcha()
  const [reCaptchaToken, setReCaptchaToken] = useState<string>()
  const [showV2, setShowV2] = useState<boolean>(false)
  const [showReCaptchaDisclaimer, setShowReCaptchaDisclaimer] = useState<boolean>(false)
  const { t } = useClientTranslation()

  const onChangeReCaptcha = (value: string | null): void => {
    if (!value) {
      return
    }

    setReCaptchaToken(value)
  }

  if (!reCaptchaKeyV2) {
    throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_KEY_V2 env variable")
  }

  return {
    checkReCaptcha: async(): Promise<string> => {
      if (showV2) {
        if (reCaptchaToken) {
          return reCaptchaToken
        } else {
          throw new Error("Missing reCaptchaToken")
        }
      } else {
        if (executeReCaptcha) {
          const out = await executeReCaptcha()
          return out as string
        } else {
          throw new Error("Missing executeReCaptcha function")
        }
      }
    },
    isV2: showV2,
    isSubmitted: !!reCaptchaToken,
    enableV2: (): void => {
      setShowV2(true)
    },
    disableV2: (): void => {
      setShowV2(false)
    },
    renderReCaptcha: (): JSX.Element | null => {
      if (showV2) {
        if (!reCaptchaKeyV2) {
          throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_KEY_V2 env variable")
        }

        return <>
          <script src="https://www.google.com/recaptcha/api.js" async defer></script>
          <ReCAPTCHA
            sitekey={reCaptchaKeyV2}
            onChange={onChangeReCaptcha}
            size={"normal"}
            hl={lng}
            onExpired={(): void => setReCaptchaToken(undefined)}
            style={{ transform: "scale(1.1)" }}
            className={"flex items-center justify-center mt-6"}
          />
        </>
      } else {
        return null
      }
    },
    renderReCaptchaDisclaimer: (): JSX.Element => {
      return <div className={styles["recaptcha-disclaimer"]}>
        {t("RECAPTCHA.POLICY")}
        {
          !showReCaptchaDisclaimer &&
            <span className={"underline cursor-pointer ml-1"} onClick={(): void => setShowReCaptchaDisclaimer(true)}>
              {t("RECAPTCHA.LEARN_MORE_LABEL")}
            </span>
        }
        {
          showReCaptchaDisclaimer &&
            <div className={"mt-4"}>
              {parse(t("RECAPTCHA.LEARN_MORE"))}
              <span className={"underline cursor-pointer ml-1"} onClick={(): void => setShowReCaptchaDisclaimer(false)}>
                {t("RECAPTCHA.LEARN_LESS")}
              </span>
            </div>
        }
      </div>
    }
  }
}

export default useReCaptcha
