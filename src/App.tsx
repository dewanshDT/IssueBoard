import { useInfiniteQuery } from "@tanstack/react-query"
import IssueList from "./components/IssueList"
import { fetchIssues } from "./utils"

function App() {
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

  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="px-6 py-3 border-b border-neutral-800">
        <h1 className="uppercase font-semibold text-sm">hoppscotch</h1>
      </header>
      <main className="flex h-full">
        {/* sidebar */}
        <div className="w-36 border-r border-neutral-800 h-full"></div>
        {/* main */}
        <div className="flex flex-col h-full w-full">
          <div className="w-full h-full flex flex-col p-1 pb-0">
            <div className="w-full flex-1">
              <IssueList status={status} data={data} error={error} />
            </div>
            {/* to add more */}
          </div>
          {isFetchingNextPage && (
            <div className="animate-bar-loader border-b-4 border-neutral-600 w-full"></div>
          )}
        </div>
      </main>
      <div className="border-t border-neutral-800 p-2 text-xs text-neutral-400 flex">
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
      </div>
    </div>
  )
}

export default App
