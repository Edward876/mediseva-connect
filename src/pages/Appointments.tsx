
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Phone, Video, X, CheckCircle2, AlarmClock, MoreHorizontal } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample appointment data
const appointments = {
  upcoming: [
    {
      id: 1,
      doctor: {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      date: "May 15, 2023",
      time: "10:30 AM",
      type: "In-person",
      location: "City Heart Institute, New York",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Michael Chen",
        specialty: "Neurology",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      },
      date: "May 22, 2023",
      time: "2:00 PM",
      type: "Virtual",
      location: "Video consultation",
      status: "Confirmed",
    },
  ],
  past: [
    {
      id: 3,
      doctor: {
        name: "Dr. Lisa Patel",
        specialty: "Dermatology",
        avatar: "https://randomuser.me/api/portraits/women/37.jpg",
      },
      date: "April 10, 2023",
      time: "11:15 AM",
      type: "In-person",
      location: "Skin & Aesthetic Center, Miami",
      status: "Completed",
    },
    {
      id: 4,
      doctor: {
        name: "Dr. James Wilson",
        specialty: "Psychiatry",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      date: "March 28, 2023",
      time: "3:45 PM",
      type: "Virtual",
      location: "Video consultation",
      status: "Completed",
    },
    {
      id: 5,
      doctor: {
        name: "Dr. Emma Williams",
        specialty: "Pediatrics",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      date: "March 15, 2023",
      time: "9:00 AM",
      type: "In-person",
      location: "Children's Wellness Hospital, Chicago",
      status: "Cancelled",
    },
  ],
};

export default function Appointments() {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  useEffect(() => {
    document.title = "My Appointments - Mediseva";
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return (
          <div className="flex items-center text-sm font-medium text-green-600">
            <CheckCircle2 className="mr-1 h-4 w-4" />
            {status}
          </div>
        );
      case "Completed":
        return (
          <div className="flex items-center text-sm font-medium text-blue-600">
            <CheckCircle2 className="mr-1 h-4 w-4" />
            {status}
          </div>
        );
      case "Cancelled":
        return (
          <div className="flex items-center text-sm font-medium text-red-600">
            <X className="mr-1 h-4 w-4" />
            {status}
          </div>
        );
      default:
        return (
          <div className="flex items-center text-sm font-medium text-yellow-600">
            <AlarmClock className="mr-1 h-4 w-4" />
            {status}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Appointments</h1>
              <p className="text-muted-foreground mt-1">Manage your scheduled doctor appointments</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Calendar className="mr-2 h-4 w-4" />
              Book New Appointment
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {appointments.upcoming.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {appointments.upcoming.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <img 
                          src={appointment.doctor.avatar} 
                          alt={appointment.doctor.name} 
                          className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                          <CardTitle className="text-lg">{appointment.doctor.name}</CardTitle>
                          <CardDescription>{appointment.doctor.specialty}</CardDescription>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          {appointment.type === "Virtual" ? (
                            <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                          ) : (
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          )}
                          <span>{appointment.location}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <Button variant="outline" size="sm">
                          <Phone className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                        {appointment.type === "Virtual" ? (
                          <Button size="sm">
                            <Video className="mr-2 h-4 w-4" />
                            Join Call
                          </Button>
                        ) : (
                          <Button size="sm">
                            <MapPin className="mr-2 h-4 w-4" />
                            Directions
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No upcoming appointments</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any scheduled appointments coming up
                  </p>
                  <Button>Book an Appointment</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {appointments.past.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {appointments.past.map((appointment) => (
                    <Card key={appointment.id} className="opacity-90">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <img 
                          src={appointment.doctor.avatar} 
                          alt={appointment.doctor.name} 
                          className="h-16 w-16 rounded-full object-cover border-2 border-border grayscale"
                        />
                        <div>
                          <CardTitle className="text-lg">{appointment.doctor.name}</CardTitle>
                          <CardDescription>{appointment.doctor.specialty}</CardDescription>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Book Again</DropdownMenuItem>
                            <DropdownMenuItem>View Medical Records</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          {appointment.type === "Virtual" ? (
                            <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                          ) : (
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          )}
                          <span>{appointment.location}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        {appointment.status === "Completed" && (
                          <Button variant="outline" className="w-full">
                            Book Follow-up
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No past appointments</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any past appointment history
                  </p>
                  <Button>Book your first appointment</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
