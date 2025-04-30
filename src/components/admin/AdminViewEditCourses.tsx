
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";

const AdminViewEditCourses = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <Edit className="inline-block mr-2 h-5 w-5" /> View/Edit Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            {/* Placeholder: Add course edit functionality here */}
            Course editing functionality will be here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminViewEditCourses;
