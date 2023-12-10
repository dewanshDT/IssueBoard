import { Outlet } from "react-router-dom"
import Header from "./Header"
import StatusBar from "./StatusBar"
import SideBar from "./SideBar"
import { useGetInfiniteIssues } from "../../api"

function Layout() {
  const { fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetInfiniteIssues()

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <main className="flex h-full">
        {/* sidebar */}
        <SideBar />
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
