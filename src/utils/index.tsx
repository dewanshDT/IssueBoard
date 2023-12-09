import { ticket } from "../types"

export const fetchIssues = async ({ pageParam = 1 }) => {
  console.log(pageParam)
  const res = await fetch(
    `https://sfe-interview.hoppscotch.com/issues-${pageParam}.json`
  )
  const data: {
    tickets: ticket[]
  } = await res.json()

  return data
}
