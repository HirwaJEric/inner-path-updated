
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  notification: {
    id: number;
    title: string;
    content: string;
    time: string;
    read: boolean;
  };
}

// Use shadcn's Dialog for modal viewing
const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  onClose,
  notification,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{notification.title}</DialogTitle>
        </DialogHeader>
        <div className="mb-4 text-muted-foreground text-sm">{notification.time}</div>
        <p className="mb-6">{notification.content}</p>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
