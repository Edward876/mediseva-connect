
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, getCurrentUser } from "@/utils/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, Mail, Phone, User as UserIcon } from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    document.title = t("profile.title") + " - Mediseva";
    
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, [t]);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8 px-4">
          <div className="max-container">
            {user ? (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Card className="w-full md:w-1/3">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <CardTitle className="text-2xl">{user.name}</CardTitle>
                      <CardDescription>{user.role === 'patient' ? t("profile.patient") : t("profile.doctor")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                        {user.role === 'doctor' && user.specialty && (
                          <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-muted-foreground" />
                            <span>{user.specialty}</span>
                          </div>
                        )}
                        {user.role === 'doctor' && user.hospital && (
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span>{user.hospital}</span>
                          </div>
                        )}
                        <div className="pt-4">
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => navigate('/settings')}
                          >
                            {t("profile.editProfile")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="w-full md:w-2/3">
                    <Tabs defaultValue="appointments" className="w-full">
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="appointments">{t("profile.appointments")}</TabsTrigger>
                        <TabsTrigger value="history">{t("profile.history")}</TabsTrigger>
                      </TabsList>
                      <TabsContent value="appointments">
                        <Card>
                          <CardHeader>
                            <CardTitle>{t("profile.upcomingAppointments")}</CardTitle>
                            <CardDescription>{t("profile.manageAppointments")}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                              <Calendar className="mx-auto h-10 w-10 mb-3" />
                              <p>{t("profile.noUpcomingAppointments")}</p>
                              <Button onClick={() => navigate("/find-doctors")} className="mt-4">
                                {t("profile.findDoctors")}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="history">
                        <Card>
                          <CardHeader>
                            <CardTitle>{t("profile.medicalHistory")}</CardTitle>
                            <CardDescription>{t("profile.pastAppointments")}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                              <Clock className="mx-auto h-10 w-10 mb-3" />
                              <p>{t("profile.noAppointmentHistory")}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p>{t("profile.notLoggedIn")}</p>
                <Button onClick={() => navigate("/login")} className="mt-4">
                  {t("profile.loginNow")}
                </Button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
