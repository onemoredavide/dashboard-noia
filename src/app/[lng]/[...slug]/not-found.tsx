import "server-only"
import { ServerPage } from "$types/next"
import HomeHero from "$components/client/HomeHero"

const Page: ServerPage = async() => {

  return <>
    <h1>Not found</h1>

    <HomeHero />
  </>
}

export default Page
