# FilterPopover

[`FilterPopover`](../../src/components/client/filters/FilterPopover.tsx) is a forward-ref React component, a part of a larger filtering system, that enables the user to create or modify a filter for data listings. It provides a form with dropdowns and input fields, where the user can select the field, operator, and values to filter by.

This component utilizes [`react-hook-form`](https://react-hook-form.com/) for form management, and [`react-select`](https://react-select.com/home) (with `react-select/creatable`) for creating interactive dropdown lists.

## Props

| Name | Types/Signature | Description | Required |
| ---- | --------------- | ----------- | -------- |
| `defaultValues` | `FilterEditorDefaultValues` &#124; `null` | Default values for the filter to be edited. If this is `null`, a new filter will be created. | Yes |
| `enabled` | `boolean` | A flag indicating if the filter is currently enabled. | No |
| `toggleFilter` | `() => void` | A function that toggles the current filter's enabled state. | No |
| `cancel` | `() => void` | A function that cancels the current edit/create filter operation. | Yes |
| `submit` | `<T extends string>(filter: { field: T, filter: ListingRequestFilters[T][number] }) => void` | A function that submits the current edit/create filter operation with the provided filter data. | Yes |
| `fieldOptions` | `Option[]` | Array of objects representing the available field options to choose from for filtering. Each object is of the format `{ label: string, value: string }`. | Yes |
| `fieldSchemas` | `Record<string, FieldSchema>` | A record containing the different schemas available for each field option, each schema object contains metadata about that particular field. | Yes |

## Implementation

- `useForm` from [`react-hook-form`](https://react-hook-form.com/) is used to manage form state. Default values for the form are set based on the `defaultValues` prop.
- Depending on the selected field type, different dropdowns or input fields are displayed to set the filtering value(s).
- `handleSubmit` function from [`react-hook-form`](https://react-hook-form.com/) is used to handle form submission. On form submit, `submit` prop function is called with selected field, operator, and values.
- For dropdowns, [`react-select`](https://react-select.com/home) is used with `Controller` from [`react-hook-form`](https://react-hook-form.com/). For string and number fields, standard `Input` component is used with `Controller`.

## Styling

The component's style is contained in [`FilterPopover.module.css`](../../src/styles/components/filters/FilterPopover.module.css), which is applied by using the `classNames` function and various CSS modules' classes.

## Component Usage

```jsx
<FilterPopover
  defaultValues={{field: 'name', operator: '=', values: ['John']}}
  cancel={cancelFunction}
  submit={submitFunction}
  enabled={true}
  toggleFilter={toggleFilterFunction}
  fieldOptions={fieldOptions}
  fieldSchemas={fieldSchemas}
/>
```

This will render a `FilterPopover` in editing mode for a filter with field 'name', operator '=', and values ['John']. If the user clicks cancel, `cancelFunction` will be called. If the user submits the form, `submitFunction` will be called with new filter settings. If the user clicks on the eye-off icon, `toggleFilterFunction` will be called. Fields' options and schemas for the dropdowns are provided via `fieldOptions` and `fieldSchemas`.
