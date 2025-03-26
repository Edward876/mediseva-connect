
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Laptop, Mail, GraduationCap, BookOpen, CalendarDays, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InternshipSection() {
  const benefits = [
    {
      icon: BookOpen,
      title: "Hands-on Learning",
      description: "Gain practical experience working alongside experienced medical professionals."
    },
    {
      icon: CalendarDays,
      title: "Flexible Schedules",
      description: "Internship opportunities with schedules that accommodate your academic commitments."
    },
    {
      icon: FileCheck,
      title: "Certification",
      description: "Receive official certification upon completion to enhance your medical career."
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-medium">Medical Internships</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Launch Your Medical Career with Valuable Internships
            </h2>
            
            <p className="text-muted-foreground">
              Mediseva connects medical students with experienced doctors for internship opportunities. 
              Gain practical experience, build your network, and advance your healthcare career.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link to="/internships">
                <Button className="space-x-2 w-full sm:w-auto">
                  <Laptop className="h-4 w-4" />
                  <span>Browse Internships</span>
                </Button>
              </Link>
              <Link to="/internship-application">
                <Button variant="outline" className="space-x-2 w-full sm:w-auto">
                  <Mail className="h-4 w-4" />
                  <span>Apply via Email</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] max-w-md mx-auto relative z-10">
              <img
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=80"
                alt="Medical students in training"
                className="rounded-2xl object-cover h-full w-full shadow-xl"
              />
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 border-8 border-dashed border-indigo-100 rounded-full opacity-70 animate-spin-slow"></div>
              
              <div className="absolute -bottom-6 -right-6 glass p-4 rounded-xl shadow-lg animate-float">
                <div className="text-center">
                  <p className="text-sm font-medium">Available Programs</p>
                  <p className="text-xl font-bold">20+ Specialties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
