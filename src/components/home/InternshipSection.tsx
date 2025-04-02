
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Laptop, Mail, GraduationCap, BookOpen, CalendarDays, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InternshipSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: BookOpen,
      title: t("clinicalExposure.handsOnLearning"),
      description: t("clinicalExposure.handsOnDescription")
    },
    {
      icon: CalendarDays,
      title: t("clinicalExposure.flexibleSchedules"),
      description: t("clinicalExposure.flexibleDescription")
    },
    {
      icon: FileCheck,
      title: t("clinicalExposure.certification"),
      description: t("clinicalExposure.certificationDescription")
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
      <div className="max-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-medium">{t("clinicalExposure.title")}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold dark:text-white">
              {t("clinicalExposure.heading")}
            </h2>
            
            <p className="text-muted-foreground dark:text-gray-300">
              {t("clinicalExposure.description")}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-sm dark:bg-gray-800/40 dark:border dark:border-gray-700">
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                      </div>
                      <h3 className="font-semibold dark:text-white">{benefit.title}</h3>
                      <p className="text-xs text-muted-foreground dark:text-gray-300">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link to="/clinical-exposure">
                <Button className="space-x-2 w-full sm:w-auto dark:bg-primary dark:text-white">
                  <Laptop className="h-4 w-4" />
                  <span>{t("clinicalExposure.browsePrograms")}</span>
                </Button>
              </Link>
              <Link to="/clinical-exposure-application">
                <Button variant="outline" className="space-x-2 w-full sm:w-auto dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Mail className="h-4 w-4" />
                  <span>{t("clinicalExposure.applyViaEmail")}</span>
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 border-8 border-dashed border-indigo-100 dark:border-indigo-900 rounded-full opacity-70 animate-spin-slow"></div>
              
              <div className="absolute -bottom-6 -right-6 glass p-4 rounded-xl shadow-lg animate-float dark:bg-black/50">
                <div className="text-center">
                  <p className="text-sm font-medium dark:text-gray-300">{t("clinicalExposure.availablePrograms")}</p>
                  <p className="text-xl font-bold dark:text-white">20+ {t("clinicalExposure.specialties")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
