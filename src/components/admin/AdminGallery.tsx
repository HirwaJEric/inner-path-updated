
import { AdminPlaceholder } from "./AdminCommon";
import { Image } from "lucide-react";

const AdminGallery = () => {
  return (
    <AdminPlaceholder
      title="Gallery Management"
      description="Manage gallery images and collections"
      addLabel="Upload Images"
      icon={<Image className="h-20 w-20 text-muted-foreground" />}
    />
  );
};

export default AdminGallery;
