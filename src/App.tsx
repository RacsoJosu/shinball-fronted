import "@/App.css";
import { ToastContainer } from "react-toastify";
import TanstackQueryProvider from "./providers/tanstack-query-provider";
import Navigation from "./routes/navigation";

function App() {
  return (
    <TanstackQueryProvider>
      <ToastContainer position="bottom-right" />

      <Navigation />
    </TanstackQueryProvider>
  );
}

export default App;
