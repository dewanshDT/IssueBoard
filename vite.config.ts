import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    server: {
      port: 3000,
    },
    base: "/",
  }

  if (command !== "serve") {
    config.base = "/IssueBoard/"
  }

  return config
})
