
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import React from "react";

interface StatProps {
  name: string;
  value: string;
  icon: React.ElementType;
  color: string;
  change?: string;
}

export const AdminStatCard = ({ stat }: { stat: StatProps }) => {
  // Determine if change is positive or negative
  const isPositive = stat.change && stat.change.startsWith('+');
  
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{stat.name}</p>
          <p className="text-3xl font-bold">{stat.value}</p>
          
          {stat.change && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} from last month
              </span>
            </div>
          )}
        </div>
        <div className={`${stat.color} p-3 rounded-full`}>
          <stat.icon className="h-5 w-5 text-white" />
        </div>
      </CardContent>
    </Card>
  );
};
