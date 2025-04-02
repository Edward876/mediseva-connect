
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Star, MapPin, Award, Stethoscope } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DoctorProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: any;
  onBookAppointment: (doctor: any) => void;
}

export default function DoctorProfileDialog({
  open,
  onOpenChange,
  doctor,
  onBookAppointment
}: DoctorProfileDialogProps) {
  const { t, isLoaded } = useLanguage();
  
  if (!doctor) return null;

  if (!isLoaded) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t("doctors.profile")}</DialogTitle>
          </DialogHeader>
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-muted rounded"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("doctors.profile")}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="col-span-1 flex flex-col items-center">
            <img 
              src={doctor.avatar} 
              alt={doctor.name} 
              className="h-36 w-36 rounded-full object-cover border-4 border-primary/20 mb-4"
            />
            <h3 className="text-xl font-bold">{doctor.name}</h3>
            <p className="text-primary font-medium">{doctor.specialty}</p>
            
            <div className="flex items-center justify-center mt-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-2 font-medium">{doctor.rating}</span>
            </div>
            
            <div className="mt-4 flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span>{doctor.experience} of experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                <span>{doctor.hospital}</span>
              </div>
            </div>
            
            <Button 
              className="mt-6 w-full" 
              onClick={() => {
                onOpenChange(false);
                onBookAppointment(doctor);
              }}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {t("doctors.bookAppointment")}
            </Button>
          </div>
          
          <div className="col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="w-full">
                <TabsTrigger value="about" className="flex-1">{t("doctors.about")}</TabsTrigger>
                <TabsTrigger value="education" className="flex-1">{t("doctors.education")}</TabsTrigger>
                <TabsTrigger value="languages" className="flex-1">{t("doctors.languages")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="pt-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">{t("doctors.about")} {doctor.name}</h4>
                  <p className="text-muted-foreground">{doctor.bio}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="pt-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">{t("doctors.education")}</h4>
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <p className="font-medium">{doctor.education}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="languages" className="pt-4">
                <h4 className="font-semibold">{t("doctors.languagesSpoken")}</h4>
                <div className="flex flex-wrap gap-2 mt-3">
                  {doctor.languages?.map((language: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
