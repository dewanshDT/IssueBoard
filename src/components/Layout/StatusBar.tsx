import React from "react"
import { ticket } from "../../types"
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query"
import { twMerge } from "tailwind-merge"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  itemsLoaded: number | undefined
  isFetching: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ticket[], Error>>
}

const StatusBar: React.FC<Props> = ({
  itemsLoaded,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        props.className,
        "border-t border-neutral-800 p-2 text-xs text-neutral-400 flex justify-between"
      )}
    >
      <div>
        {isFetching && !isFetchingNextPage ? (
          <span className="text-green-400">Fetching...</span>
        ) : (
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <span className="text-yellow-400">Loading more...</span>
            ) : hasNextPage ? (
              "Load More"
            ) : (
              "Nothing more to load :("
            )}
          </button>
        )}
      </div>
      <div className="">
        <div className="">items loaded: {itemsLoaded}</div>
      </div>
    </div>
  )
}

export default StatusBar
