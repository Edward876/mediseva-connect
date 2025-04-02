
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, getCurrentUser } from "@/utils/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
});

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    document.title = t("settings.title") + " - Mediseva";
    
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, [t]);
  
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: "",
      });
    }
  }, [form, user]);

  function onSubmit(data: z.infer<typeof profileFormSchema>) {
    toast({
      title: t("settings.profileUpdated"),
      description: t("settings.profileUpdateSuccess"),
    });
    console.log(data);
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8 px-4">
          <div className="max-container max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{t("settings.title")}</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-3 w-full md:w-auto">
                <TabsTrigger value="profile">{t("settings.profile")}</TabsTrigger>
                <TabsTrigger value="account">{t("settings.account")}</TabsTrigger>
                <TabsTrigger value="appearance">{t("settings.appearance")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("settings.profileSettings")}</CardTitle>
                    <CardDescription>
                      {t("settings.updateProfileInfo")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("settings.fullName")}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("settings.email")}</FormLabel>
                              <FormControl>
                                <Input {...field} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("settings.phone")}</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="+91 98765 43210" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end">
                          <Button type="submit">{t("settings.updateProfile")}</Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("settings.accountSettings")}</CardTitle>
                    <CardDescription>
                      {t("settings.manageAccount")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{t("settings.changePassword")}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t("settings.passwordDescription")}
                      </p>
                      <Button variant="outline">{t("settings.changePassword")}</Button>
                    </div>
                    <div className="space-y-2 pt-4 border-t">
                      <h3 className="text-lg font-medium text-destructive">{t("settings.dangerZone")}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t("settings.deleteAccountWarning")}
                      </p>
                      <Button variant="destructive">{t("settings.deleteAccount")}</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("settings.appearance")}</CardTitle>
                    <CardDescription>
                      {t("settings.customizeAppearance")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">{t("settings.language")}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {t("settings.languageDescription")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">{t("settings.theme")}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {t("settings.themeDescription")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
