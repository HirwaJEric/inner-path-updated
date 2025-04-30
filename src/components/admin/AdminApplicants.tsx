
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserPlus as Plus,
  MoreHorizontal,
  FileText,
  Download,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Edit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { faker } from '@faker-js/faker';

interface AdminApplicantsProps {
  onViewApplicant: (id: number) => void;
}

const generateApplicants = (count = 15) => {
  const jobTitles = [
    "Life Coach", 
    "Meditation Instructor", 
    "Content Creator", 
    "Marketing Specialist", 
    "Customer Success Manager",
    "Spiritual Guide",
    "Wellness Expert",
    "Operations Director"
  ];
  
  const applicationStatuses = [
    "New", 
    "Screening", 
    "Interview", 
    "Offer Extended", 
    "Hired", 
    "Rejected"
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const status = faker.helpers.arrayElement(applicationStatuses);
    
    return {
      id: i + 1,
      name,
      avatar: faker.image.avatar(),
      initials: `${firstName[0]}${lastName[0]}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: faker.phone.number(),
      position: faker.helpers.arrayElement(jobTitles),
      appliedDate: faker.date.recent({ days: 30 }).toLocaleDateString(),
      status,
      resumeFilename: `${firstName.toLowerCase()}_${lastName.toLowerCase()}_resume.pdf`,
      lastActivity: faker.date.recent({ days: 7 }).toLocaleDateString(),
      notes: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 })
    };
  });
};

const AdminApplicants = ({ onViewApplicant }: AdminApplicantsProps) => {
  const [applicants] = useState(generateApplicants());
  const [activeTab, setActiveTab] = useState("all");

  const filteredApplicants = applicants.filter(applicant => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return applicant.status === "New";
    if (activeTab === "inProgress") return ["Screening", "Interview"].includes(applicant.status);
    if (activeTab === "hired") return applicant.status === "Hired";
    if (activeTab === "rejected") return applicant.status === "Rejected";
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Screening": return "bg-purple-100 text-purple-800";
      case "Interview": return "bg-yellow-100 text-yellow-800";
      case "Offer Extended": return "bg-orange-100 text-orange-800";
      case "Hired": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Job Applicants</h2>
          <p className="text-muted-foreground">
            Review and manage applications for career opportunities
          </p>
        </div>
        <div className="space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Applicant
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            View/Edit Applicants
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All Applicants</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="hired">Hired</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Applicant</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={applicant.avatar} alt={applicant.name} />
                            <AvatarFallback>{applicant.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{applicant.name}</div>
                            <div className="text-xs text-muted-foreground">{applicant.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{applicant.position}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {applicant.appliedDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                          {applicant.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          {applicant.lastActivity}
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
                            <DropdownMenuItem onClick={() => onViewApplicant(applicant.id)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact Applicant
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Move to Next Stage
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Reject Application
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminApplicants;
