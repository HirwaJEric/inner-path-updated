import React from "react";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import StarRating from "@/components/ratings/StarRating";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const { addItem } = useCartStore();
  const { toast } = useToast();
  
  const products = [
    {
      id: 1,
      name: "Meditation Cushion",
      price: 49.99,
      description: "Comfortable cushion for your meditation practice",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: "Tools",
      averageRating: 4.5,
      reviewCount: 28
    },
    {
      id: 2,
      name: "Mindfulness Journal",
      price: 24.99,
      description: "Beautiful journal for daily reflections",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Books",
      averageRating: 4.2,
      reviewCount: 15
    },
    {
      id: 3,
      name: "Essential Oil Set",
      price: 39.99,
      description: "Calming essential oils for aromatherapy",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      category: "Tools",
      averageRating: 4.7,
      reviewCount: 42
    },
    {
      id: 4,
      name: "Self-Improvement Handbook",
      price: 19.99,
      description: "Practical guide for personal growth and mindfulness",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: "Handbooks",
      averageRating: 4.0,
      reviewCount: 19
    },
    {
      id: 5,
      name: "Yoga Guide Book",
      price: 34.99,
      description: "Comprehensive guide to yoga poses and practices",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      category: "Books",
      averageRating: 4.8,
      reviewCount: 31
    },
    {
      id: 6,
      name: "Meditation Timer",
      price: 29.99,
      description: "Simple tool to track your meditation sessions",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      category: "Tools",
      averageRating: 3.9,
      reviewCount: 12
    },
  ];

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your shopping cart.`,
      variant: "default",
    });
  };

  return (
    <>
      <SEO
        title="Shop | InnerPath Journey"
        description="Browse and purchase our wellness, mindfulness, and personal growth products in the InnerPath Journey Shop."
        canonicalUrl="/shop"
        ogImage="https://innerpathjourney.com/shop-og-image.jpg"
        ogImageAlt="Shop your growth essentials at InnerPath"
      />
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Helmet>
            <title>Shop | InnerPath Journey</title>
            <meta name="description" content="Shop our curated collection of mindfulness and meditation products." />
          </Helmet>

          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Shop</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-[4/3] object-cover rounded-md mb-4"
                    />
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg font-semibold">${product.price}</p>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <StarRating initialRating={product.averageRating} readOnly size={16} />
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({product.reviewCount})
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/shop/${product.id}`}>View Details</Link>
                    </Button>
                    <Button className="w-full" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
