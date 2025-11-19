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
          lazy: async () => {
            const module = await import("./pages/home");
            return { Component: module.default };
          }
        },
        { 
          path: "create", 
          lazy: async () => {
            const module = await import("./pages/StudySets");
            return { Component: module.default };
          }
        },
        { 
          path: "sets", 
          lazy: async () => {
            const module = await import("./pages/StudySession");
            return { Component: module.default };
          }
        },
      ],
    },
  ],
  {
    basename: "/p36",
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
