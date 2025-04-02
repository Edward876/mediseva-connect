
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchSection from "@/components/doctors/SearchSection";
import ResultsSection from "@/components/doctors/ResultsSection";
import DoctorProfileDialog from "@/components/doctors/DoctorProfileDialog";
import AppointmentBookingDialog from "@/components/doctors/AppointmentBookingDialog";
import { doctors, specialties } from "@/components/doctors/DoctorData";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { indianStates } from "@/utils/indianLocations";

export default function FindDoctors() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t("doctors.title")} - ${t("app.title")}`;
    
    // Get URL parameters for initial filtering
    const specialty = searchParams.get("specialty");
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const query = searchParams.get("query");
    
    if (specialty) {
      const formattedSpecialty = specialty.charAt(0).toUpperCase() + specialty.slice(1);
      const matchingSpecialty = specialties.find(s => 
        s.toLowerCase() === formattedSpecialty.toLowerCase() ||
        s === "All Specialties"
      ) || "All Specialties";
      
      setSelectedSpecialty(matchingSpecialty);
    }
    
    if (state) {
      const matchingState = indianStates.find(s => 
        s.name.toLowerCase() === state.toLowerCase() ||
        s.name === "All States"
      )?.name || "All States";
      
      setSelectedState(matchingState);
    }
    
    if (city) {
      setSelectedCity(city);
    }
    
    if (query) {
      setSearchTerm(query);
    }
    
    // Filter doctors based on search and filters
    filterDoctors();
  }, []); // Empty dependency array for initial load

  useEffect(() => {
    // Filter doctors based on search and filters whenever filters change
    filterDoctors();
  }, [searchTerm, selectedSpecialty, selectedState, selectedCity]);

  const filterDoctors = () => {
    const results = doctors.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === "All Specialties" || 
                             doctor.specialty === selectedSpecialty;
                             
      // Extract state from doctor.location (format: "City, State")
      const doctorState = doctor.location.split(", ")[1];
      const doctorCity = doctor.location.split(", ")[0];
      
      const matchesState = selectedState === "All States" || 
                         doctorState === selectedState;
                         
      const matchesCity = selectedCity === "All Cities" || 
                        doctorCity === selectedCity;
      
      return matchesSearch && matchesSpecialty && matchesState && matchesCity;
    });
    
    setFilteredDoctors(results);
  };

  const handleSearch = () => {
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (selectedSpecialty !== "All Specialties") {
      params.set("specialty", selectedSpecialty.toLowerCase());
    }
    if (selectedState !== "All States") {
      params.set("state", selectedState.toLowerCase());
    }
    if (selectedCity !== "All Cities") {
      params.set("city", selectedCity);
    }
    if (searchTerm) {
      params.set("query", searchTerm);
    }
    setSearchParams(params);
    
    // Filter doctors
    filterDoctors();
  };

  const handleViewProfile = (doctor: any) => {
    setSelectedDoctor(doctor);
    setProfileOpen(true);
  };

  const handleBookAppointment = (doctor: any) => {
    // Check if user is logged in
    const user = localStorage.getItem("mediseva_user");
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setSelectedDoctor(doctor);
    setAppointmentOpen(true);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (date: Date, slot: string) => {
    // Simulate booking process
    setTimeout(() => {
      setBookingSuccess(true);
      
      toast({
        title: "Appointment Booked",
        description: `Your appointment with ${selectedDoctor.name} is confirmed for ${format(date, "PPP")} at ${slot}`,
      });
    }, 1000);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("All Specialties");
    setSelectedState("All States");
    setSelectedCity("All Cities");
    setSearchParams(new URLSearchParams());
    setFilteredDoctors(doctors);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SearchSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          handleSearch={handleSearch}
          specialties={specialties}
        />
        
        <ResultsSection 
          filteredDoctors={filteredDoctors}
          handleViewProfile={handleViewProfile}
          handleBookAppointment={handleBookAppointment}
          clearFilters={clearFilters}
        />

        {/* Doctor Profile Dialog */}
        <DoctorProfileDialog 
          open={profileOpen}
          onOpenChange={setProfileOpen}
          doctor={selectedDoctor}
          onBookAppointment={handleBookAppointment}
        />

        {/* Book Appointment Dialog */}
        <AppointmentBookingDialog 
          open={appointmentOpen}
          onOpenChange={setAppointmentOpen}
          doctor={selectedDoctor}
          onConfirmBooking={handleConfirmBooking}
          bookingSuccess={bookingSuccess}
        />
      </main>
      <Footer />
    </div>
  );
}
