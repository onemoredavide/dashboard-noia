export const GET = (): Response => {
  return new Response("Auth Required.", {
    status: 401,
    headers: {
      "WWW-authenticate": "Basic realm=\"Secure Area\""
    }
  })
}
