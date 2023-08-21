import "server-only"

import { generateI18nStaticParams } from "$i18n/helpers"
import { GenerateMetadata, ServerPage } from "$types/next"
import { getPath } from "$helpers/routes"
import { generateAlternates, mergeMetadata } from "$helpers/metadata"

import LoginForm from "$components/client/LoginForm"
import AuthBanner from "$components/client/AuthBanner"
import { getServerTranslations } from "$i18n/server"

export const generateStaticParams = generateI18nStaticParams("/login")

const Login: ServerPage = async({ params }) => {
  const { t } = await getServerTranslations(params.lng, ["login", "common"])

  return (
    <AuthBanner title={t("WELCOME")}>
      <LoginForm />
    </AuthBanner>
  )
}

export default Login

export const generateMetadata: GenerateMetadata = async({ params: { lng: currentLng } }, parent) => {
  const href = "/login"

  return await mergeMetadata({
    parent,
    currentLng,
    ns: ["login", "common"],
    metadata: {
      openGraph: {
        url: getPath({ siteUrlPrefix: true, href, lng: currentLng })
      },
      alternates: generateAlternates({ currentLng, href })
    }
  })
}
