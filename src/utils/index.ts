import { label, ticket } from "../types"

export const fetchIssues = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://sfe-interview.hoppscotch.com/issues-${pageParam}.json`
  )
  const data: {
    tickets: ticket[]
  } = await res.json()

  return data
}

export const getLabelColor = (label: label) => {
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
