import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PageTransition } from "@/components/ui/page-transition";

// Add typography styles for markdown
import './styles/markdown.css';

// Create a query client
const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="mediseva-theme">
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTransition>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/find-doctors" element={<FindDoctors />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/doctor-login" element={<DoctorLogin />} />
                <Route path="/doctor-register" element={<DoctorRegister />} />
                {/* Making Emergency routes public */}
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/emergency-service" element={<Emergency />} />
                
                {/* Protected Routes */}
                <Route path="/appointments" element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                } />
                <Route path="/clinical-exposure" element={
                  <ProtectedRoute>
                    <ClinicalExposure />
                  </ProtectedRoute>
                } />
                <Route path="/clinical-exposure-application" element={
                  <ProtectedRoute>
                    <ClinicalExposureApplication />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
