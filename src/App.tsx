import "@/App.css";
import { ToastContainer } from "react-toastify";
import TanstackQueryProvider from "./providers/tanstack-query-provider";
import Navigation from "./routes/navigation";

function App() {
  // const entryHandler: PerformanceObserverCallback = (list) => {
  //   if (observer) {
  //     observer.disconnect();
  //   }

  //   for (const entry of list.getEntries()) {
  //     console.log(entry);
  //   }
  //   for (const entry of list.getEntries()) {
  //     if (entry.name === "first-paint") {
  //       observer.disconnect();
  //     }
  //     console.log(entry);
  //   }
  // };

  // const observer = new PerformanceObserver(entryHandler);
  // // The buffered property indicates whether to observe cached data,
  // // allowing observation even if the monitoring code is added after the event occurs
  // observer.observe({ type: "paint", buffered: true });
  return (
    <TanstackQueryProvider>
      <ToastContainer position="bottom-right" />
      <Navigation />
    </TanstackQueryProvider>
  );
}

export default App;
