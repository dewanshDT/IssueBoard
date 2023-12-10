import { GroupingTab, IssueList } from "../components"
import { useParams, useSearchParams } from "react-router-dom"
import { useGetInfiniteIssues } from "../api"
import { useEffect, useState } from "react"
import { label } from "../types"

const ListView = () => {
  const params = useParams()
  console.log(params)

  const [searchParams] = useSearchParams()
  const grouping = searchParams.get("grouping")

  console.log(grouping)

  const [groupingKey, setGroupingKey] = useState<string | null>()

  const { data, error, status } = useGetInfiniteIssues((list) => {
    return list.filter((item) =>
      params.status === "active"
        ? item.status !== "Backlog"
        : params.status === "backlog"
        ? item.status === "Backlog"
        : true
    )
  })

  const [transformedData, setTransformedData] = useState(data)

  useEffect(() => {
    if (grouping) {
      switch (grouping) {
        case "assignee":
          setGroupingKey(null)
          break
        case "label":
          setGroupingKey("Bug")
          break
        case "priority":
          setGroupingKey("critical")
          break
        case "status":
          setGroupingKey("Todo")
          break
        default:
          setGroupingKey(null)
      }
    }
    console.log(groupingKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouping])

  useEffect(() => {
    setTransformedData(data)
  }, [data])

  useEffect(() => {
    if (groupingKey) {
      setTransformedData(
        data?.filter((item) =>
          grouping === "assignee"
            ? item.assignee == groupingKey
            : grouping === "label"
            ? item.labels.includes(groupingKey as label)
            : grouping === "priority"
            ? item.priority === groupingKey
            : grouping === "status"
            ? item.status === groupingKey
            : true
        )
      )
    }
  }, [groupingKey, data, grouping])

  return (
    <div className="w-full h-full flex flex-col p-1 pb-0">
      {grouping && (
        <GroupingTab
          grouping={grouping}
          groupingKey={groupingKey}
          setGroupingKey={setGroupingKey}
        />
      )}
      <div className="w-full flex-1">
        <IssueList status={status} data={transformedData} error={error} />
      </div>
    </div>
  )
}

export default ListView