
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CourseAnalytics } from "./CourseAnalytics";
import { Users, BookOpen, DollarSign, BarChart } from "lucide-react";

const AdminAnalytics = () => {
  const stats = [
    {
      name: "Total Users",
      value: "1,248",
      icon: Users,
      change: "+12%",
      changeType: "positive"
    },
    {
      name: "Active Courses",
      value: "24",
      icon: BookOpen,
      change: "+3",
      changeType: "positive"
    },
    {
      name: "Total Revenue",
      value: "$54,328",
      icon: DollarSign,
      change: "+18%",
      changeType: "positive"
    },
    {
      name: "Course Completions",
      value: "432",
      icon: BarChart,
      change: "+8%",
      changeType: "positive"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center gap-4">
              <stat.icon className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${
                  stat.changeType === "positive" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="mt-6">
          <CourseAnalytics />
        </TabsContent>
        <TabsContent value="users">User analytics coming soon</TabsContent>
        <TabsContent value="revenue">Revenue analytics coming soon</TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
