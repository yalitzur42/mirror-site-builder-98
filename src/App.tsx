import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BarbershopPage from "./pages/BarbershopPage";
import PermPage from "./pages/PermPage";
import AcademyPage from "./pages/AcademyPage";
import BeginnerCoursePage from "./pages/BeginnerCoursePage";
import AdvancedCoursePage from "./pages/AdvancedCoursePage";
import BasicCoursePage from "./pages/BasicCoursePage";
import OnlineCoursesPage from "./pages/OnlineCoursesPage";
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/barbershop" element={<BarbershopPage />} />
          <Route path="/perm" element={<PermPage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/academy/beginner" element={<BeginnerCoursePage />} />
          <Route path="/academy/advanced" element={<AdvancedCoursePage />} />
          <Route path="/academy/basic-course" element={<BasicCoursePage />} />
          <Route path="/online-courses" element={<OnlineCoursesPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
