import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./components/layout";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          lazy: () => import("./pages/home"),
        },
        {
          path: "sets/",
          children: [
            {
              path: "new",
              lazy: () => import("./pages/new"),
            },
            {
              path: ":id",
              lazy: () => import("./pages/set"),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/p36",
  },
);

export default function App() {
  return <RouterProvider router={router} />;
}
