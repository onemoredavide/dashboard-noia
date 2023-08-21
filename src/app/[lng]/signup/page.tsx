import "server-only"

import { generateI18nStaticParams } from "$i18n/helpers"
import { GenerateMetadata, ServerPage } from "$types/next"
import { getPath } from "$helpers/routes"
import { generateAlternates, mergeMetadata } from "$helpers/metadata"

import SignupForm from "$components/client/SignupForm"
import AuthBanner from "$components/client/AuthBanner"
import { getServerTranslations } from "$i18n/server"

export const generateStaticParams = generateI18nStaticParams("/signup")

const Login: ServerPage = async({ params }) => {
  const { t } = await getServerTranslations(params.lng, ["signup", "common"])

  return (
    <AuthBanner title={t("GET_STARTED")}>
      <SignupForm />
    </AuthBanner>
  )
}

export default Login

export const generateMetadata: GenerateMetadata = async({ params: { lng: currentLng } }, parent) => {
  const href = "/signup"

  return await mergeMetadata({
    parent,
    currentLng,
    ns: ["signup", "common"],
    metadata: {
      openGraph: {
        url: getPath({ siteUrlPrefix: true, href, lng: currentLng })
      },
      alternates: generateAlternates({ currentLng, href })
    }
  })
}
