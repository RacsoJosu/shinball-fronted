import Navigation from "@/routes/navigation"
import "@/App.css"
import TanstackQueryProvider from "./providers/tanstack-query-provider"
function App() {
  return (
    <TanstackQueryProvider>

      <Navigation/>

    </TanstackQueryProvider>
  )
}

export default App
