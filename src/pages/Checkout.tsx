import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CreditCard, CheckCircle, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingTier } from "@/components/pricing/PricingCard";
import { useCartStore, CartItem } from "@/store/cartStore";
import { enrollInCourse } from '@/utils/localStorage';

// Mock subscription info - in a real app, you'd fetch this from localStorage or backend
const getUserSubscriptionDiscount = () => {
  // Mock subscription data (free=0%, starter=10%, transformation=20%, complete=30%)
  const subscriptionType = localStorage.getItem('subscriptionType') || 'free';
  
  switch(subscriptionType) {
    case 'starter':
      return 0.1; // 10%
    case 'transformation':
      return 0.2; // 20%
    case 'complete':
      return 0.3; // 30%
    default:
      return 0; // 0%
  }
};

const getDiscountDescription = () => {
  const subscriptionType = localStorage.getItem('subscriptionType') || 'free';
  if (subscriptionType === 'free') return null;
  
  const discountPercent = getUserSubscriptionDiscount() * 100;
  return `${discriptionType} subscriber discount (${discountPercent}%)`;
};

const descriptionMap: Record<string, string> = {
  'free': 'Free',
  'starter': 'Starter',
  'transformation': 'Transformation',
  'complete': 'Complete'
};

const discriptionType = descriptionMap[localStorage.getItem('subscriptionType') || 'free'];

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    paymentMethod: "credit-card"
  });
  const [tierInfo, setTierInfo] = useState<{
    tier: PricingTier;
    billingCycle: "monthly" | "yearly" | "threeYear";
  } | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly" | "threeYear">("monthly");
  
  // Get cart items
  const { items, totalPrice, totalItems, updateQuantity, removeItem, clearCart } = useCartStore();
  
  // Calculate discount based on subscription type
  const discountRate = getUserSubscriptionDiscount();
  const discount = totalPrice * discountRate;
  const finalPrice = totalPrice - discount;

  const [courseInfo, setCourseInfo] = useState<any>(null);

  useEffect(() => {
    // Get subscription info from location state
    if (location.state?.tier) {
      setTierInfo({
        tier: location.state.tier,
        billingCycle: location.state.billingCycle || "monthly"
      });
      setBillingCycle(location.state.billingCycle || "monthly");
    }

    // Get course info from location state if it exists
    if (location.state?.course) {
      setCourseInfo(location.state.course);
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const getBillingPrice = () => {
    if (!tierInfo) return 0;
    
    switch (billingCycle) {
      case "yearly":
        return tierInfo.tier.billingOptions.yearly;
      case "threeYear":
        return tierInfo.tier.billingOptions.threeYear;
      default:
        return tierInfo.tier.billingOptions.monthly;
    }
  };

  const getBillingPeriod = () => {
    switch (billingCycle) {
      case "yearly":
        return "yearly";
      case "threeYear":
        return "3-year";
      default:
        return "monthly";
    }
  };

  const getSavingsText = () => {
    if (!tierInfo) return "";
    
    if (billingCycle === "yearly") {
      const monthly = tierInfo.tier.billingOptions.monthly * 12;
      const yearly = tierInfo.tier.billingOptions.yearly;
      const savings = monthly - yearly;
      return `Save $${savings.toFixed(2)} compared to monthly billing`;
    } else if (billingCycle === "threeYear") {
      const monthly = tierInfo.tier.billingOptions.monthly * 36;
      const threeYear = tierInfo.tier.billingOptions.threeYear;
      const savings = monthly - threeYear;
      return `Save $${savings.toFixed(2)} compared to monthly billing`;
    }
    return "";
  };

  const incrementQuantity = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decrementQuantity = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else if (item) {
      removeItem(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
        toast.error("Please fill in all payment details");
        return;
      }
    }

    // Start simulated payment process
    processPayment();
  };

  const processPayment = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (courseInfo) {
        // Enroll in the course
        enrollInCourse(courseInfo);
        
        setPaymentStep(2);
        toast.success("Payment successful! You're now enrolled in the course.");
        
        // After 2 seconds, redirect to the course learning page
        setTimeout(() => {
          navigate(`/courses/${courseInfo.slug}/learn`);
        }, 2000);
      } else {
        // Store purchase information in localStorage
        if (tierInfo) {
          // Store subscription info
          localStorage.setItem('subscriptionType', tierInfo.tier.name.toLowerCase());
          localStorage.setItem('subscriptionBillingCycle', billingCycle);
          localStorage.setItem('subscriptionStartDate', new Date().toISOString());
          localStorage.setItem('subscriptionPrice', getBillingPrice().toString());
        }
        
        if (items.length > 0) {
          // Store purchase history
          const existingPurchases = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
          const newPurchase = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: items,
            subtotal: totalPrice,
            discount: discount,
            total: finalPrice,
            paymentMethod: formData.paymentMethod
          };
          existingPurchases.push(newPurchase);
          localStorage.setItem('purchaseHistory', JSON.stringify(existingPurchases));
          
          // Clear cart after successful purchase
          clearCart();
        }
        
        setPaymentStep(2); // Move to success state
        
        // Simulate successful payment
        toast.success("Payment successful!");
        
        // After 2 seconds, redirect to the dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      
      <Helmet>
        <title>Checkout | InnerPath Journey</title>
        <meta name="description" content="Complete your order and begin your transformative journey." />
      </Helmet>
      
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {paymentStep === 1 ? (
          <>
            <h1 className="text-3xl font-bold mb-8">
              {courseInfo ? "Complete Course Enrollment" : "Complete Your Subscription"}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div>
                {courseInfo && (
                  <Card className="p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Course Summary</h2>
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img 
                          src={courseInfo.image} 
                          alt={courseInfo.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-lg">{courseInfo.title}</h3>
                      <p className="text-sm text-muted-foreground">{courseInfo.description}</p>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${courseInfo.price}</span>
                      </div>
                    </div>
                  </Card>
                )}

                {tierInfo && (
                  <Card className="p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Subscription Summary</h2>
                    <div className="mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{tierInfo.tier.name} Plan</h3>
                        <p className="text-sm text-muted-foreground">{tierInfo.tier.description}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <Tabs 
                        value={billingCycle}
                        onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly" | "threeYear")}
                        className="w-full"
                      >
                        <TabsList className="grid grid-cols-3 mb-4">
                          <TabsTrigger value="monthly">Monthly</TabsTrigger>
                          <TabsTrigger value="yearly">Yearly</TabsTrigger>
                          <TabsTrigger value="threeYear">3-Year</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      
                      {billingCycle !== "monthly" && (
                        <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                          {getSavingsText()}
                        </p>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>{getBillingPeriod()} subscription</span>
                        <span>${getBillingPrice().toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${getBillingPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </Card>
                )}

                {items.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-4">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => decrementQuantity(item.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => incrementQuantity(item.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      {discountRate > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>{getDiscountDescription()}</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${finalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {/* Payment Section */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName"
                            name="fullName" 
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Your full name" 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            name="email" 
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@example.com" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <RadioGroup 
                        defaultValue="credit-card"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
                        className="mt-4"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit/Debit Card
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      {formData.paymentMethod === "credit-card" && (
                        <div className="border rounded-md p-4 space-y-4 mt-2">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber"
                              name="cardNumber" 
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456" 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="cardExpiry">Expiration Date</Label>
                              <Input 
                                id="cardExpiry"
                                name="cardExpiry" 
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY" 
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardCvc">CVC</Label>
                              <Input 
                                id="cardCvc"
                                name="cardCvc" 
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                placeholder="123" 
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full mt-6"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Complete Payment"} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </Card>

                <div className="text-center text-sm text-muted-foreground">
                  <p>By proceeding, you agree to our</p>
                  <div className="space-x-2">
                    <Link to="/terms" className="hover:underline text-primary">Terms of Service</Link>
                    <span>&middot;</span>
                    <Link to="/privacy" className="hover:underline text-primary">Privacy Policy</Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-3">
              {courseInfo ? "Course Enrolled!" : tierInfo ? "Subscription Activated!" : "Order Confirmed!"}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {courseInfo 
                ? `Thank you for enrolling in ${courseInfo.title}.` 
                : tierInfo 
                  ? `Thank you for subscribing to our ${tierInfo.tier.name} plan.` 
                  : "Thank you for your purchase."} You will be redirected shortly.
            </p>
            <div className="flex justify-center">
              <div className="w-full max-w-xs bg-muted h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full animate-pulse-fast" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
