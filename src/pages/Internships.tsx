
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
import { GraduationCap, Clock, Calendar, MapPin, ArrowRight, FileText, Briefcase, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const internships = [
  {
    id: 1,
    title: "Medical Research Internship",
    department: "Cardiology Research",
    location: "New York, NY",
    duration: "6 months",
    startDate: "September 2023",
    type: "Full-time",
    description: "Work alongside leading cardiologists on groundbreaking research projects related to cardiovascular diseases and treatments.",
    requirements: [
      "Currently pursuing a degree in Medicine, Biology, or related field",
      "Strong academic record",
      "Basic understanding of research methodologies",
      "Excellent analytical skills"
    ]
  },
  {
    id: 2,
    title: "Clinical Practice Internship",
    department: "General Medicine",
    location: "Boston, MA",
    duration: "3 months",
    startDate: "October 2023",
    type: "Full-time",
    description: "Gain hands-on experience in a clinical setting, shadowing experienced doctors and learning about patient care and management.",
    requirements: [
      "Medical students in their 3rd or 4th year",
      "Good academic standing",
      "Excellent communication skills",
      "Compassionate attitude towards patients"
    ]
  },
  {
    id: 3,
    title: "Healthcare Administration Internship",
    department: "Hospital Management",
    location: "Chicago, IL",
    duration: "4 months",
    startDate: "November 2023",
    type: "Part-time",
    description: "Learn about healthcare management, hospital operations, and administrative procedures in a busy medical center.",
    requirements: [
      "Pursuing a degree in Healthcare Administration, Business, or related field",
      "Strong organizational skills",
      "Proficiency in MS Office",
      "Interest in healthcare systems"
    ]
  },
  {
    id: 4,
    title: "Public Health Internship",
    department: "Community Health",
    location: "Los Angeles, CA",
    duration: "6 months",
    startDate: "January 2024",
    type: "Full-time",
    description: "Participate in community health initiatives, health education programs, and public health research projects.",
    requirements: [
      "Pursuing a degree in Public Health, Community Health, or related field",
      "Strong interest in community health issues",
      "Good communication and interpersonal skills",
      "Ability to work with diverse populations"
    ]
  },
  {
    id: 5,
    title: "Telemedicine Technology Internship",
    department: "Digital Health",
    location: "Remote",
    duration: "3 months",
    startDate: "December 2023",
    type: "Part-time",
    description: "Work on innovative telemedicine solutions, helping to develop and improve digital healthcare delivery platforms.",
    requirements: [
      "Background in Computer Science, Health Informatics, or related field",
      "Programming skills (preferably JavaScript, React)",
      "Understanding of healthcare systems",
      "Interest in digital health solutions"
    ]
  },
  {
    id: 6,
    title: "Medical Technology Innovation Internship",
    department: "MedTech Research",
    location: "San Francisco, CA",
    duration: "6 months",
    startDate: "February 2024",
    type: "Full-time",
    description: "Join our medical technology team to develop innovative solutions for healthcare challenges using cutting-edge technology.",
    requirements: [
      "Background in Biomedical Engineering, Computer Science, or related field",
      "Knowledge of medical devices and technologies",
      "Creative problem-solving skills",
      "Collaborative team player"
    ]
  }
];

export default function Internships() {
  useEffect(() => {
    document.title = "Medical Internships - Mediseva";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="max-container text-center">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <GraduationCap className="h-5 w-5 mr-2" />
              <span className="font-medium">Medical Internships</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Your Medical Career with Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Gain valuable experience and knowledge through our comprehensive medical internship programs
            </p>
            <Button size="lg" asChild>
              <Link to="/internship-application">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Why Choose Our Internships */}
        <section className="py-16">
          <div className="max-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Internships</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our carefully designed programs offer unique opportunities for growth and learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border hover-elevate">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
                <p className="text-muted-foreground">
                  Work directly with experienced medical professionals who will guide you throughout your internship journey.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border hover-elevate">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hands-on Experience</h3>
                <p className="text-muted-foreground">
                  Gain practical skills through direct involvement in patient care, research, or administration.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border hover-elevate">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Development</h3>
                <p className="text-muted-foreground">
                  Build your professional network and develop skills that will enhance your career prospects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Internships */}
        <section className="py-16 bg-muted/30">
          <div className="max-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Available Internship Programs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our current internship opportunities across various medical disciplines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {internships.map((internship) => (
                <Card key={internship.id} className="hover-elevate">
                  <CardHeader>
                    <CardTitle>{internship.title}</CardTitle>
                    <CardDescription>{internship.department}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{internship.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{internship.type}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {internship.description}
                    </p>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {internship.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link to={`/internship-application?id=${internship.id}`}>
                        Apply Now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16">
          <div className="max-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Application Process</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mr-4">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Submit Application</h3>
                      <p className="text-muted-foreground">
                        Complete the online application form with your personal details, educational background, and relevant experience.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mr-4">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Document Review</h3>
                      <p className="text-muted-foreground">
                        Our team will review your application, resume, and supporting documents to assess your qualifications.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mr-4">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Interview</h3>
                      <p className="text-muted-foreground">
                        Selected candidates will be invited for an interview with the department supervisor or team lead.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mr-4">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Selection & Onboarding</h3>
                      <p className="text-muted-foreground">
                        Successful applicants will receive an offer letter and begin the onboarding process for their internship.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-8" size="lg" asChild>
                  <Link to="/internship-application">
                    <FileText className="mr-2 h-5 w-5" />
                    Start Your Application
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Medical Interns" 
                  className="rounded-lg shadow-lg w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-lg shadow-lg border border-border">
                  <div className="flex items-center">
                    <GraduationCap className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <p className="font-bold text-xl">200+</p>
                      <p className="text-sm text-muted-foreground">Annual Interns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-container text-center">
            <h2 className="text-3xl font-bold mb-12">What Our Interns Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <p className="italic mb-6">
                  "My internship at Mediseva was a transformative experience. The mentorship I received helped me develop both clinical skills and professional confidence."
                </p>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/32.jpg" 
                    alt="Jessica Williams" 
                    className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-white/30"
                  />
                  <div className="text-left">
                    <p className="font-semibold">Jessica Williams</p>
                    <p className="text-sm opacity-80">Medical Research Intern</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <p className="italic mb-6">
                  "The hands-on experience I gained during my clinical practice internship was invaluable. I worked with amazing doctors who were always willing to teach and guide me."
                </p>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://randomuser.me/api/portraits/men/54.jpg" 
                    alt="David Thompson" 
                    className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-white/30"
                  />
                  <div className="text-left">
                    <p className="font-semibold">David Thompson</p>
                    <p className="text-sm opacity-80">Clinical Practice Intern</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <p className="italic mb-6">
                  "My internship in healthcare administration opened my eyes to the complexity of hospital operations. The skills I developed have been crucial for my career advancement."
                </p>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/67.jpg" 
                    alt="Michelle Lee" 
                    className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-white/30"
                  />
                  <div className="text-left">
                    <p className="font-semibold">Michelle Lee</p>
                    <p className="text-sm opacity-80">Healthcare Admin Intern</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Medical Journey?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Apply today for our internship programs and take the first step towards a successful medical career.
            </p>
            <Button size="lg" className="px-8" asChild>
              <Link to="/internship-application">
                Apply for an Internship
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
