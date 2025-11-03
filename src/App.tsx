import { Toaster } from "sonner";
import AppRouter from "./router/AppRouter";
import ContactFormModal from "./shared/components/moleculas/ContactFormModal";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRouter />
      <ContactFormModal />
    </>
  );
}

export default App;
