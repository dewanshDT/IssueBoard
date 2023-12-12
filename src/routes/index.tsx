import { Navigate, createBrowserRouter } from "react-router-dom"
import { Layout } from "../components"
import ListView from "./ListView"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/issues/active" /> },
        {
          path: "issues/:status",
          element: <ListView />,
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/IssueBoard/" }
)

export default router
