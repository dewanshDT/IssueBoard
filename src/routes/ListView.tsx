import { IssueList } from "../components"
import { useParams, useSearchParams } from "react-router-dom"
import { useGetInfiniteIssues } from "../api"

const ListView = () => {
  const params = useParams()
  console.log(params)

  const [searchParams] = useSearchParams()
  const grouping = searchParams.get("grouping")

  const { data, error, status } = useGetInfiniteIssues((list) => {
    return list.filter((item) =>
      params.status === "active"
        ? item.status !== "Backlog"
        : params.status === "backlog"
        ? item.status === "Backlog"
        : true
    )
  })

  return (
    <div className="w-full h-full flex flex-col p-1 pb-0">
      <div className="w-full flex-1">
        {data && <IssueList status={status} data={data} error={error} />}
      </div>
    </div>
  )
}

export default ListView
