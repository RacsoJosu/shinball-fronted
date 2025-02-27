import "@/App.css"
import TanstackQueryProvider from "./providers/tanstack-query-provider"
import {ToastContainer} from "react-toastify"
import Navigation from "./routes/navigation"


function App() {
  return (
    <TanstackQueryProvider>

      <ToastContainer position="bottom-right" />
      <Navigation />

    </TanstackQueryProvider>
  )
}

export default App
