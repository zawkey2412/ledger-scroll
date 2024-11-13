import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useEffect, useState } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isEmailVerified, loading } = useAuthStore();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(loading);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [loading]);

  if (showSpinner) {
    return <div className="loading-spinner"></div>;
  }

  if (user && isEmailVerified()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
