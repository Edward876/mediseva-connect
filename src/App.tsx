
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FindDoctors from "./pages/FindDoctors";
import Appointments from "./pages/Appointments";
import Emergency from "./pages/EmergencyService";
import Internships from "./pages/Internships";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import InternshipApplication from "./pages/InternshipApplication";

// Add typography styles for markdown
import './styles/markdown.css';

// Create a query client
const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="mediseva-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Main Routes */}
            <Route path="/find-doctors" element={<FindDoctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/emergency-service" element={<Emergency />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/about" element={<About />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctor-login" element={<DoctorLogin />} />
            <Route path="/doctor-register" element={<DoctorRegister />} />
            
            {/* Application Routes */}
            <Route path="/internship-application" element={<InternshipApplication />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
