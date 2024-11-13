import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isEmailVerified, loading } = useAuthStore();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(loading);
    }, 300);

    return () => clearTimeout(timer);
  }, [loading]);

  if (showSpinner) {
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
