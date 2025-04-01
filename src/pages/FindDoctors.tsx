
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchSection from "@/components/doctors/SearchSection";
import ResultsSection from "@/components/doctors/ResultsSection";
import DoctorProfileDialog from "@/components/doctors/DoctorProfileDialog";
import AppointmentBookingDialog from "@/components/doctors/AppointmentBookingDialog";
import { doctors, specialties, locations } from "@/components/doctors/DoctorData";
import { format } from "date-fns";

export default function FindDoctors() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    document.title = "Find Doctors - Mediseva";
    
    // Get URL parameters for initial filtering
    const specialty = searchParams.get("specialty");
    const query = searchParams.get("query");
    
    if (specialty) {
      // Handle specialty parameter
      const formattedSpecialty = specialty.charAt(0).toUpperCase() + specialty.slice(1);
      const matchingSpecialty = specialties.find(s => 
        s.toLowerCase() === formattedSpecialty.toLowerCase() ||
        s === "All Specialties"
      ) || "All Specialties";
      
      setSelectedSpecialty(matchingSpecialty);
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
  }, [searchTerm, selectedSpecialty, selectedLocation]);

  const filterDoctors = () => {
    const results = doctors.filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === "All Specialties" || 
                             doctor.specialty === selectedSpecialty;
                             
      const matchesLocation = selectedLocation === "All Locations" || 
                            doctor.location === selectedLocation;
      
      return matchesSearch && matchesSpecialty && matchesLocation;
    });
    
    setFilteredDoctors(results);
  };

  const handleSearch = () => {
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (selectedSpecialty !== "All Specialties") {
      params.set("specialty", selectedSpecialty.toLowerCase());
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
    setSelectedLocation("All Locations");
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
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          handleSearch={handleSearch}
          specialties={specialties}
          locations={locations}
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
