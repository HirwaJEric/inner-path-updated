
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const EditTeamMember = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Edit className="inline-block mr-2 h-6 w-6" />
            Edit Team Member
          </CardTitle>
          <CardDescription>
            Update the details of your team member here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder form - add fields as needed */}
          <div className="text-muted-foreground py-8 text-center">
            Edit Team Member form coming soon!
          </div>
          <div className="flex justify-end">
            <Button disabled>Update Member</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTeamMember;
