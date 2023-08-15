# FilterBar Component

[`FilterBar`](../../src/components/client/filters/FilterBar.tsx) is a React component which provides a UI for searching and filtering listings.

## Props

Here is a table detailing the props for the [`FilterBar`](../../src/components/client/filters/FilterBar.tsx) component:

| Name               | Types/Signature                                                                                                            | Description                                                                                                                          | Required |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|----------|
| search             | `string`                                                                                                                    | The current search text.                                                                                                             | Yes      |
| setSearch          | `(search: string) => void`                                                                                                  | A function to update the current search text.                                                                                        | Yes      |
| selectedFilters    | `{filterOrder: Array<{ index: number, field: string, enabled: boolean }>, apiFilters: Record<string, any>}`                  | An object representing the currently selected filters, including the order of the filters and the current state of each filter.      | Yes      |
| availableFilters   | `Array<ExcludeByKey<NonNullable<ResponseFilters>[number], ExcludeFiltersArray[number]>>`                                    | An array representing the available filters that can be applied.                                                                     | Yes      |
| addFilter          | `<FilterId extends Keys<Omit<NonNullable<RequestFilters>, ExcludeFiltersArray[number]>>>(payload: { field: FilterId, filter: NonNullable<NonNullable<RequestFilters>[FilterId]>[number] }) => void` | A function that adds a filter to the list of selected filters. The payload object should contain the field identifier and the filter to be added. | Yes      |
| updateFilter       | `<FilterId extends Keys<Omit<NonNullable<RequestFilters>, ExcludeFiltersArray[number]>>>(payload: { field: FilterId, filter: NonNullable<NonNullable<RequestFilters>[FilterId]>[number] }, filterOrderIndex: number) => void` | A function that updates a filter in the list of selected filters. The payload object should contain the field identifier and the updated filter, and the filterOrderIndex is the position of the filter to be updated in the selected filters list. | Yes      |
| deleteFilter       | `(filterOrderIndex: number) => void`                                                                                         | A function that deletes a filter from the list of selected filters. The filterOrderIndex is the position of the filter to be deleted in the selected filters list.                          | Yes      |
| toggleFilter       | `(filterOrderIndex: number) => void`                                                                                         | A function that toggles a filter in the list of selected filters. The filterOrderIndex is the position of the filter to be toggled in the selected filters list.                             | Yes      |

## Usage

The component is used to create a filter bar with a search input field, and the filter editor for each selected filter. The filters are presented in the order defined by the `filterOrder` property of `selectedFilters`.

It also displays an additional [`FilterEditor`](./FilterEditor.md) component at the end for adding new filters.

## Example

```jsx
import FilterBar from "$components/client/filters/FilterBar"

<FilterBar
  search={currentSearch}
  setSearch={updateSearch}
  selectedFilters={selectedFiltersData}
  availableFilters={availableFiltersData}
  addFilter={addFilterFunc}
  updateFilter={updateFilterFunc}
  deleteFilter={deleteFilterFunc}
  toggleFilter={toggleFilterFunc}
/>
```

In the example above:

- `currentSearch` is a string representing the current search text.
- `updateSearch` is a function that updates the search text.
- `selectedFiltersData` is an object representing the currently selected filters.
- `availableFiltersData` is an array representing the available filters.
- `addFilterFunc`, `updateFilterFunc`, `deleteFilterFunc`, and

 `toggleFilterFunc` are functions for managing filters.

Please refer to the `ListingFilterProps` and `ListingSearchProps` types for the structure of these props.

## Styles

This component uses module CSS for styling. The styles are defined in the [`FilterBar.module.css`](../../src/styles/components/filters/FilterBar.module.css) file in the `components/filters` directory. The styles object is imported as `styles`, and class names are accessed as properties of this object.

## Implementation Details

Internally, the `FilterBar` component uses React's `useState` and `useEffect` hooks to manage the state of the search text and to debounce search input.

The `FilterBar` also uses the `useMemo` hook to derive `parsedFilters` from `availableFilters`. `parsedFilters` is an object that includes `fieldOptions`, an array of options for the select input, and `fieldSchemas`, an object with filter schema details.

Each filter is represented by a [`FilterEditor`](./FilterEditor.md) component. This component receives several props from `FilterBar`, including a `className` for styling, `defaultValues` for initial filter state, and actions for updating, deleting, and toggling the filter.

