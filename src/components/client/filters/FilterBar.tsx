"use client"

import { ListingFilterProps, ListingSearchProps } from "$hooks/useListing"
import { SelectOption } from "$types/ui"
import { ListingResponseFilters } from "sdk"
import { FC, useEffect, useMemo, useState } from "react"
import Input from "../Input"
import FilterEditor from "./FilterEditor"
import Icon from "../Icon"
import styles from "$styles/components/filters/FilterBar.module.css"

const SEARCH_DEBOUNCE = 500
let searchDebounceTimeout: ReturnType<typeof setTimeout>

type FilterBarProps = ListingFilterProps & ListingSearchProps

export type ParsedFilters = {
  fieldOptions: SelectOption<string>[]
  fieldSchemas: Record<string, ListingResponseFilters[number]["schema"] & { enum: ListingResponseFilters[number]["values"] }>
}

const FilterBar: FC<FilterBarProps> = ({ search, setSearch, selectedFilters, availableFilters, ...actions }) => {
  const parsedFilters = useMemo(() => {
    return availableFilters.reduce<ParsedFilters>((acc, { id, label, schema, values }) => {
      acc.fieldSchemas[id] = { ...schema, enum: values }
      acc.fieldOptions.push({ label, value: id })

      return acc
    }, {
      fieldOptions: [],
      fieldSchemas: {}
    })
  }, [availableFilters])

  const [searchText, setSearchText] = useState<string>(search)

  useEffect(() => {
    searchDebounceTimeout = setTimeout((): void => {
      setSearch(searchText)
    }, SEARCH_DEBOUNCE)

    return (): void => {
      clearTimeout(searchDebounceTimeout)
    }
  }, [searchText, setSearch])

  return <div className={styles["filter-bar"]}>
    <Input
      className={styles["filter-bar__search"]}
      value={searchText}
      prefix={<Icon size={16} name={"search"}/>}
      onChange={(event): void => setSearchText(event.target.value)}
    />

    <div className={styles["filter-bar__items"]}>
      {
        selectedFilters.filterOrder.map(({ index, field, enabled }, filterOrderIndex) => {
          const fieldOption = parsedFilters.fieldOptions.find(({ value }) => value === field)

          if (!fieldOption) {
            return null
          } else {
            return <FilterEditor
              key={`filter-${field}-${index}`}
              className={styles["filter-bar__tag"]}
              defaultValues={{ field: fieldOption, ...selectedFilters.apiFilters[field][index] }}
              enabled={enabled}
              updateFilter={(payload): void => actions.updateFilter(payload, filterOrderIndex)}
              deleteFilter={(): void => actions.deleteFilter(filterOrderIndex)}
              toggleFilter={(): void => actions.toggleFilter(filterOrderIndex)}
              {...parsedFilters}
            />
          }
        })
      }

      <FilterEditor
        defaultValues={null}
        addFilter={actions.addFilter}
        {...parsedFilters}
      />
    </div>
  </div>
}

export default FilterBar
