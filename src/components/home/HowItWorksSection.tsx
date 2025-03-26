
import { CheckCircle2, Calendar, Stethoscope, Search } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Find a Doctor",
      description: "Search for specialists by specialty, location, or name to find the right doctor for your needs.",
      icon: Search,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Book Appointment",
      description: "Choose a convenient time slot from the doctor's available schedule and confirm your appointment.",
      icon: Calendar,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Get Care",
      description: "Visit the doctor at the scheduled time for your consultation and receive quality healthcare.",
      icon: Stethoscope,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Follow Up",
      description: "Access your medical history, prescriptions, and schedule follow-up appointments as needed.",
      icon: CheckCircle2,
      color: "bg-amber-100 text-amber-600",
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-mediseva-50/60 section-padding">
      <div className="max-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h6 className="text-sm font-semibold text-primary mb-2">Simple Process</h6>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            How Mediseva Works
          </h2>
          <p className="text-muted-foreground">
            Our platform makes healthcare accessible with a streamlined process. 
            Find doctors, book appointments, and receive care in just a few steps.
          </p>
        </div>
        
        <div className="relative">
          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full ${step.color.split(' ')[0]} flex items-center justify-center mb-2`}>
                    <step.icon className={`h-8 w-8 ${step.color.split(' ')[1]}`} />
                    <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-white border-2 border-mediseva-100 flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Connector line between steps (visible on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%_-_16px)] w-[calc(100%_-_64px)] h-[2px] bg-gradient-to-r from-mediseva-200 to-mediseva-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
