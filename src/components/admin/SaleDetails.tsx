
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, DollarSign } from "lucide-react";

const SaleDetails = () => {
  // Example: Display sale details for editing
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <DollarSign className="inline-block mr-2 h-6 w-6" /> Sale Details
          </CardTitle>
          <CardDescription>
            View and edit sale details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Product</label>
              <input className="border rounded px-3 py-2 w-full" defaultValue="Product name" />
            </div>
            <div>
              <label className="block font-medium mb-1">Customer Name</label>
              <input className="border rounded px-3 py-2 w-full" defaultValue="Customer name" />
            </div>
            <div>
              <label className="block font-medium mb-1">Amount</label>
              <input type="number" className="border rounded px-3 py-2 w-full" defaultValue="120" />
            </div>
            <div>
              <label className="block font-medium mb-1">Date</label>
              <input type="date" className="border rounded px-3 py-2 w-full" defaultValue="2024-01-01" />
            </div>
            <div className="flex justify-end">
              <Button>
                <Edit className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaleDetails;
