
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const JobPostingDetails = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Briefcase className="inline-block mr-2 h-6 w-6" />
            Job Posting Details
          </CardTitle>
          <CardDescription>
            View detailed information about this job posting. (Implementation coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-8 text-center">
            Job Posting details will be displayed here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostingDetails;
