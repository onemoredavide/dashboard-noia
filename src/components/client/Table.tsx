"use client"

import classNames from "classnames"
import { ReactNode, useMemo } from "react"
import styles from "$styles/components/Table.module.css"
import { ListingSorterProps } from "$hooks/useListing"
import Icon from "./Icon"
import { ListingRequest, ListingRequestSorters, ListingSuccessResponse } from "sdk"
import Spinner from "./Spinner"
import { useClientTranslation } from "$i18n/client"

const Table = <RequestSorters extends ListingRequest["sorters"], ResponseSorters extends ListingSuccessResponse["sorters"]>({
  columns,
  title,
  rows,
  autoLayout = false,
  sorterProps,
  count,
  loading = false,
  selectionProps
}: {
  rows: { id: number, children: ReactNode[], onClick?: () => void }[]
  columns: { id: string, label: string, fixed?: boolean, widthPercentage?: number, hideOverflow?: boolean }[]
  title?: string
  autoLayout?: boolean
  count?: number
  loading?: boolean
  sorterProps?: ListingSorterProps<RequestSorters, ResponseSorters>
  selectionProps?: {
    selectedItemIds: number[]
    updateItemSelection: (target: number | "all", checked: boolean) => void
  }
}): JSX.Element => {
  const showOverflowIndexes = useMemo(() => {
    return columns.reduce((acc: number[], { hideOverflow }, index) => {
      if (hideOverflow === false) {
        acc.push(index)
      }
      return acc
    }, [])
  }, [columns])
  const { t } = useClientTranslation("common")

  const percentageSum = columns.reduce((acc, { widthPercentage }) => acc + (widthPercentage ?? 0), 0)

  if (percentageSum !== 100) {
    throw new Error("Table columns widthPercentage sum must be 100")
  }

  return <div className={styles.table__wrapper}>
    <header>
      <h2>
        {title}
        {typeof count !== "undefined" && <span className={styles["table__page-count"]}>{count}</span>}
      </h2>
      {loading && <Spinner className={"ml-auto"} theme={"gray"}/>}
    </header>
    <div className={styles.table}>
      <table className={autoLayout ? "table-auto" : "table-fixed"}>
        <thead>
          <tr>
            {
              selectionProps && <th className={styles.table__selection}>
                <div className={"flex items-center"}>
                  <label className={"inline-flex"}>
                    <span className={"sr-only"}>{t("SELECT_ALL")}</span>
                    <input
                      className={"form-checkbox"}
                      type={"checkbox"}
                      disabled={!rows.length}
                      checked={selectionProps.selectedItemIds.length === rows.length}
                      onChange={(event): void => selectionProps.updateItemSelection("all", event.target.checked)}
                    />
                  </label>
                </div>
              </th>
            }
            {
              columns.map(({
                id,
                label,
                fixed = false,
                widthPercentage
              }) => {
                const sortable = sorterProps && sorterProps.sorterFields.includes(id)
                let sorterOrder: ListingRequestSorters[number]["order"] | undefined
                if (sortable) {
                  sorterOrder = sorterProps.sorters.find(({ name }) => name === id)?.order
                }

                return <th
                  key={`heading-${id}`}
                  {...!autoLayout && widthPercentage && { style: { width: `${widthPercentage}%` } }}
                  className={classNames({
                    "w-px": fixed,
                    "cursor-pointer": !!sorterOrder,
                    "select-none": !!sortable,
                    asc: sorterOrder === "ASC",
                    desc: sorterOrder === "DESC"
                  })}
                  onClick={(event): void => {
                    if (!sortable) {
                      return
                    }

                    const hasSorter = sorterProps.sorters.findIndex(({ name }) => name === id) !== -1

                    if (!event.shiftKey) {
                      sorterProps.resetSorters(id)
                    } else if (hasSorter) {
                      sorterProps.invertSorter(id)
                    } else {
                      sorterProps.chainSorter(id)
                    }
                  }}
                >
                  <div className={"flex items-center justify-between relative"}>
                    {label}
                    {
                      !!sortable && <div className={styles.table__sorter}>
                        <Icon name={"caret-up"} size={20} className={classNames({ "opacity-30": sorterOrder !== "ASC" })}/>
                        <Icon name={"caret-down"} size={20} className={classNames(styles["table__sorter-down"], { "opacity-30": sorterOrder !== "DESC" })}/>
                      </div>
                    }
                  </div>
                </th>
              })
            }
          </tr>
        </thead>

        <tbody>
          {
            rows.length > 0 ?
              rows.map(({ id: rowId, children, onClick }) => {
                return <tr key={`row-${rowId}`} onClick={onClick} className={classNames({ "hover:bg-gray-50 cursor-pointer": !!onClick })}>
                  {
                    selectionProps && <td>
                      <div className={"flex items-center"}>
                        <label className={"inline-flex"}>
                          <span className={"sr-only"}>Select</span>
                          <input
                            onChange={(event): void => selectionProps.updateItemSelection(rowId, event.target.checked)}
                            onClick={(e): void => e.stopPropagation()}
                            key={rowId}
                            checked={selectionProps.selectedItemIds.includes(rowId)}
                            className={"form-checkbox"}
                            type={"checkbox"}
                          />
                        </label>
                      </div>
                    </td>
                  }
                  {children.map((field, i) => <td key={`field-${i}`} className={classNames(!showOverflowIndexes.includes(i) && "overflow-hidden text-ellipsis")}>{field}</td>)}
                </tr>
              })
              :
              <tr>
                <td colSpan={columns.length + (selectionProps ? 1 : 0)} className={"text-center italic"}>
                  <div className={"text-gray-500 py-4"}>{t("NO_RESULTS")}</div>
                </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
}


export default Table
