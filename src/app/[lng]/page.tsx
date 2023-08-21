import "server-only"

import { ServerPage } from "$types/next"
import { generateI18nStaticParams } from "$i18n/helpers"

export const generateStaticParams = generateI18nStaticParams("/")

const Page: ServerPage = async() => {
  return <>

  </>
}

export default Page
