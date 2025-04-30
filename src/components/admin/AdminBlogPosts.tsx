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
  FileText, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  Calendar,
  Clock,
  Tag,
  MessageSquare,
  Eye as EyeIcon
} from "lucide-react";
import { faker } from "@faker-js/faker";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/pagination";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  category: string;
  status: "Published" | "Draft" | "Scheduled";
  tags: string[];
  comments: number;
  views: number;
  publishDate: string;
  lastUpdated: string;
}

const generateBlogPosts = (count = 22): BlogPost[] =>
  Array.from({ length: count }, (_, i) => {
    const status = faker.helpers.arrayElement(["Published", "Draft", "Scheduled"]);
    return {
      id: i + 1,
      title: faker.helpers.arrayElement([
        "Finding Inner Peace in a Chaotic World",
        "5 Meditation Techniques for Beginners",
        "The Science Behind Mindfulness",
        "How to Create a Personal Growth Plan",
        "Overcoming Self-Doubt: A Practical Guide",
        "Building Meaningful Relationships",
        "The Power of Gratitude in Everyday Life",
        "Stress Management for Busy Professionals",
        "Reconnecting with Your Authentic Self",
        "Mindful Eating: Transform Your Relationship with Food",
        "The Art of Letting Go",
        "Creating Sacred Space in Your Home"
      ]),
      author: faker.person.fullName(),
      category: faker.helpers.arrayElement([
        "Personal Growth", 
        "Meditation", 
        "Mindfulness", 
        "Relationships", 
        "Wellness",
        "Spirituality"
      ]),
      status,
      tags: Array.from(
        { length: faker.number.int({ min: 1, max: 4 }) }, 
        () => faker.helpers.arrayElement([
          "meditation", "mindfulness", "self-care", "growth",
          "healing", "relationships", "spirituality", "wellness",
          "psychology", "habits", "transformation", "purpose"
        ])
      ),
      comments: faker.number.int({ min: 0, max: 50 }),
      views: faker.number.int({ min: 10, max: 5000 }),
      publishDate: status === "Draft" ? "Not published" : faker.date.recent({ days: 90 }).toLocaleDateString(),
      lastUpdated: faker.date.recent({ days: 30 }).toLocaleDateString(),
    };
  });

const AdminBlogPosts = () => {
  const [blogPosts] = useState<BlogPost[]>(generateBlogPosts(28));
  const { currentPage, totalPages, pageItems, goToPage } = usePagination({ totalItems: blogPosts.length, pageSize: 10 });
  const paginatedPosts = pageItems(blogPosts);

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage blog posts and categories
          </p>
        </div>
        <div className="space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Post
          </Button>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            View/Edit Posts
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(post.status)}`}>
                      {post.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center text-xs">
                        <EyeIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                        {post.views}
                      </span>
                      <span className="flex items-center text-xs">
                        <MessageSquare className="h-3 w-3 mr-1 text-muted-foreground" />
                        {post.comments}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {post.publishDate}
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
                          View Post
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Post
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogPosts;
