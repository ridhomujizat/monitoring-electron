import { Button } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error: any = useRouteError();
  console.error("error pages", error);

  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center min-h-screen gap-2"
    >
      <h1>Oops!</h1>
      <div className="text-center">
        <p>Sorry, an unexpected error has occurred.</p>
        <p className=" opacity-50">
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
      <Button onClick={() => navigate("/")} type="primary">
        Reload
      </Button>
    </div>
  );
}
