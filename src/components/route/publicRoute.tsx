import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isEmailVerified } = useAuthStore();

  if (user && isEmailVerified()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
