
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const AddUser = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Users className="inline-block mr-2 h-6 w-6" /> Add New User
          </CardTitle>
          <CardDescription>
            Fill out the form below to add a new user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input className="border rounded px-3 py-2 w-full" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input type="email" className="border rounded px-3 py-2 w-full" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="block font-medium mb-1">Role</label>
              <select className="border rounded px-3 py-2 w-full">
                <option>Admin</option>
                <option>Editor</option>
                <option>Member</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Status</label>
              <select className="border rounded px-3 py-2 w-full">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Add User</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
