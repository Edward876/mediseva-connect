
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border">
      <div className="max-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mediseva-500 to-mediseva-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h2 className="text-xl font-display font-semibold">Mediseva</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting patients with the right healthcare professionals. We make healthcare accessible, efficient, and personalized.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/find-doctors" className="text-muted-foreground hover:text-primary transition-colors">Find Doctors</Link>
              </li>
              <li>
                <Link to="/emergency" className="text-muted-foreground hover:text-primary transition-colors">Emergency Services</Link>
              </li>
              <li>
                <Link to="/internships" className="text-muted-foreground hover:text-primary transition-colors">Medical Internships</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-muted-foreground hover:text-primary transition-colors">My Appointments</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Doctors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/doctor-register" className="text-muted-foreground hover:text-primary transition-colors">Join as a Doctor</Link>
              </li>
              <li>
                <Link to="/doctor-login" className="text-muted-foreground hover:text-primary transition-colors">Doctor Login</Link>
              </li>
              <li>
                <Link to="/doctor-dashboard" className="text-muted-foreground hover:text-primary transition-colors">Doctor Dashboard</Link>
              </li>
              <li>
                <Link to="/doctor-resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/doctor-support" className="text-muted-foreground hover:text-primary transition-colors">Doctor Support</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">123 Medical Plaza, Healthcare District, City, Country - 123456</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-muted-foreground">+1 (800) MEDISEVA</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-muted-foreground">contact@mediseva.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h3 className="font-semibold text-sm mb-2">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="h-9" 
                />
                <Button size="sm" type="submit">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Mediseva. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
