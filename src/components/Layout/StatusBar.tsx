import React from "react"
import { twMerge } from "tailwind-merge"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  itemsLoaded: number | undefined
  isFetching: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

const StatusBar: React.FC<Props> = ({
  itemsLoaded,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        props.className,
        "border-t border-neutral-700 p-2 text-xs text-neutral-300 flex justify-between"
      )}
    >
      <div>
        {isFetching && !isFetchingNextPage ? (
          <span className="text-green-400 cursor-default">Fetching...</span>
        ) : (
          <div>
            {isFetchingNextPage ? (
              <span className="text-yellow-400">Loading more...</span>
            ) : hasNextPage ? (
              "Scroll to Load more"
            ) : (
              "Nothing more to load :("
            )}
          </div>
        )}
      </div>
      <div className="">
        <div className="">
          Items loaded:{" "}
          {itemsLoaded?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
    </div>
  )
}

export default StatusBar
