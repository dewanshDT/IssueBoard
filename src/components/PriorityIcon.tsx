import clsx from "clsx"
import { priority, status } from "../types"

const PriorityIcon = ({
  priority,
  status,
}: {
  priority: priority
  status: status
}) => {
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
    <div
      className={clsx(
        "flex items-center gap-0.5",
        status === "Done" && "grayscale"
      )}
    >
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

export default PriorityIcon
