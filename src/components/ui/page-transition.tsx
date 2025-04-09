import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoadingScreen } from "./loading-screen";
import { useLanguage } from "@/contexts/LanguageContext";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { t, isLoaded } = useLanguage();
  
  useEffect(() => {
    // Show loading screen on route change
    setIsLoading(true);
    
    // Hide loading screen after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // If the page is actually loading, or the language isn't loaded yet, show loading screen
  if (isLoading && isLoaded) {
    return <LoadingScreen message={t("common.pageLoading")} />;
  }
  
  // Otherwise, render the children
  return <>{children}</>;
}
