import { FixedSizeList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import IssueItem from "./IssueItem"
import { ticket } from "../types"

import { CgSpinner } from "react-icons/cg"

const IssueList = ({
  data,
  error,
  status,
}: {
  data: ticket[]
  error: Error | null
  status: "error" | "pending" | "success"
}) => {
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
      <AutoSizer>
        {({ height, width }) => (
          <>
            <FixedSizeList
              className="issue-list relative"
              height={height}
              width={width}
              itemSize={40} // Adjust this value based on your item height
              itemCount={data?.length}
              itemData={data}
            >
              {IssueItem}
            </FixedSizeList>
          </>
        )}
      </AutoSizer>
    </>
  )
}

export default IssueList
