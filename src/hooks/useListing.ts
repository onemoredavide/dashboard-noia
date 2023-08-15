import { queryClient } from "$components/client/helpers/QueryWrapper"
import { validatePositiveInt } from "$helpers/utils"
import type { Paginator, ListingSuccessResponse, ListingRequest, ListingErrorResponse, ListingRequestSorters } from "sdk"
import { Updater, useQuery } from "@tanstack/react-query"
import Ajv from "ajv"
import type { AxiosResponse } from "axios"
import produce from "immer"
import { usePathname, useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import merge from "deepmerge"
import { ServerError } from "./useErrorHandler"

export type Keys<T> = Extract<keyof NonNullable<T>, string>

export type FilterOrder<Key> = { field: Key, index: number, enabled: boolean }[]

type ExcludeByKey<T extends object, U extends string | number | symbol> = T extends { id: U } ? never : T

type RefetchOptions = Partial<{ shouldGetCount: boolean }>
export type RefetchFunction = (options?: RefetchOptions) => Promise<void>

const isSuccessResponse = (response: AxiosResponse<ListingSuccessResponse> | AxiosResponse<ListingErrorResponse>): response is AxiosResponse<ListingSuccessResponse>  => {
  return response.status === 200
}

const invertSorterOrder = (order: ListingRequestSorters[number]["order"]): ListingRequestSorters[number]["order"] => order === "ASC" ? "DESC" : "ASC"

export type ListingSorterProps<
  RequestSorters extends ListingRequest["sorters"] = ListingRequest["sorters"],
  ResponseSorters extends ListingSuccessResponse["sorters"] = ListingSuccessResponse["sorters"]
> = {
  sorterFields: NonNullable<ResponseSorters>
  sorters: NonNullable<RequestSorters>
  resetSorters: (sorter: NonNullable<ResponseSorters>[number]) => void
  chainSorter: (sorter: NonNullable<ResponseSorters>[number]) => void
  invertSorter: (sorter: NonNullable<ResponseSorters>[number]) => void
}

export type ListingFilterProps<
  RequestFilters extends ListingRequest["filters"] = ListingRequest["filters"],
  ResponseFilters extends ListingSuccessResponse["filters"] = ListingSuccessResponse["filters"],
  ExcludeFiltersArray extends Readonly<Array<keyof NonNullable<RequestFilters>>> = []
> = {
  availableFilters: Array<ExcludeByKey<NonNullable<ResponseFilters>[number], ExcludeFiltersArray[number]>>
  selectedFilters: {
    filterOrder: FilterOrder<Keys<Omit<NonNullable<RequestFilters>, ExcludeFiltersArray[number]>>>
    apiFilters: Omit<NonNullable<RequestFilters>, ExcludeFiltersArray[number]>
  }
  addFilter: <FilterId extends Keys<Omit<NonNullable<RequestFilters>, ExcludeFiltersArray[number]>>>(payload: { field: FilterId, filter: NonNullable<NonNullable<RequestFilters>[FilterId]>[number] }) => void
  updateFilter: <FilterId extends Keys<Omit<NonNullable<RequestFilters>, ExcludeFiltersArray[number]>>>(payload: { field: FilterId, filter: NonNullable<NonNullable<RequestFilters>[FilterId]>[number] }, filterOrderIndex: number) => void
  deleteFilter: (filterOrderIndex: number) => void
  toggleFilter: (filterOrderIndex: number) => void
}

export type ListingPaginatorProps = {
  paginator: Paginator
  disable: { prev: boolean, next: boolean }
  prevPage: () => void
  nextPage: () => void
}

export type ListingSearchProps = {
  search: string
  setSearch: (search: string) => void
}

const filterOrderSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      field: { type: "string" },
      index: { type: "number" },
      enabled: { type: "boolean" }
    },
    required: ["field", "index", "enabled"],
    additionalProperties: false
  }
}

