// Importing necessary modules from react, react-testing-library, and a custom provider
import { FC, PropsWithChildren, ReactElement } from "react"
import { render, RenderOptions, renderHook, Queries, queries } from "@testing-library/react"
import { CustomProviders } from "../src/hocs/CustomProviders"

// Creating a wrapper component for providing custom providers with specific parameters
const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    // The 'CustomProviders' component is used with a 'lng' parameter set to 'it'
    <CustomProviders params={{ lng: "it" }}>
      {children}
    </CustomProviders>
  )
}

// A custom render function that wraps the UI component with our custom wrapper
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> => render(ui, { wrapper: Wrapper, ...options })

// A custom renderHook function that wraps the function with our custom wrapper
const customRenderHook = <
Result,
Props,
Q extends Queries = typeof queries,
Container extends Element | DocumentFragment = HTMLElement,
BaseElement extends Element | DocumentFragment = Container,
>(
    fn: Parameters<typeof renderHook<Result, Props, Q, Container, BaseElement>>[0],
    options?: Omit<Parameters<typeof renderHook<Result, Props, Q, Container, BaseElement>>[1], "wrapper">,
  ): ReturnType<typeof renderHook<Result, Props, Q, Container, BaseElement>> => {
  return renderHook<Result, Props, Q, Container, BaseElement>(fn, { wrapper: Wrapper, ...options })
}

// Exporting the custom renderHook function as 'renderHook'
export { customRenderHook as renderHook }
// Exporting the custom render function as 'render'
export { customRender as render }
// Re-exporting all exports from "@testing-library/react" so they can be imported from here
export * from "@testing-library/react"
