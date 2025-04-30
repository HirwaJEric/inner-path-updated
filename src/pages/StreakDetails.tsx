
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StreakProgress from "@/components/streaks/StreakProgress";
import StreakStats from "@/components/streaks/StreakStats";
import StreakTimer from "@/components/streaks/StreakTimer";
import StreakMilestones from "@/components/streaks/StreakMilestones";
import StreakCheckInForm from "@/components/streaks/StreakCheckInForm";
import StreakCalendarView from "@/components/streaks/StreakCalendarView";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StreakDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [checkedDays, setCheckedDays] = useState<Date[]>([
    new Date(2025, 3, 10),
    new Date(2025, 3, 11),
    new Date(2025, 3, 12),
    new Date(2025, 3, 13),
    new Date(2025, 3, 14),
  ]);
  const [missedDays, setMissedDays] = useState<Date[]>([
    new Date(2025, 3, 8),
    new Date(2025, 3, 16),
  ]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // This is mock data - in a real app, you'd fetch this from your backend
  const streakData = {
    title: "Meditation Streak",
    description: "Daily mindfulness practice",
    icon: "🧘",
    currentStreak: 5,
    longestStreak: 7,
    startDate: new Date(2025, 3, 10),
    endDate: new Date(2025, 5, 10),
    lastCheckIn: new Date(),
    frequency: "Daily",
    guidelines: [
      "Meditate for at least 10 minutes per day",
      "Find a quiet space with minimal distractions",
      "Focus on your breath and be present in the moment",
      "Try different meditation techniques to find what works for you",
    ],
    milestones: [
      { days: 7, name: "Week Warrior", achieved: false },
      { days: 30, name: "Monthly Master", achieved: false },
      { days: 100, name: "Century Club", achieved: false },
    ]
  };

  // Mock data for community stats
  const communityStats = {
    enrolledCount: 1250,
    rating: 4.8,
    reviewCount: 325,
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        comment: "This streak challenge has transformed my daily routine!",
        date: "2025-04-15",
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 5,
        comment: "Great community support and motivation.",
        date: "2025-04-14",
      },
    ],
  };

  const handleCheckIn = (data: any) => {
    toast({
      title: "Streak Updated!",
      description: "Great job maintaining your streak. Keep it going!",
    });
    console.log("Check-in data:", data);
    // Add today to checked days
    setCheckedDays(prev => [...prev, new Date()]);
  };

  const handleDayClick = (date: Date) => {
    // Mock submission data - replace with real data from your backend
    setSelectedSubmission({
      date,
      activity: "Morning Meditation",
      description: "20-minute mindfulness session focusing on breath awareness",
      startTime: "07:00",
      endTime: "07:20",
      reflection: "Felt more centered and focused throughout the day.",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>{streakData.title} | InnerPath Journey</title>
      </Helmet>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl">{streakData.icon}</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">{streakData.title}</h1>
              <p className="text-muted-foreground">{streakData.description}</p>
            </div>
          </div>

          <div className="grid gap-8">
            {/* Streak Information and Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Streak Information</CardTitle>
                <CardDescription>
                  Here's everything you need to know about this streak challenge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <span className="font-medium">{format(streakData.startDate, 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">End Date</span>
                    <span className="font-medium">{format(streakData.endDate, 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Check-in Frequency</span>
                    <span className="font-medium">{streakData.frequency}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Guidelines:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {streakData.guidelines.map((guideline, index) => (
                      <li key={index} className="text-muted-foreground">{guideline}</li>
                    ))}
                  </ul>
                </div>

                <StreakTimer />
              </CardContent>
            </Card>

            <StreakStats
              enrolledCount={communityStats.enrolledCount}
              rating={communityStats.rating}
              reviewCount={communityStats.reviewCount}
            />

            <Card>
              <CardHeader>
                <CardTitle>Community Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityStats.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.user}</span>
                        <span className="text-muted-foreground text-sm">
                          {format(new Date(review.date), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="progress">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="check-in">Check In</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <StreakProgress 
                currentStreak={streakData.currentStreak}
                longestStreak={streakData.longestStreak}
                startDate={streakData.startDate}
                lastCheckIn={streakData.lastCheckIn}
              />

              <StreakMilestones 
                milestones={streakData.milestones}
                currentStreak={streakData.currentStreak}
              />
            </TabsContent>

            {/* Check-in Tab */}
            <TabsContent value="check-in">
              <StreakCheckInForm onSubmit={handleCheckIn} />
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <StreakCalendarView 
                checkedDays={checkedDays}
                missedDays={missedDays}
                onDayClick={handleDayClick}
                selectedSubmission={selectedSubmission}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default StreakDetails;
