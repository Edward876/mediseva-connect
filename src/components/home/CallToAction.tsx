
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="section-padding bg-gradient-to-br from-mediseva-600 to-mediseva-800">
      <div className="max-container">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Your Health Journey Begins With Expert Care
          </h2>
          <p className="text-mediseva-100">
            Connect with the right healthcare professionals, book appointments effortlessly, 
            and take control of your health with Mediseva.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/find-doctors">
              <Button size="lg" className="bg-white text-mediseva-700 hover:bg-mediseva-50 w-full sm:w-auto">
                Find a Doctor Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
                Create an Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
