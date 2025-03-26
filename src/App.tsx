
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/find-doctors" element={<Index />} />
          <Route path="/appointments" element={<Index />} />
          <Route path="/emergency" element={<Index />} />
          <Route path="/emergency-service" element={<Index />} />
          <Route path="/internships" element={<Index />} />
          <Route path="/about" element={<Index />} />
          <Route path="/login" element={<Index />} />
          <Route path="/register" element={<Index />} />
          <Route path="/doctor-login" element={<Index />} />
          <Route path="/doctor-register" element={<Index />} />
          <Route path="/internship-application" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
