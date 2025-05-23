import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mediseva-500 to-mediseva-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h2 className="text-xl font-display font-semibold">{t("app.title")}</h2>
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
            <h3 className="font-semibold text-lg mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/find-doctors" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.findDoctors")}</Link>
              </li>
              <li>
                <Link to="/emergency" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.emergency")}</Link>
              </li>
              <li>
                <Link to="/internships" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.clinicalExposure")}</Link>
              </li>
              <li>
                <Link to="/appointments" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.appointments")}</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">{t("nav.about")}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t("footer.contactUs")}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("footer.forDoctors")}</h3>
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
            <h3 className="font-semibold text-lg mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">Bennett University, Plot Nos 8, 11, TechZone 2, Greater Noida, Uttar Pradesh 201310</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-muted-foreground">+91 8509511195</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-muted-foreground">e23cseu0525@bennett.edu.in</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h3 className="font-semibold text-sm mb-2">{t("footer.subscribe")}</h3>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder={t("footer.yourEmail")}
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
            &copy; {currentYear} {t("app.title")}. {t("footer.allRightsReserved")}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.termsOfService")}
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
