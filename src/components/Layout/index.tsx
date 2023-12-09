import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchIssues } from "../../utils"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import StatusBar from "./StatusBar"

function Layout() {
  const { fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["issues"],
      queryFn: fetchIssues,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam <= 9 ? lastPageParam + 1 : undefined
      },
      initialPageParam: 1,
    })

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <main className="flex h-full">
        {/* sidebar */}
        <div className="w-36 border-r border-neutral-800 h-full"></div>
        {/* main */}
        <div className="flex flex-col h-full w-full">
          <Outlet />
          {isFetchingNextPage && (
            <div className="animate-bar-loader border-b-4 border-neutral-600 w-full"></div>
          )}
        </div>
      </main>
      <StatusBar
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  )
}

export default Layout
