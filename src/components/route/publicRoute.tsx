import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isEmailVerified, loading } = useAuthStore();

  if (!loading && user && isEmailVerified()) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return children;
  }

  return children;
};

export default PublicRoute;
