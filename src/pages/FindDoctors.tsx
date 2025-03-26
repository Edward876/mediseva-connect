
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { Search, MapPin, Calendar, Star, Filter } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    document.title = "Find Doctors - Mediseva";
    
    // Filter doctors based on search and filters
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
  }, [searchTerm, selectedSpecialty, selectedLocation]);

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
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
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
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
