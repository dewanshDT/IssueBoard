import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { useGetInfiniteIssues } from "../api"
import StatusIcon from "./StatusIcon"
import { label, status } from "../types"
import clsx from "clsx"
import { getLabelColor } from "../utils"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  grouping: string | null
  groupingKey: string | null | undefined
  setGroupingKey: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >
}

const GroupingTab: React.FC<Props> = ({
  grouping,
  groupingKey,
  className,
  setGroupingKey,
  ...props
}) => {
  const { data } = useGetInfiniteIssues()
  const [tabs, setTabs] = useState<string[]>()

  useEffect(() => {
    switch (grouping) {
      case "assignee":
        setTabs(data?.map((item) => item.assignee))
        break
      case "priority":
        setTabs(["none", "low", "medium", "high", "critical"])
        break
      case "label":
        setTabs([
          "Bug",
          "Feature",
          "Performance",
          "Security",
          "Documentation",
          "User Request",
          "Immediate",
          "Next Release",
          "Major Release",
        ])
        break
      case "status":
        setTabs(["Triage", "Todo", "In Progress", "In Review", "Done"])
    }
  }, [data, grouping])

  return (
    <div
      {...props}
      className={twMerge(className, "flex w-full pt-0.5 pb-1.5 px-2 gap-2")}
    >
      {tabs?.map((item, index) => (
        <button
          key={item + index}
          className={clsx(
            "flex items-center gap-1 text-sm px-1.5 py-0.5 border border-neutral-700 rounded-md overflow-clip",
            groupingKey === item && "bg-opacity-100",
            grouping === "label" &&
              `${getLabelColor(item as label)} bg-opacity-10`
          )}
          onClick={() => setGroupingKey(item)}
        >
          {grouping === "status" && <StatusIcon status={item as status} />}
          <span>{item}</span>
        </button>
      ))}
    </div>
  )
}

export default GroupingTab
