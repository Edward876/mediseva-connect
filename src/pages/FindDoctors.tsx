
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Search, MapPin, Calendar as CalendarIcon, Star, Filter, User, Award, Stethoscope, Clock, CalendarDays } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

// Sample doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospital: "City Heart Institute",
    location: "New York, NY",
    rating: 4.9,
    experience: "15 years",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    education: "MD - Cardiology, Harvard Medical School",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart diseases and conditions. She specializes in preventive cardiology and heart failure management.",
    languages: ["English", "Spanish"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    hospital: "Central Medical Center",
    location: "Boston, MA",
    rating: 4.8,
    experience: "12 years",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    education: "MD - Neurology, Johns Hopkins University",
    bio: "Dr. Chen is a specialist in neurological disorders with particular expertise in stroke treatment and neurodegenerative diseases. He is dedicated to providing comprehensive care using the latest advancements in neurological treatments.",
    languages: ["English", "Mandarin"],
  },
  {
    id: 3,
    name: "Dr. Emma Williams",
    specialty: "Pediatrics",
    hospital: "Children's Wellness Hospital",
    location: "Chicago, IL",
    rating: 4.9,
    experience: "10 years",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    education: "MD - Pediatrics, University of Chicago",
    bio: "Dr. Williams is a compassionate pediatrician who is devoted to the health and wellbeing of children from infancy through adolescence. She focuses on developmental pediatrics and preventive care.",
    languages: ["English", "French"],
  },
  {
    id: 4,
    name: "Dr. Robert Miller",
    specialty: "Orthopedics",
    hospital: "Sports Medicine Clinic",
    location: "Los Angeles, CA",
    rating: 4.7,
    experience: "18 years",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    education: "MD - Orthopedic Surgery, UCLA",
    bio: "Dr. Miller specializes in sports-related injuries and joint replacements. With extensive experience working with professional athletes, he brings specialized knowledge in recovery and rehabilitation protocols.",
    languages: ["English"],
  },
  {
    id: 5,
    name: "Dr. Lisa Patel",
    specialty: "Dermatology",
    hospital: "Skin & Aesthetic Center",
    location: "Miami, FL",
    rating: 4.8,
    experience: "9 years",
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    education: "MD - Dermatology, University of Miami",
    bio: "Dr. Patel is a board-certified dermatologist specializing in medical and cosmetic dermatology. She has expertise in treating various skin conditions and performing minimally invasive cosmetic procedures.",
    languages: ["English", "Hindi", "Gujarati"],
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Psychiatry",
    hospital: "Mind Wellness Clinic",
    location: "Seattle, WA",
    rating: 4.6,
    experience: "14 years",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    education: "MD - Psychiatry, University of Washington",
    bio: "Dr. Wilson is a psychiatrist who specializes in mood disorders, anxiety, and PTSD. He takes a holistic approach to mental health, combining medication management with therapy techniques for comprehensive care.",
    languages: ["English"],
  },
];

const specialties = [
  "All Specialties",
  "Cardiology",
  "Dermatology", 
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Oncology",
  "Ophthalmology",
  "Gynecology",
];

