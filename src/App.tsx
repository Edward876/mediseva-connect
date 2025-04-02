
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FindDoctors from "./pages/FindDoctors";
import Appointments from "./pages/Appointments";
import Emergency from "./pages/EmergencyService";
import ClinicalExposure from "./pages/Internships";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import ClinicalExposureApplication from "./pages/InternshipApplication";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

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
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/find-doctors" element={<FindDoctors />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/doctor-login" element={<DoctorLogin />} />
              <Route path="/doctor-register" element={<DoctorRegister />} />
              
              {/* Protected Routes */}
              <Route path="/appointments" element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              } />
              <Route path="/emergency" element={
                <ProtectedRoute>
                  <Emergency />
                </ProtectedRoute>
              } />
              <Route path="/emergency-service" element={
                <ProtectedRoute>
                  <Emergency />
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
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
