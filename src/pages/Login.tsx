
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Mail, KeyRound, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { findUserByCredentials, setCurrentUser } from "@/utils/localStorageService";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t, isLoaded } = useLanguage();

  useEffect(() => {
    if (isLoaded) {
      document.title = t("login.title") + " - Mediseva";
    }
  }, [t, isLoaded]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Attempt to login with encrypted storage
    setTimeout(() => {
      try {
        const user = findUserByCredentials(values.email, values.password);
        
        if (user && user.role === 'patient') {
          console.log("Login successful:", user);
          
          // Set the current user in session
          setCurrentUser(user);
          
          toast({
            title: t("auth.loginSuccess"),
            description: `${t("auth.loginSuccess")}, ${user.name}`,
          });
          navigate("/"); // Redirect to home after login
        } else if (user && user.role !== 'patient') {
          toast({
            title: "Login failed",
            description: "Please use the doctor login page for doctor accounts.",
            variant: "destructive",
          });
        } else {
          console.log("Login failed: Invalid credentials");
          toast({
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: "Login error",
          description: "An error occurred during login. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{t("login.title")}</h1>
            <p className="mt-2 text-muted-foreground">
              {t("login.subtitle")}
            </p>
          </div>

          <div className="bg-card shadow-md rounded-lg p-6 border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("login.email")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="your.email@example.com"
                            className="pl-10"
                            type="email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("login.password")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="••••••••"
                            type="password"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t("login.signingIn") : t("login.signIn")}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    {t("login.noAccount")}{" "}
                    <Link to="/register" className="text-primary hover:underline">
                      {t("login.register")}
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("login.backToHome")}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
