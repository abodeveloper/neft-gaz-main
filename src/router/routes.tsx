import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Foydalanuvchi sahifalari
const HomePage = lazy(() => import("@/features/home/HomePage"));
const Layout = lazy(() => import("@/layout/layout"));

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
];
