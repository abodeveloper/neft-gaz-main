import { Toaster } from "sonner";
import AppRouter from "./router/AppRouter";
import { ScrollToTop } from "./shared/components/moleculas/ScrollToTop";

function App() {

  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRouter />
      <ScrollToTop />
    </>
  );
}

export default App;
