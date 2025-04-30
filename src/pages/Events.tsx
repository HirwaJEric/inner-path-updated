
import { Helmet } from "react-helmet-async";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Mindfulness Workshop",
      date: "April 25, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Online",
      description: "Join us for a transformative mindfulness workshop led by expert practitioners.",
      availableSeats: 15
    },
    {
      id: 2,
      title: "Meditation Retreat",
      date: "May 15-17, 2025",
      time: "All Day",
      location: "Serenity Center",
      description: "A three-day immersive retreat focusing on meditation and inner peace.",
      availableSeats: 8
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Helmet>
          <title>Upcoming Events | InnerPath Journey</title>
          <meta name="description" content="Join our upcoming events and workshops for personal growth and inner development." />
        </Helmet>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Upcoming Events</h1>
          </div>

          <div className="grid gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    {event.date} • {event.time} • {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {event.availableSeats} seats available
                    </span>
                    <Button asChild>
                      <Link to={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
