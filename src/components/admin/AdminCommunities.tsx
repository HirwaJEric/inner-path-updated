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
  Users, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  MessageSquare,
  ShieldAlert,
  Calendar,
  UserPlus
} from "lucide-react";
import { faker } from "@faker-js/faker";

interface Community {
  id: number;
  name: string;
  category: string;
  status: "Active" | "Archived" | "Private";
  memberCount: number;
  discussions: number;
  moderators: number;
  createdDate: string;
  lastActivity: string;
}

const generateCommunities = (count = 10): Community[] =>
  Array.from({ length: count }, (_, i) => {
    const status = faker.helpers.arrayElement(["Active", "Archived", "Private"]);
    
    return {
      id: i + 1,
      name: faker.helpers.arrayElement([
        "Mindful Living Circle",
        "Inner Growth Community",
        "Spiritual Seekers",
        "Meditation Masters",
        "Holistic Wellness Group",
        "Personal Development Club",
        "Anxiety Support Network",
        "Relationship Building Forum",
        "Gratitude Practice Group",
        "Self-Care Collective",
        "Positive Psychology Community",
        "Life Purpose Explorers"
      ]),
      category: faker.helpers.arrayElement([
        "Meditation", 
        "Personal Growth", 
        "Wellness", 
        "Support", 
        "Spiritual",
        "Psychology"
      ]),
      status,
      memberCount: faker.number.int({ min: 5, max: 2000 }),
      discussions: faker.number.int({ min: 0, max: 500 }),
      moderators: faker.number.int({ min: 1, max: 5 }),
      createdDate: faker.date.past({ years: 2 }).toLocaleDateString(),
      lastActivity: faker.date.recent({ days: 30 }).toLocaleDateString()
    };
  });

const AdminCommunities = () => {
  const [communities] = useState<Community[]>(generateCommunities());

  // Get badge color based on community status
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      case "Private": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Section actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Community Management</h2>
          <p className="text-muted-foreground">
            Manage communities, discussions, and moderation
          </p>
        </div>
        <div className="space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Community
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            View/Edit Communities
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Community Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Discussions</TableHead>
                <TableHead>Moderators</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communities.map((community) => (
                <TableRow key={community.id}>
                  <TableCell className="font-medium">{community.name}</TableCell>
                  <TableCell>{community.category}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(community.status)}`}>
                      {community.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {community.memberCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                      {community.discussions}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <ShieldAlert className="h-4 w-4 mr-1 text-muted-foreground" />
                      {community.moderators}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {community.lastActivity}
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
                          View Community
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Community
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Manage Members
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

export default AdminCommunities;
