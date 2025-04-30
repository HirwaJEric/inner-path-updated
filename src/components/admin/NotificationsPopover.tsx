
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: 1, title: "Welcome to InnerPath Admin", time: "10:45 AM" },
  { id: 2, title: "System Maintenance Tonight", time: "10:00 PM" },
  { id: 3, title: "New User Signup: Jane Doe", time: "Yesterday" },
];

const NotificationsPopover = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="relative"
        onClick={() => setOpen((o) => !o)}
        aria-label="Show notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500" />
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border shadow-lg z-50 rounded-lg overflow-hidden">
          <div className="p-2 font-bold text-sm border-b pb-2">Latest Notifications</div>
          <ul className="max-h-64 overflow-auto">
            {notifications.map((n) => (
              <li key={n.id} className="px-4 py-2 border-b last:border-b-0 hover:bg-muted cursor-pointer">
                <div className="font-medium text-sm">{n.title}</div>
                <div className="text-xs text-muted-foreground">{n.time}</div>
              </li>
            ))}
          </ul>
          <div className="text-xs text-center p-2">
            <a href="#notifications" className="text-blue-600 hover:underline">View all notifications</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPopover;
