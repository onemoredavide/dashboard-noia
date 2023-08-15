## Environment variables

The following environment variables are defined in the [`.env.sample`](../.env.sample) file, follow the [setup guide](./setup.md) to configure the project.

|Name|Description|Default value|
|---|---|---|
|`AUTH_USER`|The username to use for basic authentication [code](../src/middleware.ts)||
|`AUTH_PWD`|The password to use for basic authentication [code](../src/middleware.ts)||
|`NEXT_PUBLIC_GTAG_ID`|The Google Tag Manager ID to use for the `gtag` script [code](../src/components/client/RootLayoutClientScripts.tsx)||
|`NEXT_PUBLIC_GSI_ID`|The Google ID to use for google auth [code](../src/components/client/auth/GoogleButton.tsx)||
|`NEXT_PUBLIC_LANG_COOKIE_MAX_AGE`|The max age of the language cookie in seconds|`31536000` (1 year)|
|`NEXT_PUBLIC_SITE_URL`|The URL of the site|`http://localhost:3000`|
|`REVALIDATE_TOKEN`|Token used to [revalidate ISG pages](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation) through Next.js [API routes](https://nextjs.org/docs/api-routes/introduction) [code](../src/app/api/revalidate/route.ts)|token|
