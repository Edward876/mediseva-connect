
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isAuthenticated, getCurrentUser } from "@/utils/auth";
import UserInfo from "@/components/auth/UserInfo";

const mainNav = [
  { name: "Home", href: "/" },
  { name: "Find Doctors", href: "/find-doctors" },
  { name: "Appointments", href: "/appointments" },
  { name: "Emergency", href: "/emergency-service" },
  { name: "Internships", href: "/internships" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { pathname } = useLocation();
  
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = isAuthenticated();
      setUserLoggedIn(isLoggedIn);
      
      if (isLoggedIn) {
        const user = getCurrentUser();
        setUserRole(user?.role || null);
      } else {
        setUserRole(null);
      }
    };
    
    checkAuth();
    
    // Listen for storage events to update the auth state
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-container flex h-16 items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary mr-1">Medi</span>
            <span className="text-2xl font-bold">seva</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="mx-6 hidden items-center space-x-4 md:flex flex-1 justify-center">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          
          {userLoggedIn ? (
            <UserInfo />
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
          
          {/* Doctor/Patient Login Link */}
          {!userLoggedIn && (
            <Link to="/doctor-login">
              <Button variant="link" size="sm" className="text-muted-foreground">
                For Doctors
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t ${isMenuOpen ? "block" : "hidden"} px-4 py-2`}
      >
        <nav className="flex flex-col space-y-3 py-3">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-2 py-1.5",
                pathname === item.href
                  ? "bg-muted rounded-md"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {userLoggedIn ? (
            <div className="pt-2 border-t">
              <UserInfo />
            </div>
          ) : (
            <>
              <hr className="my-1" />
              <div className="flex flex-col space-y-2 pt-1">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button className="w-full">Sign Up</Button>
                </Link>
                <Link to="/doctor-login" className="w-full">
                  <Button variant="link" className="text-muted-foreground w-full">
                    For Doctors
                  </Button>
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
