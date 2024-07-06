import { RouterProvider } from "react-router-dom";
import { listRouter } from "./list-router";

export default function App() {
  return (
    <div>
      <RouterProvider router={listRouter} />
    </div>
  );
}
