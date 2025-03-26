
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PhoneCall, Clock, Shield, AlertTriangle } from "lucide-react";

export default function EmergencySection() {
  return (
    <section className="section-padding bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
      <div className="max-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=80"
                alt="Emergency medical team"
                className="rounded-2xl object-cover h-full w-full shadow-xl"
              />
              
              {/* Stats cards */}
              <div className="absolute -top-6 -right-6 glass p-4 rounded-xl shadow-lg animate-pulse-light dark:bg-black/50">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-red-600 dark:text-red-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium dark:text-gray-300">Response time</p>
                    <p className="text-xl font-bold dark:text-white">Under 15 min</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-xl shadow-lg animate-float dark:bg-black/50">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium dark:text-gray-300">Available</p>
                    <p className="text-xl font-bold dark:text-white">24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">24/7 Emergency Service</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold dark:text-white">
              Immediate Medical Assistance Without Any Barriers
            </h2>
            
            <p className="text-muted-foreground dark:text-gray-300">
              Our emergency service is available 24/7 with no login required. In critical situations, 
              we prioritize immediate care through our network of emergency specialists and hospitals.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-red-300"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">No Login Required</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Access emergency services instantly without creating an account or logging in.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-red-300"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">Priority Response</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Get immediate attention and response from our emergency care specialists.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-red-300"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">Hospital Network</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Connected to nearest hospitals and emergency rooms for swift transfer if needed.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Link to="/emergency-service">
                <Button className="bg-red-600 hover:bg-red-700 text-white space-x-2 dark:bg-red-700 dark:hover:bg-red-800">
                  <PhoneCall className="h-4 w-4" />
                  <span>Access Emergency Service</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
