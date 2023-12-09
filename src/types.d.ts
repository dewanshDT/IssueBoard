export type label =
  | "Bug"
  | "Feature"
  | "Performance"
  | "Security"
  | "Documentation"
  | "User Request"
  | "Immediate"
  | "Next Release"
  | "Major Release"

export type status =
  | "Triage"
  | "Backlog"
  | "Todo"
  | "In Progress"
  | "In Review"
  | "Done"

export type priority = "none" | "low" | "medium" | "high" | "critical"

export interface ticket {
  teamID: "HFE" | "HBE" | "HP"
  id: string
  title: string
  parentID: string | null
  status: status
  labels: label[]
  priority: priority
  assignee: string
}
