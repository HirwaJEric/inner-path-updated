
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import StreakInfoSection from "@/components/streaks/StreakInfoSection";
import ActiveStreaks from "@/components/streaks/ActiveStreaks";
import StreaksList from "@/components/streaks/StreaksList";
import PopularStreaks from "@/components/streaks/PopularStreaks";
import { Pagination } from "@/components/ui/pagination";

// Number of streaks per page
const ITEMS_PER_PAGE = 6;

const Streaks = () => {
  const [streakCategories, setStreakCategories] = useState([
    {
      title: "Reading Streak",
      description: "Build a daily reading habit",
      icon: "📚",
      enrolled: false,
      currentStreak: 0,
      startDate: new Date(),
      lastCheckIn: null,
      enrolledCount: 890,
    },
    {
      title: "Meditation Streak",
      description: "Daily mindfulness practice",
      icon: "🧘",
      enrolled: true,
      currentStreak: 7,
      startDate: new Date(),
      lastCheckIn: new Date(),
      enrolledCount: 1250,
    },
    {
      title: "Learning Streak",
      description: "Continuous learning journey",
      icon: "🎓",
      enrolled: false,
      currentStreak: 0,
      startDate: new Date(),
      lastCheckIn: null,
      enrolledCount: 750,
    },
    {
      title: "Focus Streak",
      description: "Enhance concentration daily",
      icon: "🎯",
      enrolled: true,
      currentStreak: 3,
      startDate: new Date(),
      lastCheckIn: new Date(),
      enrolledCount: 680,
    },
    {
      title: "Sport Streak",
      description: "Daily physical activity",
      icon: "🏃",
      enrolled: false,
      currentStreak: 0,
      startDate: new Date(),
      lastCheckIn: null,
      enrolledCount: 920,
    },
    {
      title: "Mental Cleansing",
      description: "Daily mental wellness practice",
      icon: "🧠",
      enrolled: false,
      currentStreak: 0,
      startDate: new Date(),
      lastCheckIn: null,
      enrolledCount: 560,
    },
    {
      title: "Writing Streak",
      description: "Daily writing practice",
      icon: "✍️",
      enrolled: false,
      currentStreak: 0,
      startDate: new Date(),
      lastCheckIn: null,
      enrolledCount: 480,
    },
    {
      title: "Gratitude Streak",
      description: "Daily gratitude journaling",
      icon: "🙏",
      enrolled: false,
      currentStreak: 0,
      startDate: new Date(),
      lastCheckIn: null,
      enrolledCount: 830,
    },
    {
      title: "Hydration Streak",
      description: "Drink water consistently",
      icon: "💧",
      enrolled: false,
      currentStreak: 0,
      startDate: new Date(),
      lastCheckIn: null,
      enrolledCount: 710,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedStreaks, setPaginatedStreaks] = useState(streakCategories.slice(0, ITEMS_PER_PAGE));
  const totalPages = Math.ceil(streakCategories.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedStreaks(streakCategories.slice(startIndex, endIndex));
  }, [currentPage, streakCategories]);

  const handleEnroll = (index: number) => {
    setStreakCategories(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        enrolled: true,
        startDate: new Date(),
      };
      return updated;
    });
  };

  const handleCheckIn = (index: number) => {
    setStreakCategories(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        currentStreak: updated[index].currentStreak + 1,
        lastCheckIn: new Date(),
      };
      return updated;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const enrolledStreaks = streakCategories.filter(streak => streak.enrolled);

  return (
    <Layout>
      <Helmet>
        <title>Streaks & Challenges | InnerPath Journey</title>
      </Helmet>
      
      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Streaks & Daily Challenges</h1>
          <p className="text-lg text-muted-foreground">
            Build positive habits through daily practice. Join challenges and maintain your streaks.
          </p>
        </div>

        {/* Streak information section */}
        <StreakInfoSection />

        {/* Popular streaks section */}
        <PopularStreaks 
          streaks={streakCategories} 
          onEnroll={handleEnroll} 
          onCheckIn={handleCheckIn} 
        />

        {/* Active streaks section */}
        <ActiveStreaks streaks={enrolledStreaks} />
        
        {/* Available streaks section with pagination */}
        <SectionHeader 
          title="Available Streaks" 
          subtitle="Choose from these challenges to build positive habits"
        />
        <StreaksList 
          streaks={paginatedStreaks} 
          onEnroll={handleEnroll} 
          onCheckIn={handleCheckIn} 
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Layout>
  );
};

export default Streaks;
