import "server-only"

import GoogleButton from "$components/client/auth/GoogleButton"
import { generateI18nStaticParams } from "$i18n/helpers"
import { GenerateMetadata, ServerPage } from "$types/next"
import { getPath } from "$helpers/routes"
import { generateAlternates, mergeMetadata } from "$helpers/metadata"

export const generateStaticParams = generateI18nStaticParams("/login")

const Login: ServerPage = async() => {
  return (
    <div className="container my-4">
      <GoogleButton />
    </div>
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
