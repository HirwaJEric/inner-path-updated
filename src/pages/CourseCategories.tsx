
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { useState } from "react";

const mockCategories = [
  { id: 1, name: "Mindfulness", description: "Meditation, self-awareness" },
  { id: 2, name: "Personal Growth", description: "Life skills, habits" },
  { id: 3, name: "Wellness", description: "Health and holistic approaches" },
  { id: 4, name: "Relationships", description: "Connection and emotion" },
];

const CourseCategories = () => {
  const [categories] = useState(mockCategories);

  return (
    <div className="max-w-3xl mx-auto my-12 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Categories</CardTitle>
          <CardDescription>
            View, add, and edit course categories for courses.
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Category
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> View/Edit Categories
            </Button>
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
                <Button variant="ghost" className="mt-2 md:mt-0">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCategories;
