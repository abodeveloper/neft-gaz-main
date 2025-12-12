import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Foydalanuvchi sahifalari
const HomePage = lazy(() => import("@/features/home/HomePage"));
const DynamicPage = lazy(() => import("@/features/dynamic-page/DynamicPage"));
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
      {
        path: "/dynamic-page/:slug",
        element: <DynamicPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
];
