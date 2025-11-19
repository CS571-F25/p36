import { createHashRouter, RouterProvider } from "react-router";

import Layout from "./components/layout";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
          index: true,
          lazy: async () => {
            const module = await import("./pages/home");
            return { Component: module.default };
          },
        },
        {
          path: "sets/",
          children: [
            {
              path: "new",
              lazy: async () => {
                const module = await import("./pages/new");
                return { Component: module.default };
              },
            },
            {
              path: ":id",
              lazy: async () => {
                const module = await import("./pages/set");
                return { Component: module.default };
              },
            },
          ],
        },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
