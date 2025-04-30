
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ChevronLeft,
  CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Mock event data (in a real app, this would be fetched from an API)
  const event = {
    id: Number(id),
    title: id === "1" ? "Mindfulness Workshop" : "Meditation Retreat",
    date: id === "1" ? "April 25, 2025" : "May 15-17, 2025",
    time: id === "1" ? "2:00 PM - 4:00 PM" : "All Day",
    location: id === "1" ? "Online" : "Serenity Center",
    address: id === "1" ? "Zoom (link will be sent after registration)" : "123 Peaceful Lane, Meditation Valley, CA",
    description: id === "1" 
      ? "Join us for a transformative mindfulness workshop led by expert practitioners. This interactive session will guide you through proven techniques to reduce stress, increase focus, and cultivate greater awareness in your daily life. Suitable for beginners and experienced practitioners alike."
      : "A three-day immersive retreat focusing on meditation and inner peace. Disconnect from the outside world and reconnect with yourself in this serene natural setting. All meals and accommodations are included. Limited spots available to ensure a personal and impactful experience.",
    price: id === "1" ? 49.99 : 299.99,
    availableSeats: id === "1" ? 15 : 8,
    facilitator: id === "1" ? "Dr. Sarah Johnson" : "Master Yogi Raj Kumar",
    facilitatorBio: id === "1" 
      ? "Dr. Sarah Johnson is a clinical psychologist specializing in mindfulness-based cognitive therapy with over 15 years of experience."
      : "Master Raj Kumar has dedicated over 30 years to the practice and teaching of meditation across Asia and the Western world.",
    agenda: id === "1" 
      ? [
          "Introduction to mindfulness concepts",
          "Guided meditation sessions",
          "Mindful breathing techniques",
          "Body scan practice",
          "Q&A and personalized guidance"
        ]
      : [
          "Day 1: Arrival and orientation, evening meditation",
          "Day 2: Morning yoga, guided meditations, mindful walking",
          "Day 3: Dawn meditation, closing ceremony, departure"
        ],
    image: id === "1" 
      ? "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
      : "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  };

  const simulatePayment = () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setPaymentProcessing(false);
      setIsBookingComplete(true);
      toast({
        title: "Booking Successful!",
        description: `You have successfully booked ${numTickets} ticket(s) for ${event.title}.`,
        variant: "default",
      });
    }, 2000);
  };

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Helmet>
          <title>{event.title} | InnerPath Journey</title>
          <meta name="description" content={event.description.substring(0, 160)} />
        </Helmet>

        <div className="max-w-4xl mx-auto">
          <Link to="/events" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Events
          </Link>

          <div className="relative rounded-xl overflow-hidden h-64 mb-6">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
              <div className="flex items-center text-white/80">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">{event.date}</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{event.time}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Event details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{event.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                    {event.agenda.map((item, index) => (
                      <li key={index} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mb-3">Facilitator</h3>
                  <p className="text-muted-foreground">
                    <strong>{event.facilitator}</strong> - {event.facilitatorBio}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">{event.location}</h3>
                      <p className="text-muted-foreground">{event.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking card */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Reserve Your Spot</CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.availableSeats} seats available</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-6">${event.price} <span className="text-sm font-normal text-muted-foreground">per person</span></p>
                  
                  <div className="mb-6">
                    <Label htmlFor="numTickets">Number of Tickets</Label>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={numTickets <= 1}
                        onClick={() => setNumTickets(prev => Math.max(1, prev - 1))}
                      >
                        -
                      </Button>
                      <Input 
                        id="numTickets"
                        type="number" 
                        min="1" 
                        max={event.availableSeats} 
                        value={numTickets}
                        onChange={(e) => setNumTickets(Math.min(event.availableSeats, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="mx-2 text-center"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        disabled={numTickets >= event.availableSeats}
                        onClick={() => setNumTickets(prev => Math.min(event.availableSeats, prev + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span>Price ({numTickets} ticket{numTickets > 1 ? 's' : ''})</span>
                    <span>${(event.price * numTickets).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-6">
                    <span>Processing Fee</span>
                    <span>${(event.price * numTickets * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold mb-6 pt-4 border-t">
                    <span>Total</span>
                    <span>${(event.price * numTickets * 1.05).toFixed(2)}</span>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Book Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Booking</DialogTitle>
                        <DialogDescription>
                          Complete your booking for {numTickets} ticket{numTickets > 1 ? 's' : ''} to {event.title}.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <span className="text-muted-foreground">{event.time}</span>
                        </div>
                        
                        <div className="rounded-md bg-muted p-4">
                          <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${(event.price * numTickets).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Processing Fee</span>
                            <span>${(event.price * numTickets * 0.05).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-2 border-t border-border">
                            <span>Total</span>
                            <span>${(event.price * numTickets * 1.05).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        {isBookingComplete ? (
                          <div className="w-full text-center">
                            <div className="text-green-500 font-semibold mb-2">Booking Successful!</div>
                            <p className="text-sm text-muted-foreground mb-4">
                              Check your email for booking confirmation and details.
                            </p>
                            <DialogClose asChild>
                              <Button>Close</Button>
                            </DialogClose>
                          </div>
                        ) : (
                          <Button 
                            onClick={simulatePayment} 
                            className="w-full"
                            disabled={paymentProcessing}
                          >
                            {paymentProcessing ? "Processing..." : `Pay $${(event.price * numTickets * 1.05).toFixed(2)}`}
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    By booking, you agree to our terms and conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
