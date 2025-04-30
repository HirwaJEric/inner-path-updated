
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface AdminProfileProps {
  onLogout: () => void;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ onLogout }) => {
  // Profile summary gets demo user info
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-sm">
      <div className="flex items-center space-x-4 mb-4">
        <User className="h-10 w-10 text-muted" />
        <div>
          <h2 className="text-2xl font-bold">Admin User</h2>
          <p className="text-muted-foreground">admin@innerpath.com</p>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Role</div>
          <div className="font-semibold">Administrator</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Joined</div>
          <div>January 1, 2022</div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button variant="destructive" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminProfile;
