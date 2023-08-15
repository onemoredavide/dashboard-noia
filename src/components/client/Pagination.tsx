"use client"

import React, { FC } from "react"
import styles from "$styles/components/Pagination.module.css"
import Button from "$components/client/Button"
import Icon from "$components/client/Icon"
import { useClientTranslation } from "$i18n/client"
import parse from "html-react-parser"
import { ListingPaginatorProps } from "$hooks/useListing"
import classNames from "classnames"

type PaginationProps = ListingPaginatorProps & { className?: string, count: number }

const Pagination: FC<PaginationProps> = ({
  paginator,
  disable,
  prevPage,
  nextPage,
  className,
  count
}) => {
  const { t } = useClientTranslation("pagination")

  return <div className={classNames(className, styles.pagination__wrapper)}>
    <nav role={"pagination"} aria-label={"Pagination"}>
      <ul>
        <Button theme={"secondary"} disabled={disable.prev} onClick={prevPage}>
          <Icon name={"arrow-left"} size={16} className={"mr-1"}/>
          {t("pagination:PREVIOUS")}
        </Button>
        <Button theme={"secondary"} disabled={disable.next} onClick={nextPage}>
          {t("pagination:NEXT")}
          <Icon name={"arrow-right"} size={16} className={"ml-1"}/>
        </Button>
      </ul>
    </nav>

    <div className={styles.pagination__label}>
      {
        parse(t("pagination:PAGINATION_LABEL", {
          start: count === 0 ? 0 : paginator.offset + 1,
          end: Math.min(count, paginator.offset + paginator.limit),
          count
        }))
      }
    </div>
  </div>
}

export default Pagination
