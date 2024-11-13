import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isEmailVerified, loading } = useAuthStore();

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  } else if (!isEmailVerified()) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};

export default ProtectedRoute;
