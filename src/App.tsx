import { createHashRouter, RouterProvider } from "react-router";

import Layout from "./components/layout";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import("./pages/home"),
      },
      {
        path: "sets",
        lazy: () => import("./pages/sets"),
      },
      {
        path: "sets/new",
        lazy: () => import("./pages/new"),
      },
      {
        path: "sets/:id",
        lazy: () => import("./pages/set"),
      },
      {
        path: "master/:id",
        lazy:()=>import("./pages/master"),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
