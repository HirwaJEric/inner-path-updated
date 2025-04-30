
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const AddSale = () => {
  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <DollarSign className="inline-block mr-2 h-6 w-6" /> Add New Sale
          </CardTitle>
          <CardDescription>
            Fill out the form below to add a new sale record.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Product</label>
              <input className="border rounded px-3 py-2 w-full" placeholder="Product name" />
            </div>
            <div>
              <label className="block font-medium mb-1">Customer Name</label>
              <input className="border rounded px-3 py-2 w-full" placeholder="Customer name" />
            </div>
            <div>
              <label className="block font-medium mb-1">Amount</label>
              <input type="number" className="border rounded px-3 py-2 w-full" placeholder="$ Amount" />
            </div>
            <div>
              <label className="block font-medium mb-1">Date</label>
              <input type="date" className="border rounded px-3 py-2 w-full" />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Add Sale</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSale;
