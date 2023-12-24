export type Label =
  | "Bug"
  | "Feature"
  | "Performance"
  | "Security"
  | "Documentation"
  | "User Request"
  | "Immediate"
  | "Next Release"
  | "Major Release"

export type Status =
  | "Triage"
  | "Backlog"
  | "Todo"
  | "In Progress"
  | "In Review"
  | "Done"

export type Priority = "none" | "low" | "medium" | "high" | "critical"

export interface Ticket {
  teamID: "HFE" | "HBE" | "HP"
  id: string
  title: string
  parentID: string | null
  status: Status
  labels: Label[]
  priority: Priority
  assignee: string
}
