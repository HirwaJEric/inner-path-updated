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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Plus, 
  MoreHorizontal, 
  Trash, 
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  Mail,
  PhoneCall,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Edit
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faker } from "@faker-js/faker";

interface Consultation {
  id: number;
  clientName: string;
  clientAvatar: string;
  clientInitials: string;
  clientEmail: string;
  consultationType: string;
  status: "Upcoming" | "Completed" | "Cancelled" | "No-show";
  date: string;
  time: string;
  duration: string;
  coach: string;
  location: string;
  notes?: string;
}

const generateConsultations = (count = 20): Consultation[] =>
  Array.from({ length: count }, (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const clientName = `${firstName} ${lastName}`;
    const status = faker.helpers.arrayElement(["Upcoming", "Completed", "Cancelled", "No-show"]);
    const consultationType = faker.helpers.arrayElement([
      "Initial Assessment", 
      "Follow-up Session", 
      "Mentorship", 
      "Crisis Support", 
      "Goal Planning",
      "Therapy Session"
    ]);
    
    return {
      id: i + 1,
      clientName,
      clientAvatar: faker.image.avatar(),
      clientInitials: `${firstName[0]}${lastName[0]}`,
      clientEmail: faker.internet.email({ firstName, lastName }).toLowerCase(),
      consultationType,
      status,
      date: faker.date.soon({ days: 30 }).toLocaleDateString(),
      time: faker.helpers.arrayElement([
        "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", 
        "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
      ]),
      duration: faker.helpers.arrayElement(["30 min", "45 min", "60 min", "90 min"]),
      coach: faker.helpers.arrayElement([
        "Dr. Sarah Miller", 
        "John Roberts", 
        "Emily Thompson", 
        "Michael Chen", 
        "Sophia Garcia"
      ]),
      location: faker.helpers.arrayElement(["Video Call", "Phone Call", "In-person", "Video Call"]),
      notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.7 })
    };
  });

const AdminConsultations = () => {
  const [consultations] = useState<Consultation[]>(generateConsultations());
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredConsultations = consultations.filter(consultation => {
    if (activeFilter === "all") return true;
    if (activeFilter === "upcoming") return consultation.status === "Upcoming";
    if (activeFilter === "completed") return consultation.status === "Completed";
    if (activeFilter === "cancelled") return consultation.status === "Cancelled" || consultation.status === "No-show";
    return true;
  });

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      case "No-show": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLocationIcon = (location: string) => {
    switch(location) {
      case "Video Call": return <Video className="h-4 w-4 mr-1 text-muted-foreground" />;
      case "Phone Call": return <PhoneCall className="h-4 w-4 mr-1 text-muted-foreground" />;
      case "In-person": return <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />;
      default: return <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Consultation Management</h2>
          <p className="text-muted-foreground">
            Manage scheduled consultations and appointments
          </p>
        </div>
        <div className="space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Consultation
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            View/Edit Consultations
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Consultations</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled/No-show</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeFilter}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Coach</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={consultation.clientAvatar} alt={consultation.clientName} />
                            <AvatarFallback>{consultation.clientInitials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{consultation.clientName}</div>
                            <div className="text-xs text-muted-foreground">{consultation.clientEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{consultation.consultationType}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(consultation.status)}`}>
                          {consultation.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {consultation.status === "Cancelled" && <XCircle className="h-3 w-3 mr-1" />}
                          {consultation.status === "No-show" && <XCircle className="h-3 w-3 mr-1" />}
                          {consultation.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            {consultation.date}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {consultation.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{consultation.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-muted-foreground" />
                          {consultation.coach}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getLocationIcon(consultation.location)}
                          {consultation.location}
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
                              <Calendar className="mr-2 h-4 w-4" />
                              {consultation.status === "Upcoming" ? "Reschedule" : "Schedule Follow-up"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact Client
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled={consultation.status !== "Upcoming"} className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Appointment
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

export default AdminConsultations;
