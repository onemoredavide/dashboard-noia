## Images

All the static images are located in [`public/assets/images`](../../public/assets/images/).

### Converting to WebP

In order to convert them in webp format you should install [libwebp](https://developers.google.com/speed/webp/download) and then run:

```bash
npm run images:convert
```

All the images inside [`public/assets/images`](../../public/assets/images/) are then converted in webp format and the extension is appended to the original name, so that's easier for the `Image` component to retrieve the corresponding source:

```bash
image.jpg -> image.jpg.webp
```

# Image component

The [`Image`](../../src/components/client/Image.tsx) component is a flexible, efficient React component that renders an image with optional properties such as dimensions, alternate text, and lazy loading. The component also has the option to convert images to the WebP format, a modern image format that provides superior lossless and lossy compression for images on the web.

This component utilizes the Intersection Observer API to implement lazy loading, which defers loading of off-screen images until the user scrolls near them. This can significantly enhance the performance of your application, especially for pages with a lot of images.

It should be used just for local images inside [`public/assets/images`](../../public/assets/images/).

## Props

| Name          | Description                                       | Default Value | Required |
|---------------|---------------------------------------------------|---------------|----------|
| `src`         | The source path to the image                      | -             | Yes      |
| `width`       | The width of the image                            | -             | No       |
| `height`      | The height of the image                           | -             | No       |
| `alt`         | The alternate text for the image                  | `""`          | No       |
| `lazy`        | Whether to enable lazy loading of the image       | `true`        | No       |
| `webp`        | Whether to convert the image to WebP format       | `true`        | No       |
| `className`   | The CSS class name for the `picture` element      | -             | No       |
| `imgClassName`| The CSS class name for the `img` element          | -             | No       |


## Example
Here is an example of how to use the `Image` component:

```jsx
import Image from './Image';

function App() {
  return (
    <div className="App">
      <Image
        src="/path/to/image.jpg"
        width={500}
        height={300}
        alt="A sample image"
        lazy={true}
        webp={true}
        className="picture-class"
        imgClassName="img-class"
      />
    </div>
  );
}

export default App;
```


