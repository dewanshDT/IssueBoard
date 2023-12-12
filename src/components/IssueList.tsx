import { FixedSizeList } from "react-window"
import InfiniteLoader from "react-window-infinite-loader"
import AutoSizer from "react-virtualized-auto-sizer"

import IssueItem from "./IssueItem"
import { ticket } from "../types"

import { CgSpinner } from "react-icons/cg"
import { useGetInfiniteIssues } from "../api"
import React from "react"

const IssueList = ({
  data,
  error,
  status,
}: {
  data: ticket[] | undefined
  error: Error | null
  status: "error" | "pending" | "success"
}) => {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetInfiniteIssues()

  const loadNextPage = () => {
    fetchNextPage()
  }

  if (status === "pending")
    return (
      <div className="h-full w-full flex items-center justify-center text-4xl text-neutral-700">
        <CgSpinner className="animate-spin" />
      </div>
    )
  else if (status === "error")
    return (
      <div className="h-full w-full flex items-center justify-center text-neutral-700">
        {error?.message}
      </div>
    )

  return (
    <>
      {data && (
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={(index) => !hasNextPage || index < data.length}
              itemCount={hasNextPage ? data.length + 1 : data.length}
              loadMoreItems={isFetchingNextPage ? () => {} : loadNextPage}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  className="issue-list relative"
                  height={height}
                  width={width}
                  itemSize={30}
                  itemCount={data.length}
                  itemData={data}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {React.memo(IssueItem)}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      )}
    </>
  )
}

export default IssueList
