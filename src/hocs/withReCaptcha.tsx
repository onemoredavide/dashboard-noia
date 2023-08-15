import { FC, PropsWithChildren } from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import { reCaptchaKeyV3 } from "$constants/env"

export const withReCaptcha = <P extends PropsWithChildren>(Component: FC<P>): FC<P> => {
  const Wrapper: FC<P> = (props) => {
    if (!reCaptchaKeyV3) {
      throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_KEY_V3 env variable")
    }

    return <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKeyV3}>
      <Component {...props}/>
    </GoogleReCaptchaProvider>
  }

  return Wrapper
}

export default withReCaptcha
