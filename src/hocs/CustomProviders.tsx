import RootLayoutClientScripts from "$components/client/RootLayoutClientScripts"
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
        <ErrorHandlersProvider>
          {children}
        </ErrorHandlersProvider>
      </I18nContextProvider>
      <RootLayoutClientScripts params={params} />
    </QueryWrapper>
  )
}
