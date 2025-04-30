
import { AdminPlaceholder } from "./AdminCommon";
import { Clock } from "lucide-react";

const AdminCalendar = () => {
  return (
    <AdminPlaceholder
      title="Calendar Availability"
      description="Manage calendar availability and scheduling"
      icon={<Clock className="h-20 w-20 text-muted-foreground" />}
    />
  );
};

export default AdminCalendar;
