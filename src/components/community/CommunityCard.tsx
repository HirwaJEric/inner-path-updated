
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

interface CommunityCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  totem: string;
  memberCount: number;
}

const CommunityCard = ({
  id,
  name,
  description,
  image,
  totem,
  memberCount,
}: CommunityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>{totem}</span>
              {name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Users className="h-4 w-4" />
              <span>{memberCount} members</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button asChild className="w-full">
          <Link to={`/community/${id}`}>View Community</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
