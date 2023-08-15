# Icons

The [`Icon`](../../src/components/server/Icon.tsx) component is a simple and customizable React component for rendering SVG icons. It uses [react-inlinesvg](https://www.npmjs.com/package/react-inlinesvg) to inline SVGs so they can be styled with CSS. The size and CSS class of the icon can be configured through properties. The icon to be displayed is determined by the `name` property, which should correspond to an SVG file in the `/assets/icons/` directory.

All SVG icons are located in [`public/assets/icons`](../../public/assets/icons/).
It's suggested to have them inside square viewBox in order to have a standard sizing pattern across all icon, but a not square one won't create any sizing issue since their height is set as `auto` through CSS.
The best way to color them easily and consistently is to set their fill or stroke to `currentColor`, so they'll inherit their container text color without requiring specific CSS.

## Props
| Name       | Description                                        | Default Value | Required |
|------------|----------------------------------------------------|---------------|----------|
| `name`     | The name of the icon to be displayed               | -             | Yes      |
| `className`| The CSS class name for the `SVG` element           | -             | No       |
| `size`     | The width and height of the icon in pixels         | 24            | No       |

## Example
Here is an example of how to use the `Icon` component:

```jsx
import Icon from './Icon';

function App() {
  return (
    <div className="App">
      <Icon
        name="my-icon"
        className="my-icon-class"
        size={32}
      />
    </div>
  );
}

export default App;
```

