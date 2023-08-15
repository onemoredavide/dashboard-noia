# Pagination Component Documentation

## General Description

The [`Pagination`](../../src/components/client/Pagination.tsx) component is a flexible and user-friendly interface for handling pagination in applications. It allows users to navigate between different pages of content. It includes a paginator control for previous and next navigation along with a count label showing the range of displayed items.

## Props

| Name | Type / Signature | Description | Required |
| --- | --- | --- | --- |
| paginator | `{ offset: number, limit: number }` | An object containing the `offset` and `limit` for the current page. The `offset` represents the starting point of the current page, and `limit` is the maximum number of items on a page. | Yes |
| disable | `{ prev: boolean, next: boolean }` | An object containing `prev` and `next` boolean properties to disable the respective navigation buttons. | Yes |
| prevPage | `() => void` | Callback function to be invoked when the Previous button is clicked. | Yes |
| nextPage | `() => void` | Callback function to be invoked when the Next button is clicked. | Yes |
| className | `string` | A string representing any additional CSS classes to be applied to the component. | No |
| count | `number` | The total number of items across all pages. | Yes |

## Implementation

The [`Pagination`](../../src/components/client/Pagination.tsx) component uses the [`useClientTranslation`](../internationalization.md) hook for internationalization, specifically within the scope of 'pagination'. It uses the [`html-react-parser`](https://www.npmjs.com/package/html-react-parser) package to parse and convert the label string into a valid React component.

## Usage

```jsx
import Pagination from "$components/client/Pagination"
//...

<Pagination
  paginator={{ offset: 0, limit: 10 }}
  disable={{ prev: true, next: false }}
  prevPage={() => /* handle prev page */}
  nextPage={() => /* handle next page */}
  count={50}
/>
```

## Styling

The component uses CSS Modules for styling with the styles defined in the [`Pagination.module.css`](../../src/styles/components/Pagination.module.css) file. It leverages a combination of custom styles along with the `classnames` library for conditional and dynamic styling based on component props. The `Button` and `Icon` components, incorporated within [`Pagination`](../../src/components/client/Pagination.tsx), provide additional styling and visual representation.
