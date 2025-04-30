import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { 
  Briefcase, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Trash, 
  UserPlus,
  Clock
} from "lucide-react";
import { faker } from '@faker-js/faker';

interface AdminCareersProps {
  onAddJob: () => void;
  onViewDetails: (id: number) => void;
}

const generateJobPostings = (count = 8) => {
  const departments = [
    "Coaching", 
    "Content", 
    "Marketing", 
    "Customer Success", 
    "Operations", 
    "IT", 
    "HR"
  ];
  
  const locations = [
    "Remote", 
    "New York, NY", 
    "Los Angeles, CA", 
    "Austin, TX", 
    "Chicago, IL", 
    "Hybrid"
  ];
  
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  
  return Array.from({ length: count }, (_, i) => {
    const department = faker.helpers.arrayElement(departments);
    const isActive = faker.datatype.boolean(0.7);
    const postedDate = faker.date.recent({ days: 30 });
    
    const expiryDate = new Date(postedDate);
    expiryDate.setDate(postedDate.getDate() + faker.number.int({ min: 30, max: 60 }));
    
    return {
      id: i + 1,
      title: `${faker.helpers.arrayElement([
        "Senior", 
        "Lead", 
        "Junior", 
        "", 
        "Associate"
      ])} ${department} ${faker.helpers.arrayElement([
        "Specialist",
        "Coordinator",
        "Manager",
        "Director",
        "Assistant",
        "Consultant"
      ])}`.trim(),
      department,
      location: faker.helpers.arrayElement(locations),
      type: faker.helpers.arrayElement(jobTypes),
      applicants: faker.number.int({ min: 0, max: 50 }),
      postedDate: postedDate.toLocaleDateString(),
      expiryDate: expiryDate.toLocaleDateString(),
      status: isActive ? "Active" : "Inactive"
    };
  });
};

const AdminCareers = ({ onAddJob, onViewDetails }: AdminCareersProps) => {
  const [jobPostings] = useState(generateJobPostings());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Career Opportunities</h2>
          <p className="text-muted-foreground">
            Manage job postings and career opportunities
          </p>
        </div>
        <div className="space-x-2">
          <Button onClick={onAddJob}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Job Posting
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            View/Edit Jobs
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobPostings.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <UserPlus className="h-4 w-4 mr-1 text-muted-foreground" />
                      {job.applicants}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {job.postedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={job.status === "Active" 
                        ? "border-green-500 text-green-600" 
                        : "border-gray-500 text-gray-600"
                      }
                    >
                      {job.status}
                    </Badge>
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Posting
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewDetails(job.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Posting
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="mr-2 h-4 w-4" />
                          View Applicants ({job.applicants})
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

export default AdminCareers;
