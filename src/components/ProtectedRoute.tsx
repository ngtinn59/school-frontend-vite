import { Navigate, useLoaderData } from "react-router-dom";
import { LoaderLoginResponse } from "../utils/type";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const loginData: LoaderLoginResponse = useLoaderData() as LoaderLoginResponse;

  if (!loginData.isLogin) {
    return (
      <Navigate
        to="/sign-in"
        replace={true}
        state={{ alert: "You need sign in to access this feature!" }}
      />
    );
  } else {
    return <>{children}</>;
  }
};
