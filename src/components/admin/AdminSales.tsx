
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSign, Eye, Edit, Plus } from "lucide-react";
import { faker } from "@faker-js/faker";

interface Sale {
  id: number;
  product: string;
  customer: string;
  amount: string;
  date: string;
}

const generateSales = (count = 10): Sale[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    product: faker.commerce.productName(),
    customer: faker.person.fullName(),
    amount: `$${faker.commerce.price({ min: 10, max: 500 })}`,
    date: faker.date.recent({ days: 30 }).toLocaleDateString(),
  }));

const AdminSales = () => {
  const [sales] = useState<Sale[]>(generateSales());

  // Navigation functions (to be connected as part of wiring)
  const handleAddSale = () => {};
  const handleViewSale = (id: number) => {};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sales & Revenue</h2>
          <p className="text-muted-foreground">Track sales and revenue metrics</p>
        </div>
        <Button onClick={handleAddSale}>
          <Plus className="mr-2 h-4 w-4" /> Add New Sale
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.amount}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewSale(sale.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSales;
