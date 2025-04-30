
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
  Mail, 
  Plus, 
  MoreHorizontal, 
  Trash, 
  Calendar,
  SendHorizontal,
  Check,
  X,
  Filter,
  Download
} from "lucide-react";
import { faker } from "@faker-js/faker";

interface Subscriber {
  id: number;
  email: string;
  name: string;
  status: "Active" | "Unsubscribed" | "Bounced";
  source: string;
  lists: string[];
  dateSubscribed: string;
  lastOpened: string;
}

const generateSubscribers = (count = 20): Subscriber[] =>
  Array.from({ length: count }, (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const status = faker.helpers.arrayElement(["Active", "Unsubscribed", "Bounced"]);
    
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      status,
      source: faker.helpers.arrayElement([
        "Website", 
        "Quiz", 
        "Event Registration", 
        "Product Purchase", 
        "Newsletter Signup",
        "Blog Subscription"
      ]),
      lists: faker.helpers.arrayElements(
        ["Main Newsletter", "Promotions", "Events", "Course Updates", "Wellness Tips"],
        { min: 1, max: 3 }
      ),
      dateSubscribed: faker.date.past({ years: 1 }).toLocaleDateString(),
      lastOpened: status === "Active" 
        ? faker.date.recent({ days: 90 }).toLocaleDateString() 
        : "N/A"
    };
  });

const AdminEmailList = () => {
  const [subscribers] = useState<Subscriber[]>(generateSubscribers());
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredSubscribers = subscribers.filter(subscriber => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return subscriber.status === "Active";
    if (activeFilter === "unsubscribed") return subscriber.status === "Unsubscribed";
    if (activeFilter === "bounced") return subscriber.status === "Bounced";
    return true;
  });

  // Get badge color based on subscription status
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Unsubscribed": return "bg-gray-100 text-gray-800";
      case "Bounced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email List Management</h2>
          <p className="text-muted-foreground">
            Manage subscribers and email campaigns
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter List
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <SendHorizontal className="mr-2 h-4 w-4" />
            Send Campaign
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Subscriber
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Subscribers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="unsubscribed">Unsubscribed</TabsTrigger>
          <TabsTrigger value="bounced">Bounced</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeFilter}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Lists</TableHead>
                    <TableHead>Date Subscribed</TableHead>
                    <TableHead>Last Opened</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>{subscriber.name}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(subscriber.status)}`}>
                          {subscriber.status === "Active" && <Check className="h-3 w-3 mr-1" />}
                          {subscriber.status === "Unsubscribed" && <X className="h-3 w-3 mr-1" />}
                          {subscriber.status === "Bounced" && <X className="h-3 w-3 mr-1" />}
                          {subscriber.status}
                        </div>
                      </TableCell>
                      <TableCell>{subscriber.source}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {subscriber.lists.map((list, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {list}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {subscriber.dateSubscribed}
                        </div>
                      </TableCell>
                      <TableCell>{subscriber.lastOpened}</TableCell>
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
                              <SendHorizontal className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Edit Subscriber
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminEmailList;
