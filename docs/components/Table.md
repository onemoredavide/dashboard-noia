# Table Component

## Description

The [`Table`](../../src/components/client/Table.tsx) component is a dynamic and highly customizable component designed to display structured data. It supports custom row and column configuration, integrated selection of items, sorting functionality, customizable column widths, and more. The component also provides a loading state, which displays a spinner during data fetch operations.

## Props

| Name | Type / Signature | Description | Required |
| --- | --- | --- | --- |
| rows | `{ id: number, children: ReactNode[], onClick?: () => void }[]` | Array of objects representing each row in the table. Each row object has an `id`, an array of `children` representing the row's content, and an optional `onClick` handler. | Yes |
| columns | `{ id: string, label: string, fixed?: boolean, widthPercentage?: number, hideOverflow?: boolean }[]` | Array of objects representing each column in the table. Each column object has an `id`, a `label` for the column, and optional `fixed`, `widthPercentage`, and `hideOverflow` properties for styling and layout. | Yes |
| title | `string` | The title of the table. | No |
| autoLayout | `boolean` | If `true`, the table will automatically adjust its layout based on the content. If `false`, the table will use a fixed layout. Default is `false`. | No |
| count | `number` | The count of items being displayed in the table. If provided, this count will be displayed next to the title. | No |
| loading | `boolean` | If `true`, a spinner will be displayed indicating a loading state. Default is `false`. | No |
| sorterProps | `ListingSorterProps<RequestSorters, ResponseSorters>` | Prop to handle sorting functionality for table data. | No |
| selectionProps | `{ selectedItemIds: number[], updateItemSelection: (target: number \| "all", checked: boolean) => void }` | Prop for handling selection functionality in the table. | No |

## Implementation

The component uses React hooks like `useMemo` for memoizing the index of columns where overflow should be shown, and [`useClientTranslation`](../internationalization.md) for internationalization. The `Table` component ensures that the sum of all column `widthPercentage` props must equal 100, throwing an error if not.

It utilizes the `classnames` library for dynamic class name assignments based on the various prop states. The component uses conditional rendering techniques for optional components like selection checkboxes, sorting icons, and the spinner for loading state.

## Usage

```jsx
import Table from "$components/client/Table"

<Table
  columns={[{ id: '1', label: 'Name' }, { id: '2', label: 'Age', widthPercentage: 50 }]}
  rows={[{ id: 1, children: [<div>John</div>, <div>24</div>]}]}
  title="User Table"
  count={1}
/>
```

## Styling

The component leverages CSS Modules for styling, with styles defined in the [`Table.module.css`](../../src/styles/components/Table.module.css) file. It uses a combination of custom class names and Tailwind utility classes for style definitions.

Each element within the table component, such as the table wrapper, table, header, body, cells, etc., has a unique class name associated with it. This allows for a high degree of customization in terms of the component's visual presentation and layout. Furthermore, the component allows for column-specific styling options like `fixed` positioning, `widthPercentage`, and hiding overflow content.
