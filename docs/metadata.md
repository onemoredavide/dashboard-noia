# Managing Metadata

### 1. generateMetadata
Export a function named generateMetadata from your page. The function **MUST** use the helper function `mergeMetadata` to merge the current metadata with the parent's metadata. This allows you to inherit metadata from a parent page or to override it with page-specific metadata.

```javascript
export const generateMetadata: GenerateMetadata = async({ params: { lng: currentLng } }, parent) => {
  ...
  return await mergeMetadata({
    currentLng,
    ns: ["index", "common"], // Namespace(s) to be used in the metadata
    parent,
    metadata: {
      ...
    }
  })
}
```

### 2. mergeMetadata function
This is an asynchronous function that merges the current metadata object with metadata from a parent object, if it exists. This allows you to inherit metadata from a parent page or to override it with page-specific metadata. It also allows for the use of localized strings for metadata such as title, description, and application name. [src/helpers/metadata.ts](../src/helpers/metadata.ts)

| Name        | Description                                                       | Type                          | Required |
|-------------|-------------------------------------------------------------------|-------------------------------|----------|
| parent      | The parent's metadata object to be resolved                       | ResolvingMetadata             | Yes      |
| metadata    | The metadata object to be merged with the parent                  | Metadata                      | Yes      |
| currentLng  | The current language used to fetch translations                   | [SupportedLanguage](../src/types/i18n.d.ts)             | Yes      |
| ns          | Namespace(s) to be used in the metadata                           | [Namespace](../src/types/i18n.d.ts) or [Namespace](../src/types/i18n.d.ts) array  | Yes      |


### Example
```javascript
export const generateMetadata: GenerateMetadata = async({ params: { lng: currentLng } }, parent) => {
  const href = "/"

  return await mergeMetadata({
    currentLng,
    ns: ["index", "common"],
    parent,
    metadata: {
      icons: ["/favicon.ico"],
      themeColor: "#000000",
      openGraph: {
        type: "website",
        images: ["/logo.jpg"],
        url: getPath({ siteUrlPrefix: true, href, lng: currentLng })
      },
      twitter: {
        card: "summary",
        images: ["/logo.png"]
      },
      alternates: generateAlternates({ currentLng, href })
    }
  })
}
```
