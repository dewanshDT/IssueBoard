import nameInitials from "name-initials"
import { label, priority, ticket } from "../../types"
import clsx from "clsx"

import "./style.css"
import ToolTip from "../ToolTip"
import StatusIcon from "../StatusIcon"

const PriorityIcon = ({ priority }: { priority: priority }) => {
  const priorityNum =
    priority === "none"
      ? 0
      : priority === "low"
      ? 1
      : priority === "medium"
      ? 2
      : priority === "high"
      ? 3
      : 4

  const priorityColor =
    priority === "none"
      ? "indigo"
      : priority === "low"
      ? "blue"
      : priority === "medium"
      ? "green"
      : priority === "high"
      ? "yellow"
      : "red"

  const bgColor = `bg-${priorityColor}-500`

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 4 }, (_, index) => index + 1).map((_, index) => (
        <span
          key={index}
          className={clsx(
            "h-1.5 w-1.5 rounded-full inline-block",
            priorityNum <= index && "opacity-30",
            bgColor
          )}
        ></span>
      ))}
    </div>
  )
}

const getLabelColor = (label: label) => {
  switch (label) {
    case "Bug":
      return "bg-red-500"
    case "Feature":
      return "bg-blue-500"
    case "Performance":
      return "bg-yellow-500"
    case "Security":
      return "bg-purple-500"
    case "Documentation":
      return "bg-green-500"
    case "User Request":
      return "bg-pink-500"
    case "Immediate":
      return "bg-orange-500"
    case "Next Release":
      return "bg-indigo-500"
    case "Major Release":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

const IssueItem = ({
  index,
  style,
  data,
}: {
  index: number
  style: React.CSSProperties
  data: ticket[]
}) => {
  const issue = data[index]

  if (!issue) return null

  return (
    <li
      key={issue.id}
      style={style}
      className="issue-item flex items-center gap-2 px-2 cursor-default"
    >
      <div className="flex gap-2 items-center">
        <ToolTip
          className={clsx(issue.status === "Done" && "grayscale")}
          tip={"priority: " + issue.priority}
        >
          <PriorityIcon priority={issue.priority} />
        </ToolTip>
        <ToolTip tip={issue.id}>
          <div className="issue-id text-neutral-400 font-light text-xs w-20 text-center line-clamp-1 bg-neutral-800 py-[0.2em] px-1.5 rounded-sm">
            {issue.id.split(/(-)/).map((token, index) => (
              <span
                key={token + index}
                className={clsx(index === 0 && "text-neutral-200")}
              >
                {token}
              </span>
            ))}
          </div>
        </ToolTip>
      </div>
      <ToolTip tip={"status: " + issue.status}>
        <StatusIcon status={issue.status} />
      </ToolTip>
      <div className="line-clamp-1 text-neutral-200 text-sm">
        {issue.parentID && (
          <span className="opacity-60 text-xs my-auto">
            {issue.parentID + " > "}
          </span>
        )}
        <span
          className={clsx(issue.status === "Done" && "line-through opacity-60")}
        >
          {issue.title}
        </span>
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <div
          className={clsx(
            "md:flex gap-1 hidden",
            issue.status === "Done" && "grayscale"
          )}
        >
          {issue.labels.map((label, index) => (
            <div
              key={label + index}
              className="border border-neutral-600 rounded-sm py-[.05em] sm:pl-0.5 sm:pr-2 flex gap-2 items-center text-xs w-max line-clamp-1"
            >
              <span
                className={clsx(
                  "h-full w-1 inline-block opacity-80",
                  getLabelColor(label)
                )}
              ></span>
              <span className="line-clamp-1 text-neutral-200">{label}</span>
            </div>
          ))}
        </div>
        <div className="py-0.5 w-6 h-6 flex items-center justify-center text-center bg-neutral-700 text-xs text-neutral-200 rounded-full">
          {issue.assignee ? nameInitials(issue.assignee ?? "none") : ""}
        </div>
      </div>
    </li>
  )
}

export default IssueItem
