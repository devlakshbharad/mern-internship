    import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  // Wait until /auth/me finishes
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  // User is not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Admin page but user is not admin
  if (
    adminOnly &&
    user?.role !== "admin"
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // Access allowed
  return <>{children}</>;
}