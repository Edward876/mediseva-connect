import { useEffect } from "react";
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
import { PhoneCall, Ambulance, Clock, MapPin, Info, AlertTriangle, LocateFixed } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const emergencyLocations = [
  {
    id: 1,
    name: "Central Emergency Hospital",
    address: "123 Main Street, New York, NY 10001",
    phone: "(212) 555-1234",
    hours: "24/7",
    distance: "2.3 miles",
  },
  {
    id: 2,
    name: "City Medical Center",
    address: "456 Park Avenue, New York, NY 10022",
    phone: "(212) 555-5678",
    hours: "24/7",
    distance: "3.5 miles",
  },
  {
    id: 3,
    name: "Metropolitan Emergency Care",
    address: "789 Broadway, New York, NY 10003",
    phone: "(212) 555-9012",
    hours: "24/7",
    distance: "4.8 miles",
  },
];

export default function EmergencyService() {
  useEffect(() => {
    document.title = "Emergency Services - Mediseva";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Emergency Hero */}
        <section className="bg-red-50 dark:bg-red-950/30 border-b border-red-100 dark:border-red-900/50">
          <div className="max-container py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 px-4 py-2 rounded-full mb-6">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Emergency Services</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  24/7 Emergency Medical Assistance
                </h1>
                <p className="text-lg mb-8">
                  If you are experiencing a medical emergency, please call emergency services immediately or go to your nearest emergency room.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white">
                    <PhoneCall className="mr-2 h-5 w-5" />
                    Call Emergency
                  </Button>
                  <Button variant="outline" size="lg" className="dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">
                    <Ambulance className="mr-2 h-5 w-5" />
                    Request Ambulance
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Emergency Medical Team" 
                  className="rounded-lg shadow-lg max-h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact Information */}
        <section className="py-12 bg-background">
          <div className="max-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Emergency Locations Near You</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find the closest emergency care facilities to your current location
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <Button className="w-full sm:w-auto">
                <LocateFixed className="mr-2 h-4 w-4" />
                Use My Current Location
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyLocations.map((location) => (
                <Card key={location.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription>Distance: {location.distance}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneCall className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{location.hours}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Get Directions</Button>
                    <Button>Call</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* What is an Emergency */}
        <section className="py-12 bg-muted/30 dark:bg-muted/10">
          <div className="max-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Info className="mr-2 h-5 w-5 text-primary" />
                What Constitutes a Medical Emergency?
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A medical emergency is a sudden and serious condition that requires immediate medical attention to prevent death or severe harm. If you experience any of the following symptoms, seek emergency care immediately:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Difficulty breathing, shortness of breath</li>
                  <li>Chest or upper abdominal pain or pressure</li>
                  <li>Fainting, sudden dizziness, weakness</li>
                  <li>Changes in vision</li>
                  <li>Confusion or changes in mental status</li>
                  <li>Any sudden or severe pain</li>
                  <li>Uncontrolled bleeding</li>
                  <li>Severe or persistent vomiting or diarrhea</li>
                  <li>Coughing or vomiting blood</li>
                  <li>Suicidal or homicidal feelings</li>
                  <li>Difficulty speaking, sudden confusion, or altered consciousness</li>
                  <li>Unusual abdominal pain</li>
                </ul>
                
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md border border-red-100 dark:border-red-900/50 mt-6">
                  <p className="text-red-700 dark:text-red-400 font-medium flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                    <span>
                      If you are experiencing a life-threatening emergency, call emergency services (911) immediately or go to the nearest emergency room.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-container text-center">
            <h2 className="text-3xl font-bold mb-4">Need Medical Advice?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              For non-emergency situations, our healthcare professionals are available to provide guidance and support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" className="border-primary-foreground hover:bg-primary-foreground/20">
                Chat with a Doctor
              </Button>
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
