
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import NotificationModal from "./NotificationModal";

const notifications = [
  {
    id: 1,
    title: "Welcome to InnerPath Admin",
    content: "Your new courses are live! 🎉",
    time: "Today, 10:45 AM",
    read: false,
  },
  {
    id: 2,
    title: "System Maintenance",
    content: "Maintenance will occur at 2 AM UTC.",
    time: "Yesterday, 5:00 PM",
    read: true,
  },
  {
    id: 3,
    title: "New User Signup",
    content: "Jane Doe just signed up for the Journey course.",
    time: "Yesterday, 9:15 AM",
    read: false,
  },
];

const AdminNotifications = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <div className="bg-white rounded shadow-sm">
        <ul>
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`flex items-center px-4 py-3 border-b cursor-pointer ${!n.read ? "bg-muted" : ""}`}
              onClick={() => setSelected(n.id)}
            >
              <span className={`w-2 h-2 mr-3 rounded-full ${n.read ? "bg-transparent" : "bg-blue-500"}`} />
              <span className="font-medium">{n.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">{n.time}</span>
            </li>
          ))}
        </ul>
      </div>
      {selected && (
        <NotificationModal
          open={!!selected}
          onClose={() => setSelected(null)}
          notification={notifications.find((n) => n.id === selected)!}
        />
      )}
    </div>
  );
};

export default AdminNotifications;
