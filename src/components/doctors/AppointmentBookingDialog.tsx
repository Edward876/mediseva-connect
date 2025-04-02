
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, CalendarDays } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: any;
  onConfirmBooking: (date: Date, slot: string) => void;
  bookingSuccess: boolean;
}

export default function AppointmentBookingDialog({
  open,
  onOpenChange,
  doctor,
  onConfirmBooking,
  bookingSuccess
}: AppointmentBookingDialogProps) {
  const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const { t, isLoaded } = useLanguage();
  
  // Time slots available for booking
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
  ];

  const handleConfirmBooking = () => {
    if (!appointmentDate || !selectedSlot) return;
    onConfirmBooking(appointmentDate, selectedSlot);
  };

  if (!doctor || !isLoaded) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {!bookingSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>{t("doctors.bookAppointment")}</DialogTitle>
              <DialogDescription>
                {t("doctors.scheduleWith")} {doctor.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={doctor.avatar} 
                    alt={doctor.name} 
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h5 className="text-sm font-semibold mb-2">{t("doctors.selectDate")}</h5>
                  <Calendar
                    mode="single"
                    selected={appointmentDate}
                    onSelect={setAppointmentDate}
                    className="rounded-md border"
                    disabled={(date) => 
                      date < new Date() || // Can't select past dates
                      date.getDay() === 0 || // Disable Sundays
                      date.getDay() === 6 // Disable Saturdays
                    }
                  />
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold mb-4">{t("doctors.selectTimeSlot")}</h5>
                {appointmentDate ? (
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        type="button"
                        variant={selectedSlot === slot ? "default" : "outline"}
                        className={`text-sm justify-center h-11 ${selectedSlot === slot ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <Clock className="h-3 w-3 mr-2" /> {slot}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-60 border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground text-center">
                      {t("doctors.selectDateFirst")}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {t("common.cancel")}
              </Button>
              <Button disabled={!appointmentDate || !selectedSlot} onClick={handleConfirmBooking}>
                {t("doctors.confirmBooking")}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <CalendarDays className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">{t("doctors.bookingConfirmed")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("doctors.appointmentScheduled")} {doctor.name} {t("doctors.scheduledFor")}{" "}
              {appointmentDate && format(appointmentDate, "PPPP")} {t("doctors.at")} {selectedSlot}.
            </p>
            
            <div className="bg-muted/20 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="flex items-center space-x-4">
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name} 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-medium">{doctor.name}</h4>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <p className="text-sm">{doctor.hospital}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {t("common.close")}
              </Button>
              <Button variant="outline" onClick={() => {
                onOpenChange(false);
                navigate("/appointments");
              }}>
                {t("doctors.viewAllAppointments")}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
