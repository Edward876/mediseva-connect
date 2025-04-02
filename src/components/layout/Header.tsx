
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import UserInfo from "@/components/auth/UserInfo";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { isAuthenticated } from "@/utils/auth";

export default function Header() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      setUserLoggedIn(isAuthenticated());
    };
    
    checkAuth();
    
    // Listen for storage events to update the UI when the user logs in/out
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);
  
  // Track scroll position for styling header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => location.pathname === path;
  
  // Navigation items
  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/find-doctors", label: t("nav.findDoctors") },
    { path: "/appointments", label: t("nav.appointments") },
    { path: "/emergency", label: t("nav.emergency") },
    { path: "/internships", label: t("nav.internships") },
    { path: "/about", label: t("nav.about") }
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
      )}
    >
      <div className="max-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">{t("app.title")}</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            
            {/* Show either login buttons or user profile */}
            {userLoggedIn ? (
              <UserInfo />
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    {!isMobile && t("nav.login")}
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/register" className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {!isMobile && t("nav.register")}
                  </Link>
                </Button>
              </>
            )}
            
            {/* Mobile menu button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="ml-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && mobileMenuOpen && (
          <div className="border-t py-4 animate-in fade-in slide-in-from-top-5">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center p-2 text-sm font-medium rounded-md",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/50 text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Show login/register links in mobile menu when not logged in */}
              {!userLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="flex items-center p-2 text-sm font-medium hover:bg-muted/50 text-muted-foreground rounded-md"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center p-2 text-sm font-medium hover:bg-muted/50 text-muted-foreground rounded-md"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    {t("nav.register")}
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
