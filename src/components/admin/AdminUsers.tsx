import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/pagination";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  UserPlus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Mail, 
  Eye,
  Download,
  Filter,
  Calendar,
  CreditCard 
} from "lucide-react";
import { faker } from "@faker-js/faker";

const SUBSCRIPTION_PLANS = [
  "Free", 
  "Basic", 
  "Premium", 
  "Ultimate"
];

interface User {
  id: number;
  name: string;
  avatar: string;
  initials: string;
  email: string;
  subscriptionPlan: string;
  subscriptionStatus: "Active" | "Expired" | "Trial";
  joinDate: string;
  lastActive: string;
}

const generateUsers = (count = 20): User[] =>
  Array.from({ length: count }, (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    
    return {
      id: i + 1,
      name,
      avatar: faker.image.avatar(),
      initials: `${firstName[0]}${lastName[0]}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      subscriptionPlan: faker.helpers.arrayElement(SUBSCRIPTION_PLANS),
      subscriptionStatus: faker.helpers.arrayElement(["Active", "Expired", "Trial"]),
      joinDate: faker.date.past({ years: 2 }).toLocaleDateString(),
      lastActive: faker.date.recent({ days: 30 }).toLocaleDateString(),
    };
  });

const AdminUsers = ({ onAddUser, onViewEditUsers }: { onAddUser: () => void, onViewEditUsers: () => void }) => {
  const [users] = useState<User[]>(generateUsers(50));
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredUsers = users.filter(user => {
    if (activeFilter === "all") return true;
    return user.subscriptionPlan.toLowerCase() === activeFilter.toLowerCase();
  });
  
  const {
    currentPage,
    totalPages,
    pageItems,
    goToPage
  } = usePagination({
    totalItems: filteredUsers.length,
    pageSize: 10
  });
  
  const paginatedUsers = pageItems(filteredUsers);

  const getSubscriptionBadgeClass = (plan: string) => {
    switch(plan) {
      case "Free":
        return "bg-gray-100 text-gray-800";
      case "Basic":
        return "bg-blue-100 text-blue-800";
      case "Premium":
        return "bg-purple-100 text-purple-800";
      case "Ultimate":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Active":
        return "border-green-500 text-green-600";
      case "Expired":
        return "border-red-500 text-red-600";
      case "Trial":
        return "border-blue-500 text-blue-600";
      default:
        return "border-gray-500 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">
            Manage users and subscription plans
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={onAddUser}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
          <Button variant="outline" onClick={onViewEditUsers}>
            <Edit className="mr-2 h-4 w-4" />
            View/Edit Users
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All Users</TabsTrigger>
          {SUBSCRIPTION_PLANS.map(plan => (
            <TabsTrigger key={plan} value={plan.toLowerCase()}>{plan}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeFilter}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">User</TableHead>
                    <TableHead>Subscription Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadgeClass(user.subscriptionPlan)}`}>
                          <CreditCard className="h-3 w-3 mr-1" />
                          {user.subscriptionPlan}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getStatusBadgeClass(user.subscriptionStatus)}
                        >
                          {user.subscriptionStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          {user.joinDate}
                        </div>
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
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
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="mt-4 pb-2 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUsers;
