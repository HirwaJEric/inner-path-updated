
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdminStatCard } from "./AdminStatCard";
import { Users, BookOpen, DollarSign, FileText, BarChart, Calendar, Briefcase, User, Mail, Image, BookMarked } from "lucide-react";

// Enhanced stats with more information
const stats = [
  { name: "Total Users", value: "1,248", icon: Users, color: "bg-blue-500", change: "+12%" },
  { name: "Active Courses", value: "24", icon: BookOpen, color: "bg-green-500", change: "+5%" },
  { name: "Total Revenue", value: "$54,328", icon: DollarSign, color: "bg-purple-500", change: "+18%" },
  { name: "Blog Articles", value: "127", icon: FileText, color: "bg-orange-500", change: "+8%" },
  { name: "Active Streaks", value: "15", icon: BarChart, color: "bg-pink-500", change: "-2%" },
  { name: "Consultations", value: "312", icon: Calendar, color: "bg-yellow-500", change: "+14%" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <AdminStatCard key={stat.name} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>New users in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Sarah Johnson</span>
                <span className="text-muted-foreground">2 days ago</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Michael Chen</span>
                <span className="text-muted-foreground">3 days ago</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Jessica Williams</span>
                <span className="text-muted-foreground">5 days ago</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>David Rodriguez</span>
                <span className="text-muted-foreground">6 days ago</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Emily Thompson</span>
                <span className="text-muted-foreground">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Courses</CardTitle>
            <CardDescription>Most enrolled courses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Mindful Meditation Fundamentals</span>
                <span className="text-muted-foreground">124 enrollments</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Journey to Self-Discovery</span>
                <span className="text-muted-foreground">98 enrollments</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Emotional Intelligence Mastery</span>
                <span className="text-muted-foreground">76 enrollments</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Yoga for Beginners</span>
                <span className="text-muted-foreground">65 enrollments</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span>Advanced Meditation Techniques</span>
                <span className="text-muted-foreground">54 enrollments</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span className="text-sm">Course Enrollment: Journey to Self-Discovery</span>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span className="text-sm">New Blog Comment</span>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span className="text-sm">New Product Purchase: Meditation Cushion</span>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span className="text-sm">Consultation Scheduled</span>
                <span className="text-xs text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex justify-between p-2 rounded hover:bg-muted">
                <span className="text-sm">New Community Post</span>
                <span className="text-xs text-muted-foreground">8 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Server Uptime</span>
                  <span className="text-sm font-medium text-green-500">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Database Load</span>
                  <span className="text-sm font-medium text-yellow-500">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">API Response Time</span>
                  <span className="text-sm font-medium text-green-500">230ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm font-medium text-blue-500">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
