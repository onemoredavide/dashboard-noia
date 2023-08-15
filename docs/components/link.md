# TLink

The [`TLink`](../../src/components/client/TLink.tsx) component manages both internal and external links and it is a customized version of Next.js's `Link` component, extended to support internationalization (i18n). This component allows routing among different locales in your Next.js application. It uses the `$i18n` hook for fetching the current locale, and the `getPath` helper function to generate the appropriate path.

**Important:** Never put an `<a />` tag inside this component.

## Props

| Name           | Description                                        | Default Value | Required |
|----------------|----------------------------------------------------|---------------|----------|
| [`href`](../../src/types/routes.ts)         | The destination path of the link                   | -             | Yes      |
| [`locale`](../../src/types/i18n.d.ts)       | The locale in which to render the link             | -             | No       |
| [`replaceParams`](../../src/types/routes.ts)| An object of params to replace in the `href`       | -             | No       |
| `...props`     | Other properties supported by `next/link` and `<a>`| -             | No       |

## Example

```tsx
import TLink from './TLink';

function App() {
  return (
    <div className="App">
      {/* Internal static path */}
      <Link href="about">...</Link>

      {/* Internal dynamic path */}
      <Link
        href="dynamic/:slug"
        hrefParams={{ slug: "page-name" }}
      >...</Link>

      {/* Internal path for specific locale */}
      <Link
        href="about"
        locale="en"
      >...</Link>

      {/* External url */}
      <Link
        href="https://github.com"
        target="_blank"
        rel="nofollow noreferrer"
      >...</Link>

      {/* Mailto url */}
      <Link
        href="mailto:info@soluzionifutura.it"
      >...</Link>
    </div>
  );
}

export default App;
```

**Note:** a mailto url won't use an `<a />` tag, but it will be wrapped in a `<span />` that handles the click and opens the mail externally. Not exposing a `mailto:` href is a measure to prevent bot spamming.
