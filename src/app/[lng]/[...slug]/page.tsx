import "server-only"

import { ServerPage } from "$types/next"

import { notFound } from "next/navigation"

const Page: ServerPage = async() => {
  notFound()
}

export default Page
