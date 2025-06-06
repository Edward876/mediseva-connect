
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { indianStates, getCitiesForState } from "@/utils/indianLocations";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (value: string) => void;
  selectedState: string;
  setSelectedState: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  handleSearch: () => void;
  specialties: string[];
}

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  handleSearch,
  specialties
}: SearchSectionProps) {
  const [availableCities, setAvailableCities] = useState(["All Cities"]);
  const { t } = useLanguage();
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    setAvailableCities(getCitiesForState(selectedState));
    setSelectedCity("All Cities");
  }, [selectedState, setSelectedCity]);

  const handleLocationAccess = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_OPENCAGE_API_KEY`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              const state = data.results[0].components.state;
              const city = data.results[0].components.city;
              
              // Find matching state in our Indian states list
              const matchingState = indianStates.find(s => 
                s.name.toLowerCase() === state?.toLowerCase()
              )?.name || "All States";
              
              setSelectedState(matchingState);
              if (city) setSelectedCity(city);
            }
          } catch (error) {
            console.error("Error getting location details:", error);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <section className="bg-gradient-to-b from-primary/10 to-background py-12">
      <div className="max-container">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("doctors.title")}</h1>
          <p className="text-muted-foreground mb-8">
            {t("doctors.subtitle")}
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder={t("doctors.searchPlaceholder")}
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div>
              <Select 
                value={selectedSpecialty} 
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t("doctors.selectSpecialty")} />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select 
                value={selectedState} 
                onValueChange={setSelectedState}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t("doctors.selectState")} />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state.name} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select 
                value={selectedCity} 
                onValueChange={setSelectedCity}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t("doctors.selectCity")} />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              className="h-12"
              onClick={handleLocationAccess}
              disabled={isLocating}
            >
              <MapPin className="mr-2 h-4 w-4" />
              {isLocating ? "Detecting Location..." : "Use My Location"}
            </Button>
          </div>
          
          <Button className="mt-4" onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" /> {t("doctors.search")}
          </Button>
        </div>
      </div>
    </section>
  );
}
