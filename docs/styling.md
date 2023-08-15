
## Styling

The project uses [tailwindcss](https://tailwindcss.com/) under the hood, powered by [PostCSS](https://postcss.org/).

### Configuration

All base configuration options are in `tailwind.config.js` (see the [docs](https://tailwindcss.com/docs/theme)).
PostCSS plugins are installed as dev dependencies and are configured inside `postcss.config.js`.

**Note:** PostCSS is not a preprocessor, but a tool for transforming CSS, so all files must have the `.css` extension. You can still use preprocessor features by installing PostCSS plugins like [postcss-mixins](https://github.com/postcss/postcss-mixins).

Every file is inside the [`src/styles`](../src/styles/) directory.
The [`globals.css`](../src/styles/globals.css) file is imported inside [`src/app/[lng]/layout.tsx`](../src/app/%5Blng%5D/layout.tsx) and exposes all global styles, including `tailwind` classes, that can be used everywhere.
The [`components`](../src/styles/components/) and [`pages`](../src/styles/pages/) directories contain styles relative to single components or pages.

**Note:** Every file inside this folders must be named in the format `Component.module.css`, so it can be imported inside a tsx file and its styles are used only in pages that contain that specific component.

```
| styles
|-- components
|---- Button.module.css
|-- pages
|---- Home.module.css
|-- globals.css
```

### Usage

All files can use both standard CSS and tailwind syntax.

**Button.module.css**

```css
.container {
  @apply border-0 bg-black text-white;
  width: 100%;
}
```

**Button.tsx**

```tsx
import styles from "$styles/components/Button.module.css"

const Button = ({
  children
}) => {
  return (
    <button className={styles.container}>
      {children}
    </button>
  )
}
```

As previously said, you can also use global and `tailwind` classes inside your components. During the build phase, the compiler will take care of purging unused ones:

```tsx
const Component = () => {
  return (
    <div className="w-full global-class">...</div>
  )
}
```

### Classnames utility

In order to easily combine classes without interpolating strings you can use [classnames](https://github.com/JedWatson/classnames):

```tsx
import styles from "$styles/components/Button.module.css"
import classNames from "classnames"

const Button = ({
  children,
  className
}) => {
  return (
    <button className={classNames(styles.container, className)}>
      {children}
    </button>
  )
}
```

**Advanced usage**

See documentation to discover all possible combinations.

```tsx
import styles from "$styles/components/Button.module.css"
import classNames from "classnames"

type Props = {
  children: ReactNode
  className?: string
  outline?: boolean
  disabled?: boolean
  theme: "primary" | "secondary"
}

const Button = ({
  children,
  className,
  outline,
  disabled,
  theme = "primary"
}) => {
  return (
    <button className={classNames(
      styles.container,
      className,
      outline && styles.containerOutline,
      styles[`container${theme}`],
      {
        [styles.containerDisabled]: disabled
      }
    )}>
      {children}
    </button>
  )
}
```
