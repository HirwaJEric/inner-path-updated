
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
  HelpCircle, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  Calendar,
  Users,
  ListChecks,
  Clock
} from "lucide-react";
import { faker } from "@faker-js/faker";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/pagination";

interface Quiz {
  id: number;
  title: string;
  category: string;
  status: "Active" | "Draft" | "Archived";
  questions: number;
  completions: number;
  avgScore: string;
  timeToComplete: string;
  createdDate: string;
}

const generateQuizzes = (count = 10): Quiz[] =>
  Array.from({ length: count }, (_, i) => {
    const status = faker.helpers.arrayElement(["Active", "Draft", "Archived"]);
    return {
      id: i + 1,
      title: faker.helpers.arrayElement([
        "Personal Growth Assessment",
        "Emotional Intelligence Quiz",
        "Mindfulness Level Test",
        "Self-Awareness Evaluation",
        "Meditation Knowledge Check",
        "Stress Management Assessment",
        "Relationship Patterns Quiz",
        "Life Purpose Finder",
        "Wellness Habit Tracker",
        "Personal Values Assessment",
        "Spiritual Growth Evaluation",
        "Mind-Body Connection Quiz"
      ]),
      category: faker.helpers.arrayElement([
        "Self-Assessment", 
        "Growth", 
        "Mindfulness", 
        "Relationships", 
        "Wellness",
        "Spirituality"
      ]),
      status,
      questions: faker.number.int({ min: 5, max: 25 }),
      completions: faker.number.int({ min: 0, max: 1200 }),
      avgScore: `${faker.number.int({ min: 60, max: 95 })}%`,
      timeToComplete: `${faker.number.int({ min: 5, max: 20 })} min`,
      createdDate: faker.date.recent({ days: 90 }).toLocaleDateString(),
    };
  });

const AdminQuizzes = () => {
  const [quizzes] = useState<Quiz[]>(generateQuizzes(25));
  const { currentPage, totalPages, pageItems, goToPage } = usePagination({ totalItems: quizzes.length, pageSize: 10 });
  const paginatedQuizzes = pageItems(quizzes);

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quiz Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage assessment quizzes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Quiz
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Quiz Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Completions</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedQuizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{quiz.category}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(quiz.status)}`}>
                      {quiz.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <ListChecks className="h-4 w-4 mr-1 text-muted-foreground" />
                      {quiz.questions}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {quiz.completions}
                    </div>
                  </TableCell>
                  <TableCell>{quiz.avgScore}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {quiz.timeToComplete}
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
                          Preview Quiz
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Quiz
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminQuizzes;

