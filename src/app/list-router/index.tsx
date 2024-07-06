import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import MainLayout from "@/layout";
import HomePage from "@/pages/home";

export const listRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/example",
        element: <div>example</div>,
      },
    ],
  },
]);
