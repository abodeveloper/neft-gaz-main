import { Footer } from "@/features/home/components/Footer";

import { Navbar } from "@/shared/components/moleculas/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
