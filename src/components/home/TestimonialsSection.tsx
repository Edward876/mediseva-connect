
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Sraboni Mukherjee",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    role: "Patient",
    content: "Mediseva made finding the right cardiologist incredibly easy. The booking process was seamless, and I received excellent care. Highly recommend their service for anyone looking for quality healthcare.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ajay Agarwal",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    role: "Patient",
    content: "In an emergency situation, Mediseva's quick response system was a lifesaver. I was connected to emergency services within minutes without needing to log in. Their emergency feature is truly valuable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Manisha Singh",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "Neurologist",
    content: "As a doctor on Mediseva, I've been able to connect with patients who truly need my expertise. The platform makes scheduling and appointment management effortless, allowing me to focus on providing care.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sagar Sen",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "Medical Student",
    content: "The internship opportunities through Mediseva opened doors for my medical career. I was matched with a mentor in my field of interest, and the experience has been invaluable for my professional development.",
    rating: 4,
  },
  {
    id: 5,
    name: "Priya Patel",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    role: "Patient",
    content: "The symptom checker chatbot helped me identify that I needed to see a dermatologist for my condition. It saved me time and directed me to the right specialist immediately. Amazing feature!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = 3;
  const maxIndex = testimonials.length - visibleTestimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleItems = testimonials.slice(
    currentIndex,
    currentIndex + visibleTestimonials
  );

  return (
    <section className="section-padding max-container overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h6 className="text-sm font-semibold text-primary mb-2">Testimonials</h6>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          What Our Users Say
        </h2>
        <p className="text-muted-foreground">
          Hear from patients, doctors, and medical students who have experienced 
          the difference Mediseva brings to healthcare connections.
        </p>
      </div>

      {/* Desktop Testimonials */}
      <div className="hidden md:block relative">
        <div className="flex space-x-6 transition-all duration-300 ease-in-out">
          {visibleItems.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="h-10 w-10 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className="h-10 w-10 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Testimonials (single testimonial view) */}
      <div className="md:hidden">
        <TestimonialCard testimonial={testimonials[currentIndex]} />
        
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="h-10 w-10 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex((prev) => Math.min(testimonials.length - 1, prev + 1))}
            disabled={currentIndex === testimonials.length - 1}
            className="h-10 w-10 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <Card className="flex-1 border-0 shadow-sm">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <Quote className="h-8 w-8 text-mediseva-200" />
        </div>
        
        <p className="text-muted-foreground flex-grow mb-6">
          "{testimonial.content}"
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
          
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
