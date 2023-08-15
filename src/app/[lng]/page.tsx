import "server-only"

import { ServerPage } from "$types/next"
import { generateI18nStaticParams } from "$i18n/helpers"
import HomeHero from "$components/client/HomeHero"
import Image from "$components/client/Image"

export const generateStaticParams = generateI18nStaticParams("/")

const Page: ServerPage = async() => {
  return <>
    <HomeHero />
    <Image src={"example.jpeg"} alt={"hero"} lazy={false}/>
  </>
}

export default Page
