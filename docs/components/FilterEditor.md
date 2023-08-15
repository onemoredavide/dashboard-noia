# FilterEditor Component

The [`FilterEditor`](../../src/components/client/filters/FilterEditor.tsx) component is a functional component in React. It provides an interface for creating, updating, and deleting filters on a list of items. The component includes a button that, when clicked, opens a popover containing the [`FilterPopover`](./FilterPopover.md) component, which is used to edit the filter details.

The [`FilterEditor`](../../src/components/client/filters/FilterEditor.tsx) component is generic and can be used with any type of filter that conforms to the provided types.

## Props

The [`FilterEditor`](../../src/components/client/filters/FilterEditor.tsx) component accepts the following props:

| Name               | Types/Signature                                                                                                                        | Description                                                                                                                        | Required |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|----------|
| fieldOptions       | `SelectOption<string>[]`                                                                                                                | An array of options for the field dropdown in the filter form. Each option has a `label` (displayed in the UI) and a `value` (used in the request). | Yes      |
| fieldSchemas       | `Record<string, ListingResponseFilters[number]["schema"] & { enum: ListingResponseFilters[number]["values"] }>`                        | An object that maps from field identifiers to filter schemas. Each schema describes the allowed structure and values for a filter. | Yes      |
| className          | `string`                                                                                                                                | An optional string that can be used to add custom classes to the outer div of the component.                                        | No       |
| defaultValues      | `FilterEditorDefaultValues` or `null`                                                                                                   | The default values for the filter form. If this is null, the form will be empty. Otherwise, it will be filled with these values.    | Yes      |
| enabled            | `boolean`                                                                                                                               | This prop is only required if `defaultValues` is provided. It indicates whether the filter is currently enabled or not.             | Conditional      |
| updateFilter       | `(filter: { field: string, filter: ListingRequestFilters[string][number] }) => void`                                                    | This function is called when the user submits the filter form. It's only required if `defaultValues` is provided.                  | Conditional      |
| deleteFilter       | `() => void`                                                                                                                            | This function is called when the user clicks the delete icon. It's only required if `defaultValues` is provided.                   | Conditional      |
| toggleFilter       | `() => void`                                                                                                                            | This function is called when the user clicks the toggle icon. It's only required if `defaultValues` is provided.                  | Conditional      |
| addFilter          | `(filter: { field: string, filter: ListingRequestFilters[string][number] }) => void`                                                    | This function is called when the user submits the filter form. It's only required if `defaultValues` is not provided (i.e., when creating a new filter). | Conditional      |

## Use

The [`FilterEditor`](../../src/components/client/filters/FilterEditor.tsx) component should be used within the [`FilterBar`](./FilterBar.md) component, which manages the list of filters. The parent component should provide all required props. The component does not manage its own state, aside from the state of the popover, so all data should be passed in through props and updates should be handled through the provided callback functions.

Here is an example of how to use the [`FilterEditor`](../../src/components/client/filters/FilterEditor.tsx) component:

```jsx
import FilterEditor from "$components/client/filters/FilterEditor"

<FilterEditor
  fieldOptions={...}
  fieldSchemas={...}
  defaultValues={null}
  addFilter={(filter) => {...}}
/>
```

In this example, [`FilterEditor`](../../src/components/client/filters/FilterEditor.tsx) is being used to create a new filter, so `defaultValues` is `null` and `addFilter` is provided. `fieldOptions` and `fieldSchemas` should be derived from the available filters for the listing.
