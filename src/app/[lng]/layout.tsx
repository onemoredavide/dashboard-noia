import "server-only"

import "$styles/globals.css"
import { dir } from "i18next"
import Navbar from "$components/server/Navbar"
import { FC, PropsWithChildren } from "react"
import Footer from "$components/server/Footer"
import Cookies from "$components/client/cookie/Cookies"
import { getPath } from "$helpers/routes"
import { generateAlternates, mergeMetadata } from "$helpers/metadata"
import { GenerateMetadata, PageParams } from "$types/next"
import ErrorBoundaryWrapper from "$components/client/helpers/ErrorBoundaryWrapper"
import { CustomProviders } from "src/hocs/CustomProviders"

const RootLayout: FC<PropsWithChildren<PageParams>> = ({ children, params }) => {
  const { lng } = params

  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <CustomProviders params={params}>
          <Navbar />
          <main>
            <ErrorBoundaryWrapper id="root-layout">
              {children}
            </ErrorBoundaryWrapper>
          </main>
          <Footer />
          <Cookies />
        </CustomProviders>
      </body>
    </html>
  )
}

export default RootLayout

export const generateMetadata: GenerateMetadata = async({ params: { lng: currentLng } }, parent) => {
  const href = "/"

  return await mergeMetadata({
    currentLng,
    ns: ["index", "common"],
    parent,
    metadata: {
      icons: ["/favicon.ico"],
      themeColor: "#000000",
      openGraph: {
        type: "website",
        images: ["/logo.jpg"],
        url: getPath({ siteUrlPrefix: true, href, lng: currentLng })
      },
      twitter: {
        card: "summary",
        images: ["/logo.png"]
      },
      alternates: generateAlternates({ currentLng, href })
    }
  })
}
