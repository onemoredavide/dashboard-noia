import "server-only"

import { ServerPage } from "$types/next"
import { generateI18nStaticParams } from "$i18n/helpers"
import SubscribablePlansListing from "$components/client/listing/Demo"

export const generateStaticParams = generateI18nStaticParams("/demo/listing")

const Page: ServerPage = async() => {
  return <SubscribablePlansListing />

}

export default Page
