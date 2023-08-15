"use client"

import { SelectOption } from "$types/ui"
import { ListingRequestFilters } from "sdk"
import { FC, useEffect, useRef, useState } from "react"
import { Popover } from "react-tiny-popover"
import { ParsedFilters } from "./FilterBar"
import FilterPopover from "./FilterPopover"
import Button from "../Button"
import Icon from "../Icon"
import classNames from "classnames"
import { useClientTranslation } from "$i18n/client"

export type FilterEditorDefaultValues = ListingRequestFilters[string][number] & {
  field: SelectOption<string>
}

export type FilterEditorProps = ParsedFilters & {
  className?: string
} & ({
  defaultValues: FilterEditorDefaultValues
  enabled: boolean
  updateFilter: (filter: { field: string, filter: ListingRequestFilters[string][number] }) => void
  deleteFilter: () => void
  toggleFilter: () => void
} | {
  defaultValues: null
  addFilter: (filter: { field: string, filter: ListingRequestFilters[string][number] }) => void
})

const FilterEditor: FC<FilterEditorProps> = ({
  fieldOptions,
  fieldSchemas,
  className,
  ...props
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { t } = useClientTranslation("filters")

  const filterPopoverRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (isPopoverOpen) {
      const handler = (event: MouseEvent): void => {
        if (!filterPopoverRef.current?.contains(event.target as Node)) {
          setIsPopoverOpen(false)
        }
      }

      document.addEventListener("mousedown", handler)
      return (): void => {
        document.removeEventListener("mousedown", handler)
      }
    }
  }, [isPopoverOpen])

  return <Popover
    isOpen={isPopoverOpen}
    positions={["bottom"]}
    padding={15}
    content={
      <FilterPopover
        ref={filterPopoverRef}
        fieldOptions={fieldOptions}
        fieldSchemas={fieldSchemas}
        defaultValues={props.defaultValues}
        cancel={(): void => setIsPopoverOpen(false)}
        submit={(filter): void => {
          if (props.defaultValues) {
            props.updateFilter(filter)
          } else {
            props.addFilter(filter)
          }

          setIsPopoverOpen(false)
        }}
        {
          ...props.defaultValues && {
            enabled: props.enabled,
            toggleFilter: props.toggleFilter
          }
        }
      />
    }
  >
    <div className={className}>
      {
        !!props.defaultValues &&
          <>
            <span onClick={(): void => setIsPopoverOpen(true)} className={classNames("cursor-pointer", props.enabled ? "hover:underline" : "line-through")}>
              <code>{props.defaultValues.field.label}&nbsp;</code>
              <code>{props.defaultValues.operator}</code>&nbsp;&nbsp;<strong>{props.defaultValues.values.map(value => typeof value === "string" ? `"${value}"` : value).join(", ")}</strong>
            </span>
            <Icon size={18} className={"cursor-pointer"} name={"x"} onClick={props.deleteFilter}/>
          </>
      }
      {
        !props.defaultValues &&
          <Button theme={"secondary"} className={"h-full whitespace-nowrap"} onClick={(): void => setIsPopoverOpen(true)}>
            <Icon size={18} name={"plus"} className={"mr-2"}/>
            {t("filters:NEW_FILTER")}
          </Button>
      }
    </div>
  </Popover>
}

export default FilterEditor
