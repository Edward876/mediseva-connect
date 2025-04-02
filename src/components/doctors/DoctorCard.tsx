
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, User, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DoctorCardProps {
  doctor: {
    id: number;
    name: string;
    specialty: string;
    hospital: string;
    location: string;
    rating: number;
    experience: string;
    avatar: string;
    education?: string;
    bio?: string;
    languages?: string[];
  };
  onViewProfile: (doctor: any) => void;
  onBookAppointment: (doctor: any) => void;
}

export default function DoctorCard({ doctor, onViewProfile, onBookAppointment }: DoctorCardProps) {
  const { t, isLoaded } = useLanguage();
  
  if (!isLoaded) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="h-16 w-16 rounded-full bg-muted"></div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded"></div>
            <div className="h-3 w-20 bg-muted rounded"></div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-4 w-full bg-muted rounded mb-2"></div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="h-8 w-24 bg-muted rounded"></div>
          <div className="h-8 w-24 bg-muted rounded"></div>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="hover-elevate">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <img 
          src={doctor.avatar} 
          alt={doctor.name} 
          className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
        />
        <div>
          <CardTitle className="text-lg">{doctor.name}</CardTitle>
          <CardDescription>{doctor.specialty}</CardDescription>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
            <span className="ml-1 text-xs text-muted-foreground">({doctor.experience} exp)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{doctor.hospital}, {doctor.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onViewProfile(doctor)}>
          <User className="mr-2 h-4 w-4" /> {t("doctors.viewProfile")}
        </Button>
        <Button size="sm" onClick={() => onBookAppointment(doctor)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {t("doctors.bookAppointment")}
        </Button>
      </CardFooter>
    </Card>
  );
}
