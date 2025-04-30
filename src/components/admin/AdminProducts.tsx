import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  DollarSign,
  Box,
  Star,
  Tag
} from "lucide-react";
import { faker } from "@faker-js/faker";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/pagination";

interface Product {
  id: number;
  name: string;
  category: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  price: string;
  inventory: number;
  sales: number;
  rating: number;
  sku: string;
}

const generateProducts = (count = 32): Product[] =>
  Array.from({ length: count }, (_, i) => {
    const inventory = faker.number.int({ min: 0, max: 100 });
    let status: "In Stock" | "Low Stock" | "Out of Stock";
    if (inventory === 0) {
      status = "Out of Stock";
    } else if (inventory < 10) {
      status = "Low Stock";
    } else {
      status = "In Stock";
    }
    return {
      id: i + 1,
      name: faker.helpers.arrayElement([
        "Meditation Cushion Set",
        "Mindfulness Journal",
        "Essential Oil Diffuser",
        "Self-Care Gift Box",
        "Crystal Healing Set",
        "Yoga Mat Premium",
        "Gratitude Cards Pack",
        "Affirmation Deck",
        "Wellness Tea Collection",
        "Chakra Balancing Kit",
        "Bamboo Meditation Bench",
        "Sound Healing Bowl"
      ]),
      category: faker.helpers.arrayElement([
        "Meditation", 
        "Wellness", 
        "Journaling", 
        "Self-Care", 
        "Yoga",
        "Healing"
      ]),
      status,
      price: `$${faker.commerce.price({ min: 19, max: 199 })}`,
      inventory,
      sales: faker.number.int({ min: 0, max: 500 }),
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toFixed(1)),
      sku: faker.string.alphanumeric(8).toUpperCase(),
    };
  });

const AdminProducts = () => {
  const [products] = useState<Product[]>(generateProducts(30));
  const { currentPage, totalPages, pageItems, goToPage } = usePagination({ totalItems: products.length, pageSize: 10 });
  const pageProducts = pageItems(products);

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "In Stock": return "bg-green-100 text-green-800";
      case "Low Stock": return "bg-yellow-100 text-yellow-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-muted-foreground">
            Manage shop products, inventory, and pricing
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{product.name}</span>
                      <span className="text-xs text-muted-foreground">
                        <Tag className="h-3 w-3 mr-1 inline" />
                        {product.sku}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(product.status)}`}>
                      {product.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      {product.price}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Box className="h-4 w-4 mr-1 text-muted-foreground" />
                      {product.inventory}
                    </div>
                  </TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-amber-500" />
                      {product.rating}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Product
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
