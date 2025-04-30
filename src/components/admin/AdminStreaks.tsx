
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  Users,
  Calendar,
  Clock,
  Target
} from "lucide-react";
import { faker } from "@faker-js/faker";

interface Streak {
  id: number;
  title: string;
  category: string;
  status: "Active" | "Upcoming" | "Completed" | "Archived";
  participants: number;
  duration: string;
  completionRate: number;
  startDate: string;
  endDate: string;
}

const generateStreaks = (count = 10): Streak[] =>
  Array.from({ length: count }, (_, i) => {
    const status = faker.helpers.arrayElement(["Active", "Upcoming", "Completed", "Archived"]);
    
    return {
      id: i + 1,
      title: faker.helpers.arrayElement([
        "Daily Meditation",
        "Gratitude Journaling",
        "Morning Exercise Routine",
        "Mindful Eating",
        "Digital Detox Hour",
        "Evening Reflection",
        "Nature Connection",
        "Creativity Challenge",
        "Random Acts of Kindness",
        "Hydration Tracker",
        "Sleep Optimization",
        "Deep Work Focus Time"
      ]),
      category: faker.helpers.arrayElement([
        "Meditation", 
        "Wellness", 
        "Mindfulness", 
        "Fitness", 
        "Journaling",
        "Productivity"
      ]),
      status,
      participants: faker.number.int({ min: 5, max: 500 }),
      duration: `${faker.number.int({ min: 7, max: 90 })} days`,
      completionRate: parseInt(faker.number.int({ min: 20, max: 95 }).toString()),
      startDate: faker.date.recent({ days: 60 }).toLocaleDateString(),
      endDate: faker.date.soon({ days: 90 }).toLocaleDateString(),
    };
  });

const AdminStreaks = () => {
  const [streaks] = useState<Streak[]>(generateStreaks());

  // Get badge color based on streak status
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-purple-100 text-purple-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Streak Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage habit streaks
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Streak
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Streak Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {streaks.map((streak) => (
                <TableRow key={streak.id}>
                  <TableCell className="font-medium">{streak.title}</TableCell>
                  <TableCell>{streak.category}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(streak.status)}`}>
                      {streak.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {streak.participants}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {streak.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1 text-muted-foreground" />
                      {streak.completionRate}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {streak.startDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Streak
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStreaks;
