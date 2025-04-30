
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const AddTeamMember = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <UserPlus className="inline-block mr-2 h-6 w-6" />
            Add New Team Member
          </CardTitle>
          <CardDescription>
            Fill in the details below to add a new team member to your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder form - add fields as needed */}
          <div className="text-muted-foreground py-8 text-center">
            Add New Team Member form coming soon!
          </div>
          <div className="flex justify-end">
            <Button disabled>Add Member</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeamMember;
