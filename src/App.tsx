import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./views/home";
import NotFound from "./views/helper/notFound";
import Login from "./views/login/login";
import Register from "./views/register/register";
import VerifyEmail from "./views/helper/verifyEmail";
import ResetPassword from "./views/helper/resetPassword";
import ProtectedRoute from "./components/route/protectedRoute";
import PublicRoute from "./components/route/publicRoute";
import Navbar from "./components/navbar/navbar";
import CharacterList from "./views/charList/characterList";
import Notes from "./views/notes/notes";

const App: React.FC = () => {
  return (
    <Router>
      {/* Toaster for notifications */}
      <Toaster
        toastOptions={{
          style: {
            background: "#433D8B",
            color: "#fff",
          },
        }}
      />
      {/* Conditional Navbar */}
      <ConditionalNavbar />
      <Routes>
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/character-list"
          element={
            <ProtectedRoute>
              <CharacterList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:characterId"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        {/* Not found route */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

// Conditional rendering of Navbar based on route
const ConditionalNavbar: React.FC = () => {
  const location = useLocation();
  const noHeaderRoutes = [
    "/login",
    "/register",
    "/verify-email",
    "/reset-password",
    "/404",
  ];

  return !noHeaderRoutes.includes(location.pathname) ? <Navbar /> : null;
};

export default App;
