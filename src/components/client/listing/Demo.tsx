"use client"

import useListing from "$hooks/useListing"
import { listAgencyAuctions } from "sdk"
import { FC } from "react"
import Table from "$components/client/Table"
import { useClientTranslation } from "$i18n/client"
import Spinner from "$components/client/Spinner"
import Pagination from "../Pagination"
import FilterBar from "$components/client/filters/FilterBar"
import Message from "$components/client/Message"

const ListAgencyAuctions: FC = () => {
  const { t } = useClientTranslation("common")

  const { data, errorMessage, isInitialLoading, isRefetching, sorterProps, count, paginatorProps, filterProps, searchProps } = useListing({
    key: "listAgencyAuctions",
    fetch: listAgencyAuctions,
    pageSize: 10,
    excludeFilters: ["id"],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError: (error) => {},
    fetchParams: {
      handler: {
        agencyId: 8
      }
    }
  })

  return <div className={"flex flex-col flex-grow"}>
    {
      isInitialLoading && !errorMessage && <div className={"flex justify-center items-center flex-grow"}>
        <Spinner size={48} />
      </div>
    }

    {
      !isInitialLoading && !!errorMessage && <Message title={t("ERROR.GENERIC_ERROR")} theme={"danger"}>
        {errorMessage}
      </Message>
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
                plan.title || <i>{t("NO_TITLE")}</i>
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
