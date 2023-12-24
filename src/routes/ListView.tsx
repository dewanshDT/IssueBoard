import { GroupingTab, IssueList } from "../components"
import { Navigate, useParams, useSearchParams } from "react-router-dom"
import { useGetInfiniteIssues } from "../api"
import { useEffect, useState } from "react"
import { Label, Ticket } from "../types"

const ListView = () => {
  const params = useParams()

  const [searchParams] = useSearchParams()
  const grouping = searchParams.get("grouping")

  const [groupingKey, setGroupingKey] = useState<string | null>()

  // Filter function based on status
  const { data, error, status } = useGetInfiniteIssues((list) => {
    return list.filter((item) => {
      if (params.status === "active") {
        return item.status !== "Backlog"
      } else if (params.status === "backlog") {
        return item.status === "Backlog"
      } else {
        return true
      }
    })
  })

  const [transformedData, setTransformedData] = useState(data)

  // for setting default key value for groupings
  useEffect(() => {
    if (grouping) {
      switch (grouping) {
        case "assignee":
          setGroupingKey("assigned")
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouping])

  // Effect to update transformedData when data changes
  useEffect(() => {
    setTransformedData(data)
  }, [data])

  // Effect for filtering data when groupingKey or status changes
  useEffect(() => {
    const filterTransformedData = (item: Ticket) => {
      if (params.status === "backlog" && grouping === "status") {
        return true
      }

      if (grouping === "assignee") {
        return groupingKey === "not assigned" ? !item.assignee : item.assignee
      }

      if (grouping === "label") {
        return item.labels.includes(groupingKey as Label)
      }

      if (grouping === "priority") {
        return item.priority === groupingKey
      }

      if (grouping === "status") {
        return item.status === groupingKey
      }

      return true
    }

    if (groupingKey) {
      setTransformedData(data?.filter((item) => filterTransformedData(item)))
    }
  }, [groupingKey, data, grouping, params.status])

  if (!["active", "backlog", "all"].includes(params?.status ?? ""))
    return <Navigate to="/404" />

  return (
    <div className=" h-full flex flex-col p-1 pb-0">
      {grouping && (
        <GroupingTab
          grouping={grouping}
          groupingKey={groupingKey}
          setGroupingKey={setGroupingKey}
        />
      )}
      <div className="w-full h-full">
        <IssueList status={status} data={transformedData} error={error} />
      </div>
    </div>
  )
}

export default ListView
