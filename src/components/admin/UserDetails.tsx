
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Users } from "lucide-react";

const UserDetails = () => {
  // Example: Display user info for editing
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Users className="inline-block mr-2 h-6 w-6" /> User Details
          </CardTitle>
          <CardDescription>
            View and edit user details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input className="border rounded px-3 py-2 w-full" defaultValue="Jane Doe" />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input type="email" className="border rounded px-3 py-2 w-full" defaultValue="jane@example.com" />
            </div>
            <div>
              <label className="block font-medium mb-1">Role</label>
              <select className="border rounded px-3 py-2 w-full" defaultValue="Editor">
                <option>Admin</option>
                <option>Editor</option>
                <option>Member</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Status</label>
              <select className="border rounded px-3 py-2 w-full" defaultValue="Active">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex justify-end">
              <Button>
                <Edit className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
