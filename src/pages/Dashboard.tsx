
import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import MyCourses from "@/components/dashboard/MyCourses";
import ReadingList from "@/components/dashboard/ReadingList";
import PaymentHistory from "@/components/dashboard/PaymentHistory";
import AccountAndBilling from "@/components/dashboard/AccountAndBilling";
import QuizResults from "@/components/dashboard/QuizResults";
import QuizRecommendations from "@/components/dashboard/QuizRecommendations";
import ScheduledConsultations from "@/components/dashboard/ScheduledConsultations";
import StreakCard from "@/components/streaks/StreakCard";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <Helmet>
        <title>Dashboard | InnerPath Journey</title>
        <meta name="description" content="Your personal dashboard to manage courses, sessions, and account settings." />
      </Helmet>
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-background flex-col border-r border-border h-screen sticky top-0">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold gradient-text inline-block">
            InnerPath Journey
          </Link>
        </div>
        
        <UserProfile />
        <DashboardNav />
      </aside>
      
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200
          ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `} 
        onClick={toggleSidebar}
      />
      
      {/* Mobile Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-50 h-screen w-72 bg-background md:hidden transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold gradient-text inline-block">
            InnerPath Journey
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <UserProfile />
        <DashboardNav onItemClick={toggleSidebar} />
      </aside>
      
      <main className="flex-grow">
        <DashboardHeader onToggleSidebar={toggleSidebar} />
        
        <div className="p-6 md:p-10">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="reading-list" element={<ReadingList />} />
            <Route path="sessions" element={<ComingSoon title="Mentorship Sessions" />} />
            <Route path="consultations" element={<ScheduledConsultations />} />
            <Route path="payments" element={<PaymentHistory />} />
            <Route path="account" element={<AccountAndBilling />} />
            <Route path="streaks" element={<UserStreaks />} />
            <Route path="quiz-results" element={<QuizResults />} />
            <Route path="recommendations" element={<QuizRecommendations />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const UserStreaks = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Active Streaks</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <StreakCard
          title="Meditation Streak"
          description="Daily mindfulness practice"
          icon="🧘"
          enrolled={true}
          currentStreak={7}
          enrolledCount={1250}
          onEnroll={() => {}}
          onCheckIn={() => {}}
        />
        <StreakCard
          title="Reading Streak"
          description="Build a daily reading habit"
          icon="📚"
          enrolled={true}
          currentStreak={3}
          enrolledCount={890}
          onEnroll={() => {}}
          onCheckIn={() => {}}
        />
      </div>
    </div>
  );
};

const ComingSoon = ({ title }: { title: string }) => (
  <div className="text-center py-16">
    <h2 className="text-2xl font-bold mb-4">{title} - Coming Soon</h2>
    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
      We're currently working on this feature. It will be available soon!
    </p>
    <Button asChild>
      <Link to="/dashboard">Return to Dashboard</Link>
    </Button>
  </div>
);

export default Dashboard;
