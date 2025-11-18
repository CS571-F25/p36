import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, lazy: () => import("./pages/Home") },
      { path: "sets", lazy: () => import("./pages/StudySets") },
      { path: "study", lazy: () => import("./pages/StudySession") },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
