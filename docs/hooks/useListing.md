# `useListing` Component Documentation

## Overview
The [`useListing`](../../src/hooks/useListing.ts) function is a custom React hook that allows you to perform, manage and customize the state of a data listing operation in a React application. The hook uses the [react-query](https://react-query.tanstack.com/) library to fetch and synchronize the data, and provides a set of properties and functions to customize the listing request and interact with the returned data.

## Props
Here are the props for the [`useListing`](../../src/hooks/useListing.ts) hook:

| Name | Type/Signature | Description | Required |
| --- | --- | --- | --- |
| `key` | string | A unique identifier for the query. | Yes |
| `fetch` | function | A function that fetches the data. This function should return a Promise resolving to an AxiosResponse of either `SuccessResponse` or `ListingErrorResponse`. | Yes |
| `pageSize` | number | The number of items to return per page. | Yes |
| `excludeFilters` | ReadonlyArray<keyof NonNullable<Request["filters"]>> | An array of filter keys to exclude from the returned data. | No |
| `defaultFilters` | NonNullable<Request["filters"]> | Default filter settings. | No |
| `fetchParams` | Omit<Request, keyof ListingRequest> | Additional parameters for the fetch request. | No |
| `onError` | onError: (error: Error \| AxiosResponse<ListingErrorResponse>) => Promise<void>\|void | A function that handles errors. |

## Return value
The [`useListing`](../../src/hooks/useListing.ts) hook returns an object with the following fields:

| Name | Type/Signature | Description |
| --- | --- | --- |
| `data` | SuccessResponse["data"] or undefined | The data returned from the fetch request. |
| `errorMessage` | string or undefined | An error message, if any error occurred during the fetch request. |
| `refetch` | (options?: {shouldGetCount: boolean}) => Promise<void> | A function that triggers a refetch of the data. |
| `isRefetching` | boolean | Indicates whether a refetch is currently happening. |
| `isInitialLoading` | boolean | Indicates whether the initial fetch request is still loading. |
| `count` | number | The total number of items in the listing. |
| `paginatorProps` | [ListingPaginatorProps](../../src/hooks/useListing.ts) | An object containing pagination related properties and methods. |
| `sorterProps` | ListingSorterProps<Request["sorters"], SuccessResponse["sorters"]> | An object containing sorting related properties and methods. |
| `filterProps` | ListingFilterProps<Request["filters"], SuccessResponse["filters"], ExcludeFiltersArray> | An object containing filter related properties and methods. |
| `searchProps` | { search: string, setSearch: (search: string) => void } | An object containing search related properties and methods. |
| `setQueryData` | (updateFn: Updater<SuccessResponse["data"] | undefined, SuccessResponse["data"] | undefined>) => SuccessResponse["data"] | undefined | A function that sets the query data. |


## Usage
This hook can be used to handle pagination, sorting, filtering and searching in a data listing in your application. You need to pass a unique `key` and a `fetch` function that fetches the data, and a `pageSize` to set the number of items per page. Optionally, you can pass `excludeFilters` to exclude certain filters from the response, `defaultFilters` to set default filter settings, and `fetchParams` to add additional parameters to the fetch request.

The hook returns an object that contains the fetched data, an error message (if any), a `refetch` function to trigger a refetch, flags indicating whether a refetch is happening and whether the initial load is still loading, the total count of items, and objects containing pagination, sorting, filtering and search related properties and methods.
