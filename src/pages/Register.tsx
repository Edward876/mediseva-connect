import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Mail, User, KeyRound, Phone, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { addUser } from "@/utils/localStorageService";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t, isLoaded } = useLanguage();

  useEffect(() => {
    if (isLoaded) {
      document.title = t("register.patientTitle") + " - Mediseva";
    }
  }, [t, isLoaded]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Register using the encrypted storage
    setTimeout(() => {
      try {
        // Create a new user object
        const newUser = addUser({
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          password: values.password,
          role: "patient"
        });
        
        console.log("Registration successful:", newUser);
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
        });
        navigate("/login"); // Redirect to login after registration
      } catch (error) {
        console.error("Registration error:", error);
        
        // Check for specific error
        if (error instanceof Error && error.message === 'User with this email already exists') {
          toast({
            title: "Registration failed",
            description: "An account with this email already exists.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration error",
            description: "An error occurred during registration. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{t("register.patientTitle")}</h1>
            <p className="mt-2 text-muted-foreground">
              {t("register.patientSubtitle")}
            </p>
          </div>

          <div className="bg-card shadow-md rounded-lg p-6 border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="John Doe" {...field} />
                        </div>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="your.email@example.com"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="(123) 456-7890"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="••••••••"
                            type="password"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="••••••••"
                            type="password"
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
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          I agree to the{" "}
                          <Link
                            to="/terms-of-service"
                            className="text-primary hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy-policy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {t("register.alreadyHaveAccount")}{" "}
                <Link to="/login" className="text-primary hover:underline">
                  {t("register.signInAsPatient")}
                </Link>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <Link to="/doctor-register" className="text-primary hover:underline">
                  {t("register.doctorTitle")}
                </Link>
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
