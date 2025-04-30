
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const AddJobPosting = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Briefcase className="inline-block mr-2 h-6 w-6" />
            Add New Job Posting
          </CardTitle>
          <CardDescription>
            Fill in the role and requirements for a new job opportunity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder form - add fields as needed */}
          <div className="text-muted-foreground py-8 text-center">
            Job Posting form coming soon!
          </div>
          <div className="flex justify-end">
            <Button disabled>Add Job</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddJobPosting;
