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
          return { Component: module.Component };
        },
      },
      {
        path: "sets",
        lazy: async () => {
          const module = await import("./pages/StudySets");
          return { Component: module.Component };
        },
      },
      {
        path: "sets/new",
        lazy: async () => {
          const module = await import("./pages/new");
          return { Component: module.Component };
        },
      },
      {
        path: "study",
        lazy: async () => {
          const module = await import("./pages/StudySession");
          return { Component: module.Component };
        },
      },
      {
        path: "sets/:id",
        lazy: async () => {
          const module = await import("./pages/set");
          return { Component: module.Component };
        },
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
