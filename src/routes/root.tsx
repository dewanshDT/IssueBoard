import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchIssues } from "../utils"
import { IssueList } from "../components"

const RootList = () => {
  const { data, error, status } = useInfiniteQuery({
    queryKey: ["issues"],
    queryFn: fetchIssues,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      return lastPageParam <= 9 ? lastPageParam + 1 : undefined
    },
    initialPageParam: 1,
  })
  return (
    <div className="w-full h-full flex flex-col p-1 pb-0">
      <div className="w-full flex-1">
        <IssueList status={status} data={data} error={error} />
      </div>
    </div>
  )
}

export default RootList
