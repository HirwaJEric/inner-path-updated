
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";

const mockCategories = [
  { id: 1, name: "Mindfulness & Meditation", description: "Calm, awareness, presence" },
  { id: 2, name: "Personal Growth", description: "Inspiration, self-improvement" },
  { id: 3, name: "Relationships", description: "Love, connection" },
  { id: 4, name: "Wellness", description: "Balance, health" },
];

const AdminBlogCategories = () => {
  const [categories] = useState(mockCategories);

  return (
    <div className="max-w-3xl mx-auto my-12 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blog Categories</CardTitle>
          <CardDescription>
            View, add, and manage categories for blog stories.
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <button className="btn-primary flex items-center gap-2 px-4 py-2 rounded bg-primary text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Category
            </button>
            <button className="btn-outline flex items-center gap-2 px-4 py-2 rounded border border-muted">
              <Edit className="mr-2 h-4 w-4" /> View/Edit Categories
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {categories.map((cat) => (
              <li key={cat.id} className="py-4 flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <span className="text-lg font-medium">{cat.name}</span>
                  <span className="block text-muted-foreground">{cat.description}</span>
                </div>
                <button className="btn-ghost mt-2 md:mt-0 flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogCategories;