const locations = [
  "All Locations",
  "New York, NY",
  "Boston, MA",
  "Chicago, IL",
  "Los Angeles, CA",
  "Miami, FL",
  "Seattle, WA",
];

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
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Time slots available for booking
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
  ];

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
    setAppointmentDate(undefined);
    setSelectedSlot(null);
  };

  const handleConfirmBooking = () => {
    if (!appointmentDate || !selectedSlot) {
      toast({
        title: "Incomplete booking",
        description: "Please select both a date and time slot",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking process
    setTimeout(() => {
      setBookingSuccess(true);
      
      toast({
        title: "Appointment Booked",
        description: `Your appointment with ${selectedDoctor.name} is confirmed for ${format(appointmentDate, "PPP")} at ${selectedSlot}`,
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero section with search */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="max-container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Find the Right Doctor</h1>
              <p className="text-muted-foreground mb-8">
                Search from our network of qualified healthcare professionals
              </p>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Search by doctor name, specialty, or hospital..." 
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Select 
                    value={selectedSpecialty} 
                    onValueChange={setSelectedSpecialty}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select specialty" />
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
                    value={selectedLocation} 
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="mt-4" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" /> Search Doctors
              </Button>
            </div>
          </div>
        </section>
        
        {/* Results section */}
        <section className="py-12">
          <div className="max-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover-elevate">
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
                    <Button variant="outline" size="sm" onClick={() => handleViewProfile(doctor)}>
                      <User className="mr-2 h-4 w-4" /> View Profile
                    </Button>
                    <Button size="sm" onClick={() => handleBookAppointment(doctor)}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No doctors found matching your criteria</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialty("All Specialties");
                    setSelectedLocation("All Locations");
                    setSearchParams(new URLSearchParams());
                    setFilteredDoctors(doctors);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Doctor Profile Dialog */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="max-w-3xl">
            {selectedDoctor && (
              <>
                <DialogHeader>
                  <DialogTitle>Doctor Profile</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="col-span-1 flex flex-col items-center">
                    <img 
                      src={selectedDoctor.avatar} 
                      alt={selectedDoctor.name} 
                      className="h-36 w-36 rounded-full object-cover border-4 border-primary/20 mb-4"
                    />
                    <h3 className="text-xl font-bold">{selectedDoctor.name}</h3>
                    <p className="text-primary font-medium">{selectedDoctor.specialty}</p>
                    
                    <div className="flex items-center justify-center mt-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-2 font-medium">{selectedDoctor.rating}</span>
                    </div>
                    
                    <div className="mt-4 flex flex-col gap-2 w-full">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDoctor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDoctor.experience} of experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedDoctor.hospital}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="mt-6 w-full" 
                      onClick={() => {
                        setProfileOpen(false);
                        handleBookAppointment(selectedDoctor);
                      }}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                  </div>
                  
                  <div className="col-span-2">
                    <Tabs defaultValue="about">
                      <TabsList className="w-full">
                        <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                        <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
                        <TabsTrigger value="languages" className="flex-1">Languages</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="about" className="pt-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold">About {selectedDoctor.name}</h4>
                          <p className="text-muted-foreground">{selectedDoctor.bio}</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="education" className="pt-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Education</h4>
                          <div className="bg-secondary/10 p-3 rounded-lg">
                            <p className="font-medium">{selectedDoctor.education}</p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="languages" className="pt-4">
                        <h4 className="font-semibold">Languages Spoken</h4>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {selectedDoctor.languages.map((language: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {language}
                            </span>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Book Appointment Dialog */}
        <Dialog open={appointmentOpen} onOpenChange={setAppointmentOpen}>
          <DialogContent className="max-w-2xl">
            {selectedDoctor && !bookingSuccess && (
              <>
                <DialogHeader>
                  <DialogTitle>Book an Appointment</DialogTitle>
                  <DialogDescription>
                    Schedule an appointment with {selectedDoctor.name}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={selectedDoctor.avatar} 
                        alt={selectedDoctor.name} 
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{selectedDoctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h5 className="text-sm font-semibold mb-2">Select Date</h5>
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
                    <h5 className="text-sm font-semibold mb-4">Select Time Slot</h5>
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
                          Please select a date first
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button variant="outline" onClick={() => setAppointmentOpen(false)}>
                    Cancel
                  </Button>
                  <Button disabled={!appointmentDate || !selectedSlot} onClick={handleConfirmBooking}>
                    Confirm Booking
                  </Button>
                </DialogFooter>
              </>
            )}
            
            {bookingSuccess && (
              <div className="py-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                  <CalendarDays className="h-10 w-10 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Your appointment with {selectedDoctor.name} has been scheduled for{" "}
                  {appointmentDate && format(appointmentDate, "PPPP")} at {selectedSlot}.
                </p>
                
                <div className="bg-muted/20 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedDoctor.avatar} 
                      alt={selectedDoctor.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <h4 className="font-medium">{selectedDoctor.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                      <p className="text-sm">{selectedDoctor.hospital}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" onClick={() => setAppointmentOpen(false)}>
                    Close
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setAppointmentOpen(false);
                    navigate("/appointments");
                  }}>
                    View All Appointments
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
