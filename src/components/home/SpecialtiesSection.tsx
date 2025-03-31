
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Brain, Eye, Bone, User, Baby, Pill, Thermometer, Stethoscope, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const specialties = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    description: "Heart care specialists treating cardiovascular conditions.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: Brain,
    description: "Specialists in nervous system disorders and conditions.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    icon: Eye,
    description: "Eye care and treatment for vision-related conditions.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    description: "Treatment for bone, joint, and musculoskeletal issues.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: Baby,
    description: "Healthcare for infants, children, and adolescents.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    icon: User,
    description: "Skin, hair, and nail treatments and care.",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    id: "dentistry",
    name: "Dentistry",
    icon: Scissors,
    description: "Oral health care, treatments, and procedures.",
    color: "text-sky-500",
    bgColor: "bg-sky-50",
  },
  {
    id: "general",
    name: "General Physician",
    icon: Stethoscope,
    description: "Primary healthcare for general medical conditions.",
    color: "text-mediseva-600",
    bgColor: "bg-mediseva-50",
  }
];

export default function SpecialtiesSection() {
  const handleSpecialtyClick = (specialtyId: string) => {
    // Create a URL with the specialty parameter
    const searchParams = new URLSearchParams();
    searchParams.append("specialty", specialtyId);
    window.location.href = `/find-doctors?${searchParams.toString()}`;
  };

  return (
    <section className="section-padding max-container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h6 className="text-sm font-semibold text-primary mb-2">Our Specialties</h6>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Find Care Across Specialties
        </h2>
        <p className="text-muted-foreground">
          Connect with specialized healthcare professionals across various medical fields. 
          Our platform ensures you find the right doctor for your specific health needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {specialties.map((specialty, index) => (
          <Card key={specialty.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-14 h-14 rounded-full ${specialty.bgColor} flex items-center justify-center`}>
                  <specialty.icon className={`h-7 w-7 ${specialty.color}`} />
                </div>
                <h3 className="font-semibold text-lg">{specialty.name}</h3>
                <p className="text-sm text-muted-foreground">{specialty.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleSpecialtyClick(specialty.id)}
                >
                  Find Doctors
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <Button variant="outline" asChild>
          <Link to="/find-doctors">
            View All Specialties
          </Link>
        </Button>
      </div>
    </section>
  );
}
