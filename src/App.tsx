
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Assessment from "./pages/Assessment";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CourseLearning from "./pages/CourseLearning";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Shop from "./pages/Shop";
import EventDetails from "./pages/EventDetails";
import ProductDetails from "./pages/ProductDetails";
import Schedule from "./pages/Schedule";
import Streaks from "./pages/Streaks";
import StreakDetails from "./pages/StreakDetails";
import Quiz from "./pages/Quiz";
import QuizTaking from "./pages/QuizTaking";
import QuizResults from "./pages/QuizResults";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Checkout from "./pages/Checkout";
import React from "react";
import Community from "./pages/Community";
import CommunityDetails from "./pages/CommunityDetails";
import Pricing from "./pages/Pricing";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Careers from "./pages/Careers";
import CareerPosition from "./pages/CareerPosition";
import CareerApplication from "./pages/CareerApplication";
import CourseCategories from "./pages/CourseCategories";
import BlogCategories from "./pages/BlogCategories";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider defaultTheme="system" storageKey="innerpath-ui-theme">
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:slug" element={<CourseDetails />} />
                <Route path="/courses/:slug/learn" element={<CourseLearning />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductDetails />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/streaks" element={<Streaks />} />
                <Route path="/streaks/:id" element={<StreakDetails />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quiz/:quizId" element={<QuizTaking />} />
                <Route path="/quiz/:quizId/results" element={<QuizResults />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/community" element={<Community />} />
                <Route path="/community/:id" element={<CommunityDetails />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/:id" element={<CareerPosition />} />
                <Route path="/careers/apply/:id" element={<CareerApplication />} />
                {/* NEW CATEGORY PAGES */}
                <Route path="/course-categories" element={<CourseCategories />} />
                <Route path="/blog-categories" element={<BlogCategories />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
