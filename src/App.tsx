import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./App.css"
import IssueList from "./components/IssueList"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <IssueList />
    </QueryClientProvider>
  )
}

export default App
