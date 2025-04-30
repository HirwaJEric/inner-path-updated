
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AdminPlaceholderProps {
  title: string;
  description: string;
  addLabel?: string;
  icon?: ReactNode;
}

// A generic admin placeholder component
export const AdminPlaceholder = ({ title, description, addLabel, icon }: AdminPlaceholderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        {addLabel && (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {addLabel}
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This management interface is under development. Check back soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-16">
          {icon || (
            <div className="text-6xl text-muted-foreground">🚧</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
