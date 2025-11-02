import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Foydalanuvchi sahifalari
const HomePage = lazy(() => import("@/features/home/HomePage"));

export const routes = [
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
];
