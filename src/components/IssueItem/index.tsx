import nameInitials from "name-initials"
import { ticket } from "../../types"
import clsx from "clsx"

import "./style.css"
import ToolTip from "../ToolTip"
import StatusIcon from "../StatusIcon"
import { LuSmilePlus } from "react-icons/lu"
import { getLabelColor } from "../../utils"
import PriorityIcon from "../PriorityIcon"

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
      className="issue-item flex items-center gap-2 px-2 cursor-default hover:bg-neutral-950 rounded-md"
    >
      <div className="flex gap-2 items-center">
        <ToolTip tip={"priority: " + issue.priority}>
          <PriorityIcon status={issue.status} priority={issue.priority} />
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
          {issue.assignee ? (
            nameInitials(issue.assignee ?? "none")
          ) : (
            <LuSmilePlus className="text-lg text text-neutral-400" />
          )}
        </div>
      </div>
    </li>
  )
}

export default IssueItem
