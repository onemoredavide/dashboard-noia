import RootLayoutClientScripts from "$components/client/RootLayoutClientScripts"
import { DemoProvider } from "$components/client/helpers/DemoContext"
import { ErrorHandlersProvider } from "$components/client/helpers/ErrorHandlersContext"
import QueryWrapper from "$components/client/helpers/QueryWrapper"
import { I18nContextProvider } from "$i18n/client"
import { SupportedLanguage } from "$types/i18n"
import { FC, PropsWithChildren } from "react"

export const CustomProviders: FC<PropsWithChildren & {
  params: Record<string, string> & {lng: SupportedLanguage}
}> = ({ children, params }) => {
  const { lng } = params

  return (
    <QueryWrapper>
      <I18nContextProvider lng={lng}>
        <DemoProvider>
          <ErrorHandlersProvider>
            {children}
          </ErrorHandlersProvider>
        </DemoProvider>
      </I18nContextProvider>
      <RootLayoutClientScripts params={params} />
    </QueryWrapper>
  )
}
