
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ComingSoonProps {
  title: string;
}

export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4">{title} - Coming Soon</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        We're currently working on this feature. It will be available soon!
      </p>
      <Button asChild>
        <Link to="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
