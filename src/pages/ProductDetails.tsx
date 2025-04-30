import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ShoppingCart, 
  ChevronLeft, 
  Truck, 
  Shield, 
  ArrowRight,
  Minus,
  Plus,
  Check,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StarRating from "@/components/ratings/StarRating";
import ProductReview, { ReviewType } from "@/components/ratings/ProductReview";
import ReviewForm from "@/components/ratings/ReviewForm";
import { useCartStore } from "@/store/cartStore";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock products data (in a real app, this would be fetched from an API)
  const products = [
    {
      id: 1,
      name: "Meditation Cushion",
      price: 49.99,
      description: "Comfortable cushion for your meditation practice",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: "Tools",
      detailedDescription: "Our premium meditation cushion is designed to provide optimal comfort and support during your meditation sessions. Made with high-quality, sustainable materials, it helps maintain proper posture and alignment, reducing strain on your back, knees, and ankles. The removable cover is machine washable for easy cleaning.",
      features: [
        "Ergonomic design for proper spine alignment",
        "Filled with natural buckwheat hulls",
        "Removable, machine-washable cover",
        "Carrying handle for easy transport",
        "Available in multiple colors"
      ],
      specifications: [
        "Dimensions: 16\" diameter, 6\" height",
        "Weight: 4.5 lbs",
        "Materials: 100% organic cotton cover, buckwheat hull filling",
        "Made in USA"
      ],
      inStock: true,
      relatedProducts: [3, 6],
      averageRating: 4.5,
      reviewCount: 28,
      reviews: [
        {
          id: 1,
          user: {
            name: "Alex Johnson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          },
          date: new Date(2025, 3, 10),
          rating: 5,
          title: "Absolutely Perfect for Daily Meditation",
          comment: "I've been using this cushion for three months now and it has dramatically improved my meditation experience. The buckwheat hulls provide just the right amount of firmness yet conform to your body. My posture is better and I can sit for longer periods without discomfort.",
          verified: true
        },
        {
          id: 2,
          user: {
            name: "Sarah Miller"
          },
          date: new Date(2025, 3, 5),
          rating: 4,
          title: "Great Quality, Wish It Came in More Colors",
          comment: "The quality of this meditation cushion is excellent. The fabric feels durable and the stitching is solid. My only wish is that it came in more color options to match my space. Otherwise, it's perfect and has helped my practice tremendously.",
          verified: true
        },
        {
          id: 3,
          user: {
            name: "Michael Chen"
          },
          date: new Date(2025, 2, 22),
          rating: 5,
          title: "Worth Every Penny",
          comment: "As someone who struggled with back pain during meditation, this cushion has been a game-changer. The elevation helps maintain proper alignment and the buckwheat filling offers the perfect balance of support and comfort. Highly recommend!",
          verified: true
        }
      ]
    },
    // ... keep existing code (other product definitions)
  ];

  const product = products.find(p => p.id === Number(id));
  
  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      
      toast({
        title: "Added to Cart",
        description: `${quantity} x ${product.name} added to your shopping cart.`,
        variant: "default",
      });
    }
  };

  const relatedProductsData = product?.relatedProducts.map(id => 
    products.find(p => p.id === id)
  ).filter(Boolean);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Helmet>
          <title>{product.name} | Shop | InnerPath Journey</title>
          <meta name="description" content={product.description} />
        </Helmet>

        <div className="max-w-6xl mx-auto">
          <Link to="/shop" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover aspect-square"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                  {product.inStock ? (
                    <span className="flex items-center text-green-500 text-sm">
                      <Check className="h-4 w-4 mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 text-sm">Out of Stock</span>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-2">
                  <StarRating initialRating={product.averageRating} readOnly size={18} />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
                
                <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
              </div>

              <p className="text-muted-foreground">{product.detailedDescription}</p>

              <div className="space-y-4">
                <h3 className="font-semibold">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t">
                <div className="flex items-center mb-4">
                  <label htmlFor="quantity" className="mr-4 font-medium">Quantity:</label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setQuantity(prev => prev + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    Buy Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-muted-foreground">On orders over $75</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">30-Day Returns</h4>
                    <p className="text-sm text-muted-foreground">Satisfaction guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details" className="mb-12">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">{product.detailedDescription}</p>
                <h3 className="text-lg font-semibold">Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">{feature}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Specifications</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="text-muted-foreground">{spec}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shipping Information</h3>
                <p className="text-muted-foreground">
                  We ship worldwide using trusted courier services. Standard shipping takes 3-5 business days within the US, and 7-14 business days for international orders. Expedited shipping options are available at checkout.
                </p>
                
                <h3 className="text-lg font-semibold">Return Policy</h3>
                <p className="text-muted-foreground">
                  If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Items must be unused and in their original packaging. Return shipping costs may apply.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <StarRating initialRating={product.averageRating} readOnly size={24} />
                      <span className="ml-2 font-medium">
                        {product.averageRating.toFixed(1)} out of 5
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {product.reviewCount} reviews
                    </p>
                  </div>
                  
                  <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {showReviewForm ? "Cancel Review" : "Write a Review"}
                  </Button>
                </div>
                
                {showReviewForm && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Write Your Review</CardTitle>
                      <CardDescription>
                        Share your experience with this product
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReviewForm 
                        productId={product.id} 
                        onReviewSubmitted={() => setShowReviewForm(false)}
                      />
                    </CardContent>
                  </Card>
                )}
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="divide-y">
                      {product.reviews.map((review: ReviewType) => (
                        <ProductReview key={review.id} review={review} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      This product has no reviews yet. Be the first to leave a review!
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProductsData && relatedProductsData.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProductsData.map((relatedProduct) => (
                  <Card key={relatedProduct?.id}>
                    <CardHeader>
                      <img
                        src={relatedProduct?.image}
                        alt={relatedProduct?.name}
                        className="w-full aspect-[4/3] object-cover rounded-md mb-4"
                      />
                      <CardTitle>{relatedProduct?.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-semibold">${relatedProduct?.price.toFixed(2)}</p>
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {relatedProduct?.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{relatedProduct?.description}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/shop/${relatedProduct?.id}`}>View Details</Link>
                      </Button>
                      <Button className="w-full" onClick={() => {
                        if (relatedProduct) {
                          addItem({
                            id: relatedProduct.id,
                            name: relatedProduct.name,
                            price: relatedProduct.price,
                            image: relatedProduct.image
                          });
                          toast({
                            title: "Added to Cart",
                            description: `${relatedProduct.name} added to your shopping cart.`,
                            variant: "default",
                          });
                        }
                      }}>Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
