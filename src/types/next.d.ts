import { FC, ReactElement } from "react"
import { Metadata, ResolvingMetadata } from "next"
import { SupportedLanguage } from "./i18n"

// TODO, pending NextJS types
// eslint-disable-next-line @typescript-eslint/ban-types
export type PageParams<T extends object = {}> = { params: Record<string, string> & { lng: SupportedLanguage } & T }

// TODO, pending NextJS types
interface AsyncComponent<Props> extends Omit<FC<Props>, "call"> {
  (props: Props): Promise<ReactElement | null>
}

// TODO, pending NextJS types
export type ServerPage<Props = object> = AsyncComponent<Props & PageParams>

// TODO, pending NextJS types
export type GenerateMetadata = (options: PageParams, parent: ResolvingMetadata) => Promise<Metadata>
