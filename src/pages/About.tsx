import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Award, Users, Heart, Globe, Lightbulb, Clock, User, Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function About() {
  useEffect(() => {
    document.title = "About Us - Mediseva";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="max-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Mediseva</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Improving healthcare accessibility, one connection at a time
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-24 bg-primary rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                   MediSeva emerged from an unexpected source—a second-year Digital Thinking and Innovation course assignment that pushed friends Supratim Saha and Vishank Jain beyond classroom thinking. Their conversation about healthcare disparities, particularly Vishank's grandmother struggling to access medications in her village, transformed academic theory into practical purpose. What began as meeting course requirements quickly became a mission to bridge the rural-urban healthcare divide.
                  </p>
                  <p>
                    The two friends built MediSeva by leveraging their complementary strengths: Vishank's technical expertise paired perfectly with Supratim's deep understanding of rural healthcare challenges. They designed a platform connecting remote villages with urban pharmacies and created a network of "MediSeva Bandhu"—local youth trained to help elderly residents navigate the service and understand their medications.
                  </p>
                  <p>
                   Their project's evolution from classroom assignment to functioning startup demonstrates how education becomes most powerful when connected to real human needs. Through field research, prototype testing, and continuous refinement, Supratim and Vishank transformed their college course project into a meaningful innovation serving multiple villages and creating both healthcare access and local employment opportunities.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3271&q=80" 
                  alt="Medical Team" 
                  className="rounded-lg shadow-lg w-full object-cover h-[400px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border border-border">
                  <div className="flex items-center text-primary">
                    <ShieldCheck className="h-8 w-8 mr-2" />
                    <div>
                      <p className="font-bold text-2xl">2025</p>
                      <p className="text-sm">Founded</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission and Values */}
        <section className="py-16 bg-muted/30">
          <div className="max-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We are guided by a set of core principles that influence everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border hover-elevate text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Patient-Centered Care</h3>
                <p className="text-muted-foreground">
                  We put patients first in everything we do, ensuring their needs, preferences, and values guide our decisions.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border hover-elevate text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We strive to make quality healthcare accessible to everyone, regardless of location or circumstances.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border hover-elevate text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in our platform, our network of doctors, and our service to patients.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border hover-elevate text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our services through technological innovation and creative problem-solving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="max-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated professionals leading Mediseva forward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg border border-border overflow-hidden group">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="https://i.postimg.cc/FsFGGqwF/IMG20240317222334-EDIT-EDIT.jpg" 
                    alt="Supratim Saha" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Supratim Saha</h3>
                  <p className="text-primary mb-3">Team Lead</p>
                  <p className="text-muted-foreground mb-4">
                    AIML DEV, WEB DEV.
                  </p>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border overflow-hidden group">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="https://i.postimg.cc/9MpZ7Xmd/Whats-App-Image-2025-04-02-at-2-31-13-PM.jpg" 
                    alt="Vishank Jain" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Vishank Jain</h3>
                  <p className="text-primary mb-3">Research Expert, Finance</p>
                  <p className="text-muted-foreground mb-4">
                    AIML dev, R & D.
                  </p>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-lg opacity-90 flex items-center justify-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Registered Patients</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  <span>Qualified Doctors</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">30+</div>
                <div className="text-lg opacity-90 flex items-center justify-center">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>Cities Served</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90 flex items-center justify-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Available Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="py-16">
          <div className="max-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions or feedback? We'd love to hear from you. Reach out to our team using any of the following methods.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Our Headquarters</h3>
                      <p className="text-muted-foreground">
                        Bennett Univesity<br />
                        Greater Noida, Uttar Pradesh, INDIA
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <p className="text-muted-foreground">
                        General Inquiries: info@mediseva.com<br />
                        Support: support@mediseva.com<br />
                        Media: media@mediseva.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <p className="text-muted-foreground">
                        General: +91 8509511195<br />
                        Patient Support: 1800 633-4738<br />
                        Doctor Support: 1800 633-4739
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-8 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
