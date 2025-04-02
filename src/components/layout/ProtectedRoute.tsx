
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowUnauthenticated?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  allowUnauthenticated = false 
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsLoggedIn(authStatus);
      setIsLoading(false);
    };

    // Short timeout to show loading screen
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, []);

  // If still loading, show loading screen
  if (isLoading) {
    return <LoadingScreen message={t("auth.checking")} />;
  }

  // If user is not authenticated and route requires auth
  if (!isLoggedIn && !allowUnauthenticated) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
