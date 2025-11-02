import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, lazy: () => import("./pages/home") },
      { path: ":id", lazy: () => import("./pages/set") },
      { path: "create", lazy: () => import("./pages/create") },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
