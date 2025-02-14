import "@/App.css"
import TanstackQueryProvider from "./providers/tanstack-query-provider"

import Navigation from "./routes/navigation"


function App() {
  return (
    <TanstackQueryProvider>

      <Navigation />

    </TanstackQueryProvider>
  )
}

export default App
