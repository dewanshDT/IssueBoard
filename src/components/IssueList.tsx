import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ticket } from "../types"

const IssueList = () => {
  const fetchIssues = async ({ pageParam = 1 }) => {
    console.log(pageParam)
    const res = await fetch(
      `https://sfe-interview.hoppscotch.com/issues-${pageParam}.json`
    )
    const data: {
      tickets: ticket[]
    } = await res.json()
    return data
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["issues"],
    queryFn: fetchIssues,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      return lastPageParam <= 9 ? lastPageParam + 1 : undefined
    },
    initialPageParam: 1,
  })

  console.log(data)

  if (status === "pending") return <p>Loading...</p>
  else if (status === "error") return <p>Error: {error?.message}</p>

  return (
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.tickets?.map((issue) => (
            <p key={issue.id}>{issue.title}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  )
}

export default IssueList
