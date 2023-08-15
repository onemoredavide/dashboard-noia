# Listing

## `useListing` Hook

[`useListing`](./hooks/useListing.md) is a custom hook that helps handle data fetching, pagination, filtering, and sorting. The hook provides a set of props that can be directly passed to the `FilterBar`, `Table`, and `Pagination` components, making them work together seamlessly.

The hook's configuration is as follows:

- `key`: Unique key for the data fetching operation.
- `fetch`: Function to fetch data.
- `pageSize`: Number of items per page.
- `excludeFilters`: Filters to be excluded from the query.
- `fetchParams`: Additional parameters for the fetch function.

The hook returns several properties, among them `filterProps`, `paginatorProps`, `sorterProps`, `data`, `isRefetching`, `count`, and `errorMessage` which are particularly useful in context of the discussed components.

## `FilterBar` Component

[`FilterBar`](./components/FilterBar.md) is a component that provides data filtering capabilities. It takes the `filterProps` and `searchProps` from the `useListing` hook.

The `filterProps` includes the necessary information and callbacks to filter the data based on the user input. The `searchProps` provides similar functionality but for searching.

Example usage in the component:
```jsx
<FilterBar {...filterProps} {...searchProps}/>
```

## `Table` Component

[`Table`](./components/Table.md) is a component used to display fetched data in tabular form. It receives data from `useListing` in the form of `data` (which are the rows), `sorterProps` (which allow sorting data), and a `loading` flag (`isRefetching`).

`count` refers to the total number of items (including those not currently displayed due to pagination).

Example usage in the component:
```jsx
<Table
  columns={[
    // Column Definitions
  ]}
  rows={data}
  loading={isRefetching}
  count={count}
  sorterProps={sorterProps}
/>
```

## `Pagination` Component

[`Pagination`](./components/Pagination.md) is a component that provides page navigation functionality. It receives `paginatorProps` and `count` from `useListing` hook.

`paginatorProps` includes the necessary information and callbacks to change the page, and `count` represents the total count of items, which is used to display the total number of pages.

Example usage in the component:
```jsx
<Pagination className={"mt-6"} count={count} {...paginatorProps}/>
```

In summary, `useListing` provides all necessary props to control `FilterBar`, `Table`, and `Pagination` based on user interactions like filtering, sorting, and pagination.

### Example

```jsx
"use client"

import useListing from "$hooks/useListing"
import { listAgencyAuctions } from "sdk"
import { FC } from "react"
import Table from "$components/client/Table"
import { useClientTranslation } from "$i18n/client"
import Spinner from "$components/client/Spinner"
import Pagination from "../Pagination"
import FilterBar from "$components/client/filters/FilterBar"

const ListAgencyAuctions: FC = () => {
  const { t } = useClientTranslation("common")

  const { data, errorMessage, isInitialLoading, isRefetching, sorterProps, count, paginatorProps, filterProps, searchProps } = useListing({
    key: "listAgencyAuctions",
    fetch: listAgencyAuctions,
    pageSize: 10,
    excludeFilters: ["id"],
    fetchParams: {
      handler: {
        agencyId: 8
      }
    },
    onError: (error) => {
      // Handle error
    }
  })

  return <div className={"flex flex-col flex-grow"}>
    {
      isInitialLoading && !errorMessage && <div className={"flex justify-center items-center flex-grow"}>
        <Spinner size={48} />
      </div>
    }

    {
      !isInitialLoading && !errorMessage && typeof data !== "undefined" && <>
        <FilterBar {...filterProps} {...searchProps}/>
        <Table
          columns={[
            { id: "id", label: t("ID"), widthPercentage: 8 },
            { id: "title", label: t("TITLE"), widthPercentage: 46, hideOverflow: true },
            { id: "description", label: t("DESCRIPTION"), widthPercentage: 46, hideOverflow: true }
          ]}
          rows={data.map(plan => {
            return {
              id: plan.id,
              children: [
                <strong key={plan.id}>{plan.id}</strong>,
                plan.title || <i>{t("NO_TITLE")}</i>,
                plan.description || <i>{t("NO_DESCRIPTION")}</i>
              ]
            }
          })}
          loading={isRefetching}
          count={count}
          sorterProps={sorterProps}
        />
        <Pagination className={"mt-6"} count={count} {...paginatorProps}/>
      </>
    }
  </div>
}

export default ListAgencyAuctions
```
