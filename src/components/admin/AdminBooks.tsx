
import { AdminPlaceholder } from "./AdminCommon";
import { Bookmark } from "lucide-react";

const AdminBooks = () => {
  return (
    <AdminPlaceholder
      title="Book Management"
      description="Manage upcoming books and publications"
      addLabel="Add New Book"
      icon={<Bookmark className="h-20 w-20 text-muted-foreground" />}
    />
  );
};

export default AdminBooks;
