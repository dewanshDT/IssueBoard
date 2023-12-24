import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchIssues } from "../utils"
import { Ticket } from "../types"

export const useGetInfiniteIssues = (
  transformFunction: (data: Ticket[]) => Ticket[] = (data) => data
) => {
  return useInfiniteQuery({
    queryKey: ["issues"],
    queryFn: fetchIssues,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
      return lastPageParam <= 9 ? lastPageParam + 1 : undefined
    },
    initialPageParam: 1,
    select: (data) =>
      transformFunction(data?.pages.flatMap((group) => group.tickets)),
  })
}
