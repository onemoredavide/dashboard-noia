### Path aliases

Imports can be confusing and error prones if we use relative paths, so we can define some [path aliases](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) inside [`tsconfig.json`](../tsconfig.json):

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "$constants/*": ["constants/*"],
      "$context/*": ["context/*"],
      "$components/*": ["components/*"],
      "$helpers/*": ["helpers/*"],
      "$hooks/*": ["hooks/*"],
      "$sdk": ["sdk/index.ts"],
      "$styles/*": ["styles/*"],
      "$types/*": ["types/*"]
    }
  }
}
```

**Important:** `baseUrl` is mandatory when using the `paths` object.
This way we can import modules by using absolute paths without worrying to change paths if we move files:

```ts
import { UsersService } from "$sdk"
import Button from "$components/Button"
import useAuth from "$hooks/useAuth"
```
