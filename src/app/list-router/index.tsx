import { createHashRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import MainLayout from "@/layout";
import HomePage from "@/pages/home";
import ScreenRecord from "@/pages/screen-record";
import SelfRecord from "@/pages/self-record";

export const listRouter = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/screen-record",
        element: <ScreenRecord />,
      },
      {
        path: "/self-record",
        element: <SelfRecord />,
      },
      {
        path: "/tracking-record",
        element: <SelfRecord />,
      },
      {
        path: "/example",
        element: <div>example</div>,
      },
    ],
  },
]);
