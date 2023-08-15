import "server-only"

import { ServerPage } from "$types/next"
import ErrorBoundaryWrapper from "$components/client/helpers/ErrorBoundaryWrapper"
import DemoErrors from "$components/client/DemoErrors"

const Page: ServerPage = async() => {
  return <>
    <ErrorBoundaryWrapper id="/demo/errorManager">
      <DemoErrors />
    </ErrorBoundaryWrapper>
  </>
}

export default Page
