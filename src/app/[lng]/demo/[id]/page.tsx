import "server-only"

import { PageParams, ServerPage } from "$types/next"

// ? NOTE: We are not exporting `generateStaticParams` here because we don't need it (this is a dynamic route)

const Page: ServerPage<PageParams<{id: string}>> = async({ params: { id } }) => {
  return <>
    <h1>Demo: {id}</h1>
  </>
}

export default Page