const generateFilterOrder = <ApiFilters extends NonNullable<ListingRequest["filters"]>>(apiFilters: ApiFilters): FilterOrder<Keys<ApiFilters>> => {
  const keys = Object.keys(apiFilters) as Keys<ApiFilters>[]

  return keys.reduce<FilterOrder<Keys<ApiFilters>>>((acc, key) => {
    acc.push(...apiFilters[key].map((_, index) => {
      return {
        field: key,
        index,
        enabled: true
      }
    }))

    return acc
  }, [])
}

type ExtractServerError<T> = T extends ServerError ? T : never
type ExtractSuccessResponse<T> = T extends ServerError ? never : T

const useListing = <
  Request extends ListingRequest,
  SuccessResponse extends ListingSuccessResponse,
  ExcludeFiltersArray extends Readonly<Array<keyof NonNullable<Request["filters"]>>>,
  FetchSignatureRequest,
  FetchSignatureResponse extends AxiosResponse<SuccessResponse> | AxiosResponse<ListingErrorResponse>&{path: string}
>({ key, fetch, pageSize, excludeFilters, defaultFilters, fetchParams, onError }: {
  key: string
  fetch: (data: FetchSignatureRequest) => Promise<FetchSignatureResponse>
  pageSize: number
  onError: (error: Error | ExtractServerError<FetchSignatureResponse>) => Promise<void>|void
  excludeFilters?: ExcludeFiltersArray
  defaultFilters?: NonNullable<Request["filters"]>
  fetchParams?: Omit<FetchSignatureRequest, keyof ListingRequest>
}): {
  data: ExtractSuccessResponse<FetchSignatureResponse>["data"]["data"] | undefined
  errorMessage: string | undefined
  refetch: RefetchFunction
  isRefetching: boolean
  isInitialLoading: boolean
  count: number
  paginatorProps: ListingPaginatorProps
  sorterProps: ListingSorterProps<Request["sorters"], SuccessResponse["sorters"]>
  filterProps: ListingFilterProps<Request["filters"], SuccessResponse["filters"], ExcludeFiltersArray>
  searchProps: ListingSearchProps
  setQueryData: (updateFn: Updater<SuccessResponse["data"] | undefined, SuccessResponse["data"] | undefined>) => SuccessResponse["data"] | undefined
} => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [errorMessage, setErrorMessage] = useState<string>()

  // Pagination
  const [count, setCount] = useState<number>(0)
  const [paginator, setPaginator] = useState((): Paginator => {
    const limit = validatePositiveInt(searchParams.get("limit"))
    const offset = validatePositiveInt(searchParams.get("offset"))

    if (limit !== null && offset !== null) {
      return { limit, offset }
    } else {
      return { limit: pageSize, offset: 0 }
    }
  })

  // Sorters
  const [sorterFields, setSorterFields] = useState<NonNullable<SuccessResponse["sorters"]>>([])
  const [sorters, setSorters] = useState((): NonNullable<ListingRequest["sorters"]> => {
    try {
      const sorters = searchParams.get("sorters")
      return sorters ? JSON.parse(sorters) as NonNullable<ListingRequest["sorters"]> : []
    } catch {
      return []
    }
  })

  // Filters
  const [availableFilters, setAvailableFilters] = useState<Array<ExcludeByKey<NonNullable<SuccessResponse["filters"]>[number], ExcludeFiltersArray[number]>>>([])
  const [selectedFilters, setSelectedFilters] = useState((): {
    filterOrder: FilterOrder<Keys<Omit<NonNullable<Request["filters"]>, ExcludeFiltersArray[number]>>>
    apiFilters: Omit<NonNullable<Request["filters"]>, ExcludeFiltersArray[number]>
  } => {
    const apiFilters = searchParams.get("apiFilters")
    const filterOrder = searchParams.get("filterOrder")

    const defaultPayload = {
      filterOrder: [],
      apiFilters: {} as NonNullable<Request["filters"]>
    }

    if (apiFilters) {
      try {
        const parsedApiFilters = JSON.parse(apiFilters) as typeof selectedFilters.apiFilters

        if (filterOrder) {
          const parsedFilterOrder = JSON.parse(filterOrder) as typeof selectedFilters.filterOrder

          // Use Ajv to validate filterOrder schema as it is a concept completely handled client-side and cannot leverage server validation like apiFilters; check if parsedFilterOrder length is equal to the actual number of filters
          if (!new Ajv().validate(filterOrderSchema, parsedFilterOrder) || Object.values(parsedApiFilters).flat().length !== parsedFilterOrder.length) {
            return {
              apiFilters: parsedApiFilters,
              // In case of error, re-generates filterOrder
              filterOrder: generateFilterOrder(parsedApiFilters)
            }
          }

          return {
            apiFilters: parsedApiFilters,
            filterOrder: parsedFilterOrder
          }
        } else {
          return {
            apiFilters: parsedApiFilters,
            filterOrder: generateFilterOrder(parsedApiFilters)
          }
        }
      } catch {
        return defaultPayload
      }
    } else {
      return defaultPayload
    }
  })

  // Search
  const [search, setSearch] = useState<string>((): string => searchParams.get("search") || "")

  // Helpers
  const firstLoad = useRef<boolean>(true)
  const resetParams = (): void => {
    setPaginator({ limit: 10, offset: 0 })
    setSorters([])
    setSelectedFilters({ filterOrder: [], apiFilters: {} as NonNullable<Request["filters"]> })
    setSearch("")
  }

  const queryKey = [key, paginator, sorters, selectedFilters, search, defaultFilters, fetchParams]

  const {
    data,
    isRefetching,
    refetch,
    isInitialLoading
    // ? firstLoad.current
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
  } = useQuery({ queryKey, queryFn: async(): Promise<SuccessResponse["data"]> => {
    const payload = { paginator, getCount: true } as Request

    if (sorters.length) {
      payload.sorters = sorters
    }

    payload.filters = produce(selectedFilters.apiFilters, (draft: typeof selectedFilters.apiFilters) => {
      for (const { field, enabled, index } of selectedFilters.filterOrder) {
        if (!enabled) {
          draft[field].splice(index, 1)
        }
      }
    })

    if (defaultFilters) {
      payload.filters = merge(defaultFilters, payload.filters)
    }

    if (search) {
      payload.search = search
    }

    if (firstLoad.current) {
      payload.getFilters = true
      payload.getSorters = true
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await fetch({ ...payload, ...(fetchParams || {}) } as any)

    if (isSuccessResponse(response)) {
      if (firstLoad.current) {
        const filteredAvailableFilters = response.data.filters?.filter((filter): filter is ExcludeByKey<NonNullable<SuccessResponse["filters"]>[number], ExcludeFiltersArray[number]> => {
          return !excludeFilters || !excludeFilters.includes(filter.id)
        })

        setAvailableFilters(filteredAvailableFilters ?? [])
        setSorterFields(response.data.sorters ?? [])

        firstLoad.current = false
      }

      if (typeof response.data.count !== "undefined") {
        setCount(response.data.count)
      }

      return response.data.data
    } else {
      if (firstLoad.current && response.status === 400) {
        resetParams()
      }

      throw response
    }
  }, keepPreviousData: true, onSuccess: (): void => {
    if (errorMessage) {
      setErrorMessage(undefined)
    }
  },
  onError: async(error: Error | ExtractServerError<FetchSignatureResponse>): Promise<void> => {
    await onError(error)
  } })

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams)

    updatedSearchParams.set("limit", paginator.limit.toString())
    updatedSearchParams.set("offset", paginator.offset.toString())

    if (search) {
      updatedSearchParams.set("search", search)
    } else {
      updatedSearchParams.delete("search")
    }

    if (Object.values(selectedFilters.apiFilters).flat().length > 0) {
      updatedSearchParams.set("apiFilters", JSON.stringify(selectedFilters.apiFilters))
    } else {
      updatedSearchParams.delete("apiFilters")
    }

    if (selectedFilters.filterOrder.length) {
      updatedSearchParams.set("filterOrder", JSON.stringify(selectedFilters.filterOrder))
    } else {
      updatedSearchParams.delete("filterOrder")
    }

    if (sorters.length) {
      updatedSearchParams.set("sorters", JSON.stringify(sorters))
    } else {
      updatedSearchParams.delete("sorters")
    }

    router.replace(`${pathname}?${updatedSearchParams.toString()}`)
  }, [paginator, search, selectedFilters, sorters, pathname, router, searchParams])

  useEffect(() => {
    if (!firstLoad.current) {
      setPaginator({ limit: pageSize, offset: 0 })
    }
  }, [search, selectedFilters, pageSize])

  return {
    data,
    errorMessage,
    refetch: async(): Promise<void> => {
      await refetch()
    },
    isRefetching,
    isInitialLoading,
    count,
    paginatorProps: {
      paginator,
      disable: {
        prev: paginator.offset - pageSize < 0,
        next: paginator.offset + pageSize >= count
      },
      nextPage: (): void => setPaginator(paginator => ({ ...paginator, offset: paginator.offset + pageSize })),
      prevPage: (): void => setPaginator(paginator => ({ ...paginator, offset: paginator.offset - pageSize }))
    },
    sorterProps: {
      sorterFields,
      sorters,
      resetSorters: (sorter): void => {
        setSorters(sorters => {
          const previousOrder = sorters.find(({ name }) => name === sorter)?.order
          const order = typeof previousOrder !== "undefined" ? invertSorterOrder(previousOrder) : "ASC"
          return [{ name: sorter, order }]
        })
      },
      chainSorter: (sorter): void => {
        setSorters(produce(sorters => {
          sorters.push({ name: sorter, order: "ASC" })
        }))
      },
      invertSorter: (sorter): void => {
        setSorters(produce(sorters => {
          const index = sorters.findIndex(({ name }) => name === sorter)
          if (index !== -1) {
            sorters[index] = ({ name: sorter, order: invertSorterOrder(sorters[index].order) })
          }
        }))
      }
    },
    filterProps: {
      availableFilters,
      selectedFilters,
      addFilter: ({ field, filter }): void => {
        setSelectedFilters(selectedFilters => produce(selectedFilters, (draft: typeof selectedFilters) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          const index = draft.apiFilters[field]?.length ?? 0

          if (Array.isArray(draft.apiFilters[field])) {
            draft.apiFilters[field][index] = filter
          } else {
            Object.assign(draft.apiFilters, { [field]: [filter] })
          }

          draft.filterOrder.push({
            field,
            index,
            enabled: true
          })
        }))
      },
      updateFilter: ({ field: newField, filter }, filterOrderIndex): void => {
        setSelectedFilters(selectedFilters => produce(selectedFilters, (draft: typeof selectedFilters) => {
          const { field: previousField, index } = draft.filterOrder[filterOrderIndex]

          if (previousField !== newField) {
            draft.apiFilters[previousField].splice(index, 1)
          }

          if (Array.isArray(draft.apiFilters[newField])) {
            draft.apiFilters[newField][index] = filter
          } else {
            Object.assign(draft.apiFilters, { [newField]: [filter] })
          }

          draft.filterOrder = draft.filterOrder.map((item, i) => {
            if (i === filterOrderIndex) {
              return { ...item, field: newField }
            } else if (item.field === previousField && i > filterOrderIndex) {
              return { ...item, index: item.index - 1 }
            } else {
              return item
            }
          })
        }))
      },
      deleteFilter: (filterOrderIndex): void => {
        setSelectedFilters(selectedFilters => produce(selectedFilters, (draft: typeof selectedFilters) => {
          const { field, index } = draft.filterOrder[filterOrderIndex]

          draft.apiFilters[field].splice(index, 1)

          draft.filterOrder.splice(filterOrderIndex, 1)
        }))
      },
      toggleFilter: (filterOrderIndex): void => {
        setSelectedFilters(produce(draft => {
          draft.filterOrder[filterOrderIndex].enabled = !draft.filterOrder[filterOrderIndex].enabled
        }))
      }
    },
    searchProps: {
      search,
      setSearch
    },
    setQueryData: (updateFn) => queryClient.setQueryData<SuccessResponse["data"]>(queryKey, updateFn)
  }
}

export default useListing
