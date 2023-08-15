# 📚 Documentation for Google ReCAPTCHA Integration

This document describes the steps for configuring and using the newly integrated Google ReCAPTCHA feature.

## 🔑 Configuration

We've added new environment variables to the `.env.local` file. You must set these variables in your environment for the ReCAPTCHA feature to work:

- `NEXT_PUBLIC_RECAPTCHA_KEY_V2`: Your site key for ReCAPTCHA v2, provided by Google.
- `NEXT_PUBLIC_RECAPTCHA_KEY_V3`: Your site key for ReCAPTCHA v3, provided by Google.

You can generate these keys from the [Google ReCAPTCHA Admin](https://www.google.com/recaptcha/admin) console. Remember to add your domain in the console settings.

## 👩‍💻 How to use

1. **Using the `withReCaptcha` Higher-Order Component**

To protect a React component with ReCAPTCHA, you can wrap it with the `withReCaptcha` higher-order component (HOC). Here's a basic example:

```jsx
import withReCaptcha from '$hocs/withReCaptcha'

const MyProtectedComponent = () => {
  // your component code
}

export default withReCaptcha(MyProtectedComponent)
```

### Example
```jsx
"use client"

import { useClientTranslation } from "$i18n/client"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "./Button"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import TLink from "./TLink"
import styles from "$styles/components/AuthForm.module.css"
import { login } from "sdk"
import { PASSWORD_MIN_LENGTH } from "$constants/login"
import useAuth from "$stores/auth"
import Alert from "./Alert"
import { captureException, withMinimumDuration } from "$helpers/utils"
import useReCaptcha from "$hooks/useReCaptcha"
import withReCaptcha from "$hocs/withReCaptcha"

const LoginForm: FC = () => {
  const { t } = useClientTranslation("login")
  const onLogin = useAuth(({ onLogin }) => onLogin)
  const [requestError, setRequestError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const {
    renderReCaptcha,
    renderReCaptchaDisclaimer,
    checkReCaptcha,
    isV2: isV2ReCaptcha,
    isSubmitted: isReCaptchaSubmitted,
    enableV2: enableV2ReCaptcha
  } = useReCaptcha()

  const onSubmit = handleSubmit(async(formData) => {
    setIsLoading(true)
    try {
      const { data, status } = await withMinimumDuration(login)({
        ...formData,
        mfaCode: null,
        recaptchaToken: await checkReCaptcha()
      })
      if (status === 200 && data.data.user.admin) {
        onLogin(data.data.user)
      } else if (status === 200) {
        setRequestError(t("API_ERRORS.USER_NOT_ALLOWED"))
      } else if (status === 400 && data.code === "RECAPTCHA_NOT_VALID") {
        setRequestError(t(`API_ERRORS.${data.code}_${isV2ReCaptcha ? "V2" : "V3"}`))
        enableV2ReCaptcha()
      } else if (status === 401 || status === 429) {
        setRequestError(t(`API_ERRORS.${data.code}`))
      } else {
        throw data
      }
    } catch (error) {
      setRequestError(t("API_ERRORS.GENERIC_ERROR"))
      captureException(error)
    } finally {
      setIsLoading(false)
    }
  })

  return <>
    {
      !!requestError &&
        <Alert icon={"alert-circle"} theme={"danger"}>
          {requestError}
        </Alert>
    }
    <form onSubmit={onSubmit} noValidate>
      <Input
        label={"E-mail"}
        type={"email"}
        disabled={isLoading}
        autoComplete={"username"}
        error={errors.email?.message}
        {
          ...register("email", {
            required: t("FORM_ERRORS.EMAIL") || undefined,
            pattern: { value: /\S+@\S+\.\S+/, message: t("FORM_ERRORS.EMAIL") }
          })
        }
        className={"mb-4"}
      />
      <PasswordInput
        label={"Password"}
        error={errors.password?.message}
        disabled={isLoading}
        {
          ...register("password", {
            required: t("FORM_ERRORS.PASSWORD_REQUIRED") || undefined,
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: t("FORM_ERRORS.PASSWORD_MIN_LENGTH", { minLength: PASSWORD_MIN_LENGTH })
            }
          })
        }
      />
      {renderReCaptcha()}
      <div className={styles["auth-form__footer"]}>
        <TLink href={"/recover-account"}>
          {t("FORGOT_PASSWORD")}
        </TLink>
        <Button type={"submit"} loading={isLoading} disabled={isV2ReCaptcha && !isReCaptchaSubmitted}>{t("LOGIN_BUTTON")}</Button>
      </div>
      <hr className={"my-4"}/>
      {renderReCaptchaDisclaimer()}
    </form>
  </>
}

export default withReCaptcha(LoginForm)
```

