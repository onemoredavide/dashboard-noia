"use client"

import { useClientTranslation } from "$i18n/client"
import { ListingFilterOperator, ListingRequestFilters } from "sdk"
import React, { ReactElement, ReactNode, forwardRef, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import Select, { components } from "react-select"
import Creatable from "react-select/creatable"
import Button from "../Button"
import Input from "../Input"
import { FilterEditorDefaultValues } from "./FilterEditor"
import styles from "$styles/components/filters/FilterPopover.module.css"
import Icon from "../Icon"
import classNames from "classnames"
import { ParsedFilters } from "./FilterBar"
import { reactSelectTheme } from "$constants/ui"
import parse from "html-react-parser"

type FilterPopoverProps =  ParsedFilters & {
  defaultValues: FilterEditorDefaultValues | null
  cancel: () => void
  submit: <T extends string>(filter: { field: T, filter: ListingRequestFilters[T][number] }) => void
  enabled?: boolean
  toggleFilter?: () => void
}

const availableOperators: Record<string, ListingFilterOperator[]> = {
  number: ["=", "!=", ">", ">=", "<", "<=", "IN", "!IN"],
  string: ["=", "!=", "IN", "!IN", "ILIKE", "!ILIKE"],
  boolean: ["=", "!="]
}

const multiOperators: ListingFilterOperator[] = ["IN", "!IN"]

const caseSensitiveOperatorsMap: Record<"LIKE" | "ILIKE" | "!LIKE" | "!ILIKE", ListingFilterOperator> = {
  LIKE: "ILIKE",
  ILIKE: "LIKE",
  "!LIKE": "!ILIKE",
  "!ILIKE": "!LIKE"
}
const caseSensitiveOperators = ["LIKE", "!LIKE"]
const FilterPopover = forwardRef<HTMLFormElement, FilterPopoverProps>(({
  defaultValues,
  enabled,
  toggleFilter,
  fieldOptions,
  fieldSchemas,
  cancel,
  submit
}, ref) => {
  const { t } = useClientTranslation(["filters", "select", "common"])

  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      field: defaultValues?.field ?? null,
      operator: defaultValues?.operator ? { label: t(`filters:FILTER_OPERATOR.${defaultValues.operator}`), value: defaultValues.operator } : null,
      values: defaultValues?.values ?? []
    }
  })

  const [field, operator, values] = watch(["field", "operator", "values"])

  const operatorOptions = useMemo(() => {
    if (field) {
      return availableOperators[fieldSchemas[field.value].type as string].map(value => ({ label: t(`filters:FILTER_OPERATOR.${value}`), value }))
    } else {
      return []
    }
  }, [field, fieldSchemas, t])

  const onSubmit = handleSubmit(({ field, operator, values }) => {
    if (field && operator && values.length > 0) {
      submit({
        field: field.value,
        filter: {
          operator: operator.value,
          values
        } as ListingRequestFilters[string][number]
      })
    }
  })

  return <form className={styles["filter-popover"]} onSubmit={onSubmit} ref={ref}>
    <div className={styles["filter-popover__title"]}>
      {t(defaultValues ? "filters:EDIT_FILTER" : "filters:NEW_FILTER")}
      {
        !!defaultValues && <div className={"ml-auto"}>
          <Icon
            name={"eye-off"}
            size={24}
            className={classNames(styles["filter-popover__toggle"], { [styles["filter-popover__toggle--active"]]: !enabled })}
            onClick={toggleFilter}
          />
        </div>
      }
    </div>
    <hr/>
    <div className={"flex gap-3 items-end"}>
      <div className={"w-1/2"}>
        <div className={styles["filter-popover__label"]}>{t("filters:FILTER_FIELD_LABEL")}</div>
        <Controller
          control={control}
          name={"field"}
          render={({ field: { onChange, ...props } }): ReactElement => {
            return <Select
              {...props}
              options={fieldOptions}
              onChange={(newValue): void => {
                // Reset operator choice on field change
                setValue("operator", null)
                onChange(newValue)
              }}
              placeholder={t("select:SELECT.PLACEHOLDER")}
              theme={reactSelectTheme}
              components={{ IndicatorSeparator: null }}
            />
          }}
        />
      </div>
      <div className={"w-1/2"}>
        <div className={styles["filter-popover__label"]}>{t("filters:FILTER_OPERATOR_LABEL")}</div>
        <Controller
          control={control}
          name={"operator"}
          render={({ field: { onChange, ...props } }): ReactElement => {
            return <Select
              {...props}
              options={operatorOptions}
              isDisabled={!field}
              onChange={(newValue): void => {
                // Reset values on field/operator change
                if (field && fieldSchemas[field.value].type === "boolean") {
                  setValue("values", [true])
                } else if (field && fieldSchemas[field.value].enum?.length && operator && !multiOperators.includes(operator.value)) {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  const [{ id }] = fieldSchemas[field.value].enum!
                  setValue("values", [id])
                } else {
                  setValue("values", [])
                }

                onChange(newValue)
              }}
              placeholder={t("select:SELECT.PLACEHOLDER")}
              theme={reactSelectTheme}
              components={{ IndicatorSeparator: null }}
            />
          }}
        />
      </div>
    </div>
    {
      !!field && !!operator && <div className={"w-full"}>
        {/* Boolean field */}
        {
          fieldSchemas[field.value].type === "boolean" && typeof values[0] !== "undefined" &&
            <Controller
              control={control}
              name={"values"}
              render={({ field: { value, onChange, ...props } }): ReactElement => {
                return <Select
                  {...props}
                  value={{ label: t(`filters:FILTER_VALUE.${value[0].toString().toUpperCase()}`), value }}
                  onChange={(newValue): void => {
                    if (newValue) {
                      onChange(newValue.value)
                    }
                  }}
                  options={[
                    { label: t("filters:FILTER_VALUE.TRUE") || "", value: [true] },
                    { label: t("filters:FILTER_VALUE.FALSE") || "", value: [false] }
                  ]}
                  theme={reactSelectTheme}
                  components={{ IndicatorSeparator: null }}
                />
              }}
            />
        }
        {/* Non-boolean, enum field, single or multi */}
        {
          fieldSchemas[field.value].type !== "boolean" && !!fieldSchemas[field.value].enum &&
            <Controller
              control={control}
              name={"values"}
              render={({ field: { value, onChange, ...props } }): ReactElement => {
                if (multiOperators.includes(operator.value)) {
                  const enumLabels = fieldSchemas[field.value].enum?.reduce((acc: Record<string, string>, { id, label }) => {
                    acc[id] = label
                    return acc
                  }, {})

                  return <Select
                    {...props}
                    isMulti
                    value={value.map(singleValue => ({ label: enumLabels?.[singleValue.toString()], value: singleValue }))}
                    options={fieldSchemas[field.value].enum?.map(({ label, id }) => ({ label, value: id }))}
                    onChange={(newValues): void => onChange(newValues.map(({ value }) => value) as string[] | number[] | boolean[])}
                    theme={reactSelectTheme}
                    components={{ IndicatorSeparator: null }}
                  />
                } else {
                  const label = fieldSchemas[field.value].enum?.find(({ id }) => value[0] === id)?.label ?? value[0]
                  return <Select
                    {...props}
                    value={{ label, value }}
                    options={fieldSchemas[field.value].enum?.map(({ label, id }) => ({ label, value: [id] }))}
                    onChange={(newValue): void => {
                      if (newValue) {
                        onChange(newValue.value)
                      }
                    }}
                    theme={reactSelectTheme}
                    components={{ IndicatorSeparator: null }}
                  />
                }
              }}
            />
        }
        {/* Non-boolean, non-enum field */}
        {
          fieldSchemas[field.value].type !== "boolean" && !fieldSchemas[field.value].enum && <>
            {
              /* Single value */
              !multiOperators.includes(operator.value) &&
                <Controller
                  control={control}
                  name={"values"}
                  render={({ field: { value: [formValue = ""], onChange, ...props } }): ReactElement => {
                    return <Input
                      {...props}
                      value={typeof formValue !== "string" ? formValue.toString() : formValue}
                      suffix={
                        fieldSchemas[field.value].type === "string"
                          && Object.keys(caseSensitiveOperatorsMap).includes(operator.value)
                          && <div title={"Case sensitive"}>
                            <Icon
                              name={"letters-case"}
                              className={classNames(styles["filter-popover__toggle"], caseSensitiveOperators.includes(operator.value) && styles["filter-popover__toggle--active"])}
                              onClick={(): void => {
                                const operatorValue = operator.value as keyof typeof caseSensitiveOperatorsMap
                                setValue("operator", {
                                  label: t(`filters:FILTER_OPERATOR.${operatorValue}`),
                                  value: caseSensitiveOperatorsMap[operatorValue]
                                })
                              }}
                            />
                          </div>
                      }
                      onChange={({ target: { value } }): void => {
                        if (fieldSchemas[field.value].type === "number") {
                          const parsedNumber = parseInt(value)
                          onChange(isNaN(parsedNumber) ? [] : [parsedNumber])
                        } else if (value) {
                          onChange([value])
                        } else {
                          onChange([])
                        }
                      }}
                    />
                  }}
                />
            }
            {
              /* Multi value */
              multiOperators.includes(operator.value) &&
                <Controller
                  control={control}
                  name={"values"}
                  render={({ field: { value, onChange, ...props } }): ReactElement => {
                    return <Creatable
                      {...props}
                      isMulti
                      value={value.map(singleValue => ({ label: typeof singleValue === "number" ? singleValue.toString() : singleValue as string, value: singleValue as string | number }))}
                      onChange={(newValue): void => {
                        // Values are always of type string as they are an <input/> byproduct
                        if (fieldSchemas[field.value].type === "number") {
                          onChange(newValue.reduce((acc: number[], { value }) => {
                            const parsedNumber = parseInt(value as string)
                            if (!isNaN(parsedNumber)) {
                              acc.push(parsedNumber)
                            }
                            return acc
                          }, []))
                        } else {
                          onChange(newValue.reduce((acc: string[], { value }) => {
                            if (value) {
                              acc.push(value as string)
                            }
                            return acc
                          }, []))
                        }
                      }}
                      placeholder={null}
                      theme={reactSelectTheme}
                      components={{
                        IndicatorSeparator: null,
                        Input: (props): JSX.Element => <components.Input {...props} className={"no-arrows"} type={fieldSchemas[field.value].type === "number" ? "number" : "text"}/>
                      }}
                      formatCreateLabel={(inputValue): ReactNode => <>{parse(t("select:SELECT.FORMAT_CREATE_LABEL", { inputValue }))}</>}
                      noOptionsMessage={({ inputValue }): ReactNode => inputValue ? t("select:SELECT.ALREADY_EXISTS", { inputValue }) : t("select:SELECT.NO_OPTIONS_MESSAGE")}
                    />
                  }}
                />
            }
          </>
        }
      </div>
    }
    <div className={styles["filter-popover__footer"]}>
      <Button theme={"secondary"} type={"reset"} onClick={cancel}>
        {t("common:CANCEL")}
      </Button>
      <Button disabled={!field || !operator || !values.length} type={"submit"}>
        {t("common:SAVE")}
      </Button>
    </div>
  </form>
})

FilterPopover.displayName = "FilterPopover"
export default FilterPopover
