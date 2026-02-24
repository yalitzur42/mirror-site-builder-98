import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BarbershopPage from "./pages/BarbershopPage";
import PermPage from "./pages/PermPage";
import AcademyPage from "./pages/AcademyPage";
import BeginnerCoursePage from "./pages/BeginnerCoursePage";
import AdvancedCoursePage from "./pages/AdvancedCoursePage";
import BasicCoursePage from "./pages/BasicCoursePage";
import ChemistryCoursePage from "./pages/ChemistryCoursePage";
import PermCoursePage from "./pages/PermCoursePage";
import BusinessPage from "./pages/BusinessPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/barbershop" element={<BarbershopPage />} />
            <Route path="/perm" element={<PermPage />} />
            <Route path="/academy" element={<AcademyPage />} />
            <Route path="/academy/beginner" element={<BeginnerCoursePage />} />
            <Route path="/academy/advanced" element={<AdvancedCoursePage />} />
            <Route path="/academy/basic-course" element={<BasicCoursePage />} />
            <Route path="/academy/chemistry" element={<ChemistryCoursePage />} />
            <Route path="/academy/perm-course" element={<PermCoursePage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
