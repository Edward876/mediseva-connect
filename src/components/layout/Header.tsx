
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Menu,
  X,
  User,
  UserPlus, 
  Calendar,
  ShieldCheck,
  PhoneCall,
  Menu as MenuIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Find Doctors", path: "/find-doctors" },
  { name: "Appointments", path: "/appointments" },
  { name: "Emergency", path: "/emergency" },
  { name: "Internships", path: "/internships" },
  { name: "About", path: "/about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-container flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-all duration-200 hover:opacity-80"
          >
            <span className="relative flex h-10 w-10 rounded-full bg-gradient-to-br from-mediseva-500 to-mediseva-700 items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-white" />
            </span>
            <span className="font-display font-semibold text-xl sm:text-2xl text-foreground">
              Mediseva
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/emergency-service">
            <Button variant="outline" size="sm" className="border-danger text-danger hover:bg-danger/10 hover:text-danger space-x-1">
              <PhoneCall className="h-4 w-4" />
              <span>Emergency</span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="space-x-1">
                <User className="h-4 w-4" />
                <span>Sign in</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/login" className="flex items-center cursor-pointer w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Patient Login</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/doctor-login" className="flex items-center cursor-pointer w-full">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span>Doctor Login</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="space-x-1">
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/register" className="flex items-center cursor-pointer w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Patient Registration</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/doctor-register" className="flex items-center cursor-pointer w-full">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span>Doctor Registration</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-border animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-border grid grid-cols-2 gap-2">
              <Link to="/emergency-service" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-danger text-danger hover:bg-danger/10 hover:text-danger justify-start">
                  <PhoneCall className="h-4 w-4 mr-2" />
                  <span>Emergency</span>
                </Button>
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  <span>Sign in</span>
                </Button>
              </Link>
              <Link to="/doctor-login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  <span>Doctor Login</span>
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start">
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Register</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
