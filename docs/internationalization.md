# Internationalization
The project uses [next-i18next](https://github.com/isaachinman/next-i18next), a Next.js plugin based on [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/).

## Getting Started (client side)

1. **Importing useClientTranslation**: This hook is imported from `$i18n/client`.

    ```jsx
    import { useClientTranslation } from "$i18n/client"
    ```

2. **Using useClientTranslation**: The hook is invoked with the [namespace](../src/types/i18n.d.ts). The hook returns an object with the `t` function which is used to fetch localized messages.

    ```jsx
    const { t } = useClientTranslation("common")
    ```

3. **Displaying Localized Messages**: The `t` function retrieves localized strings by key. The key is a string that is used to identify the message in the translation files.
    ```jsx
    <h2>{ t("HOME.TITLE") }</h2>
    ```

## Getting Started (server side)

1. **Importing getServerTranslations**: This hook is imported from `$i18n/server`.

    ```jsx
    import { getServerTranslations } from "$i18n/server"
    ```

2. **Using getServerTranslations**: The hook is invoked with the [namespace](../src/types/i18n.d.ts). The hook returns an object with the `t` function which is used to fetch localized messages.

    ```jsx
    const { t } = await getServerTranslations("it", "common")
    ```

3. **Displaying Localized Messages**: The `t` function retrieves localized strings by key. The key is a string that is used to identify the message in the translation files.
    ```jsx
    <h2>{ t("HOME.TITLE") }</h2>
    ```

### Configuration

Page templates are in the [`src/app`](../src/app/) directory and they must have their corresponding translation file in [`src/i18n/locales`](../src/i18n/locales/). All pages share common translations that can be found in the same directory, inside `common.json`, that also acts as a fallback when page specific files are not present.

### Paths translation (static paths only)

In order to translate a page path, [`src/i18n/config.js`](../src/i18n/config.js) exports a an object with `paths` property, in which all translations can be set.
The key corresponds to the page path, following the `pages` directory, so the key for nested pages must be in the `path/to/page-name` format.

```typescript
{
  paths: {
    "/about": {
      it: "/about",
      en: "/about"
    } // should be omitted
  }
}
```

Based on the `paths` object, all rewrites and redirects are automatically generated and passed to `next.config.js`.

**Getting translated paths**

The function `getPath`, defined in [`src/helpers/routes.ts`](../src/helpers/routes.ts), returns the translated path of a page based on the passed language.
It accepts an object with the following properties:


| Name           | Type                | Description                                                         | Default Value | Required |
| -------------- | ------------------- | ------------------------------------------------------------------- | ------------- | -------- |
| href           | [Href](../src/types/routes.ts)                | The original URL path and query parameters as a string.             | None          | Yes      |
| lng            | [SupportedLanguage](../src/types/i18n.d.ts)   | The language that the path should be translated to.                 | None          | Yes      |
| siteUrlPrefix  | boolean             | A boolean indicating whether to prefix the URL with the site URL.   | False         | No       |
| replaceParams  | [ReplaceParams](../src/types/routes.ts) | An optional object mapping keys to replace in the URL with values.  | None          | No       |


```tsx
// static path for default locale
getPath({ href: "/login", lng: "it" })
```
