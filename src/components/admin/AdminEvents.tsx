
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
  Calendar, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  Users,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react";
import { faker } from "@faker-js/faker";

interface Event {
  id: number;
  title: string;
  type: string;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  location: string;
  price: string;
  capacity: number;
  registrations: number;
  startDate: string;
  duration: string;
}

const generateEvents = (count = 10): Event[] =>
  Array.from({ length: count }, (_, i) => {
    const status = faker.helpers.arrayElement(["Upcoming", "Ongoing", "Completed", "Cancelled"]);
    const eventType = faker.helpers.arrayElement([
      "Workshop", 
      "Retreat", 
      "Seminar", 
      "Conference", 
      "Webinar",
      "Group Session"
    ]);
    const capacity = faker.number.int({ min: 20, max: 200 });
    const registrations = status === "Cancelled" 
      ? 0 
      : faker.number.int({ min: 0, max: capacity });
    
    return {
      id: i + 1,
      title: faker.helpers.arrayElement([
        "Mindful Meditation Retreat",
        "Personal Growth Workshop",
        "Self-Discovery Weekend",
        "Wellness & Balance Seminar",
        "Finding Your Purpose Conference",
        "Relationship Building Workshop",
        "Stress Management Session",
        "Spiritual Growth Gathering",
        "Mind-Body Connection Retreat",
        "Inner Peace Day",
        "Authentic Living Workshop",
        "Holistic Wellness Weekend"
      ]),
      type: eventType,
      status,
      location: eventType === "Webinar" 
        ? "Online" 
        : faker.helpers.arrayElement([
            "New York, NY", 
            "Los Angeles, CA", 
            "Chicago, IL", 
            "Austin, TX", 
            "Miami, FL", 
            "Online"
          ]),
      price: faker.helpers.arrayElement([
        "Free", 
        `$${faker.commerce.price({ min: 49, max: 499 })}`,
        `$${faker.commerce.price({ min: 49, max: 499 })}`
      ]),
      capacity,
      registrations,
      startDate: faker.date.soon({ days: 90 }).toLocaleDateString(),
      duration: faker.helpers.arrayElement([
        "2 hours",
        "3 hours",
        "Half day",
        "Full day",
        "2 days",
        "Weekend",
        "5 days"
      ]),
    };
  });

const AdminEvents = () => {
  const [events] = useState<Event[]>(generateEvents());

  // Get badge color based on event status
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Ongoing": return "bg-green-100 text-green-800";
      case "Completed": return "bg-purple-100 text-purple-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Event Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage events, workshops, and retreats
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Event
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Event Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(event.status)}`}>
                      {event.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      {event.price}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {event.registrations}/{event.capacity}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {event.startDate}
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
                          Edit Event
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Attendees
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

export default AdminEvents;
