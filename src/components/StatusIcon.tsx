import {
  LuCheckCircle2,
  LuCircle,
  LuCircleDashed,
  LuCircleDot,
  LuGaugeCircle,
} from "react-icons/lu"
import { status } from "../types"

const StatusIcon = ({ status }: { status: status }) => {
  return status === "Triage" ? (
    <LuGaugeCircle />
  ) : status === "Backlog" ? (
    <LuCircleDashed className="" />
  ) : status === "Todo" ? (
    <LuCircle />
  ) : status === "In Progress" ? (
    <LuCircle className="text-yellow-500" />
  ) : status === "In Review" ? (
    <LuCircleDot className="text-indigo-500" />
  ) : (
    <LuCheckCircle2 className="text-green-500" />
  )
}

export default StatusIcon
