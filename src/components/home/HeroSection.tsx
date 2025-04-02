
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Search, PhoneCall, Stethoscope, Award } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { loadUsers } from "@/utils/localStorageService";
import { useLanguage } from "@/contexts/LanguageContext";

const specialties = [
  "Cardiology",
  "Dermatology", 
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Ophthalmology",
  "Psychiatry",
  "Dental",
  "General Physician"
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctorCount, setDoctorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Load user and doctor counts from localStorage
    const users = loadUsers();
    const totalUsers = users.length;
    const totalDoctors = users.filter(user => user.role === 'doctor').length;
    
    setUserCount(totalUsers);
    setDoctorCount(totalDoctors);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Create the URL with correctly formatted parameters
    const searchParams = new URLSearchParams();
    if (specialty) {
      searchParams.append("specialty", specialty.toLowerCase());
    }
    if (searchQuery) {
      searchParams.append("query", searchQuery);
    }
    
    // Navigate to the find doctors page with the search parameters
    navigate(`/find-doctors?${searchParams.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-mediseva-500/10 rounded-full blur-3xl" />
      <div className="absolute top-40 -left-32 w-80 h-80 bg-mediseva-400/10 rounded-full blur-3xl" />
      
      <div className="max-container py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-mediseva-100 text-mediseva-800 text-sm font-medium animate-fade-in">
                {t("hero.tagline")}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {t("hero.title")} <span className="text-mediseva-600">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: "0.4s" }}>
                {t("hero.subtitle")}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 items-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mediseva-100">
                  <Calendar className="h-5 w-5 text-mediseva-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("hero.easyBooking")}</p>
                  <p className="text-xs text-muted-foreground">{t("hero.fastConvenient")}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mediseva-100">
                  <Stethoscope className="h-5 w-5 text-mediseva-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("hero.qualityDoctors")}</p>
                  <p className="text-xs text-muted-foreground">{t("hero.verifiedSpecialists")}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mediseva-100">
                  <Clock className="h-5 w-5 text-mediseva-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("hero.service24_7")}</p>
                  <p className="text-xs text-muted-foreground">{t("hero.alwaysAvailable")}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <h2 className="text-lg font-semibold">{t("hero.findDoctor")}</h2>
              <Card className="shadow-lg border-0">
                <CardContent className="p-4">
                  <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-3">
                    <div className="md:col-span-3">
                      <Select value={specialty} onValueChange={setSpecialty}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("hero.selectSpecialty")} />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map(specialty => (
                            <SelectItem key={specialty} value={specialty.toLowerCase()}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-3">
                      <Input 
                        type="text" 
                        placeholder={t("hero.doctorNameOrLocation")} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Button type="submit" className="w-full">
                        <Search className="mr-1 h-4 w-4" />
                        {t("hero.search")}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-4 animate-slide-up" style={{ animationDelay: "1s" }}>
              <Link to="/emergency-service">
                <Button variant="outline" className="border-danger text-danger hover:bg-danger/10 hover:text-danger space-x-2">
                  <PhoneCall className="h-4 w-4" />
                  <span>{t("hero.emergencyAssistance")}</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative order-first lg:order-last animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="aspect-square relative z-10 max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format&fit=crop&q=80"
                alt="Doctor with patient"
                className="rounded-2xl object-cover h-full w-full shadow-xl"
              />
              
              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t("hero.trustedBy")}</p>
                    <p className="text-xl font-bold">
                      {userCount > 0 ? userCount : "..."} {t("hero.patients")}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 glass p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: "0.3s" }}>
                <div className="text-center">
                  <p className="font-medium text-sm">{t("hero.availableDoctors")}</p>
                  <p className="text-xl font-bold">{doctorCount > 0 ? doctorCount : "..."}</p>
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border-8 border-dashed border-mediseva-100 animate-spin-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
