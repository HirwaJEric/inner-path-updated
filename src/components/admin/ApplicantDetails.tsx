
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

const ApplicantDetails = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <UserPlus className="inline-block mr-2 h-6 w-6" />
            Applicant Details
          </CardTitle>
          <CardDescription>
            View and update this applicant's information and status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for applicant info and update form */}
          <div className="text-muted-foreground py-8 text-center">
            Applicant information and actions coming soon!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicantDetails;
