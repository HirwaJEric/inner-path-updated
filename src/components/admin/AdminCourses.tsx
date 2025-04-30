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
  BookOpen, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  Clock,
  Users,
  Star
} from "lucide-react";
import { faker } from "@faker-js/faker";

interface Course {
  id: number;
  title: string;
  category: string;
  status: "Published" | "Draft" | "Archived";
  price: string;
  enrollments: number;
  rating: number;
  createdDate: string;
  lastUpdated: string;
}

const generateCourses = (count = 10): Course[] =>
  Array.from({ length: count }, (_, i) => {
    const status = faker.helpers.arrayElement(["Published", "Draft", "Archived"]);
    const price = faker.helpers.arrayElement([
      "Free", 
      `$${faker.commerce.price({ min: 19, max: 199 })}`,
      `$${faker.commerce.price({ min: 19, max: 199 })}`
    ]);
    
    return {
      id: i + 1,
      title: faker.helpers.arrayElement([
        "Mindful Meditation Fundamentals",
        "Journey to Self-Discovery",
        "Emotional Intelligence Mastery",
        "Stress Management Techniques",
        "Finding Your Life Purpose",
        "Strengthening Relationships",
        "Building Resilience in Difficult Times",
        "Creative Expression & Mindfulness",
        "Spiritual Growth Practices",
        "Holistic Wellness Essentials",
        "Mind-Body Connection Workshop",
        "Deepening Self-Awareness"
      ]),
      category: faker.helpers.arrayElement([
        "Meditation", 
        "Self-Growth", 
        "Relationships", 
        "Wellness", 
        "Spirituality"
      ]),
      status,
      price,
      enrollments: faker.number.int({ min: 0, max: 1500 }),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toFixed(1)),
      createdDate: faker.date.past({ years: 1 }).toLocaleDateString(),
      lastUpdated: faker.date.recent({ days: 60 }).toLocaleDateString(),
    };
  });

const AdminCourses = ({ onAddCourse, onViewEditCourses }: { onAddCourse: () => void, onViewEditCourses: () => void }) => {
  const [courses] = useState<Course[]>(generateCourses());

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage courses
          </p>
        </div>
        <div className="space-x-2">
          <Button onClick={onAddCourse}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
          <Button variant="outline" onClick={onViewEditCourses}>
            <Edit className="mr-2 h-4 w-4" />
            View/Edit Courses
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Course Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(course.status)}`}>
                      {course.status}
                    </div>
                  </TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {course.enrollments}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-amber-500" />
                      {course.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {course.lastUpdated}
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
                          View Course
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Course
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

export default AdminCourses;
