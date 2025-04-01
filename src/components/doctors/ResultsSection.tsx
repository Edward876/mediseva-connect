
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import DoctorCard from "./DoctorCard";

interface ResultsSectionProps {
  filteredDoctors: any[];
  handleViewProfile: (doctor: any) => void;
  handleBookAppointment: (doctor: any) => void;
  clearFilters: () => void;
}

export default function ResultsSection({
  filteredDoctors,
  handleViewProfile,
  handleBookAppointment,
  clearFilters
}: ResultsSectionProps) {
  return (
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
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onViewProfile={handleViewProfile}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </div>
        
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No doctors found matching your criteria</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
