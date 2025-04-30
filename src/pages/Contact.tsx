import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Phone, Mail as MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type ContactFormValues = z.infer<typeof formSchema>;

// FAQs data
const faqs = [
  {
    question: "What services does InnerPath Journey offer?",
    answer: "We offer a range of services including one-on-one mentorship, group coaching, career guidance, mental health support, and digital courses focused on personal growth and transformation."
  },
  {
    question: "How do I schedule a mentorship session?",
    answer: "You can schedule a mentorship session by visiting our Programs page, selecting the type of mentorship you're interested in, and following the booking process. Alternatively, you can contact us directly through this form."
  },
  {
    question: "What is the cost of mentorship programs?",
    answer: "Our mentorship programs vary in cost depending on the type, duration, and intensity. We offer starter packages, deep dive options, and full transformation journeys. Details about pricing can be found on our Programs page."
  },
  {
    question: "Do you offer refunds if I'm not satisfied?",
    answer: "Yes, we have a satisfaction guarantee. If you're not completely satisfied with your first session, we'll offer a full refund. For ongoing programs, we handle refund requests on a case-by-case basis."
  },
  {
    question: "How long does a mentorship program typically last?",
    answer: "The duration varies based on your goals and the program you choose. Our programs range from single sessions to 3-month, 6-month, and 12-month journeys. We'll help you determine the best fit during your initial consultation."
  },
  {
    question: "Can I change mentors if I don't feel it's the right fit?",
    answer: "Absolutely. We understand the importance of a good match between mentor and mentee. If you feel your current mentor isn't the right fit, we'll help you transition to someone else at no additional cost."
  }
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  // Handle form submission
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us | InnerPath Journey</title>
        <meta name="description" content="Get in touch with our team for mentorship inquiries, support, or general questions about our programs and courses." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <SectionHeader 
          title="Get in Touch" 
          subtitle="We're here to answer your questions and help you on your journey"
          centered
        />
        
        <div className="grid md:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this about?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <textarea
                              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="How can we help you?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-6">
                Have questions or need support? Reach out to us through any of these channels.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Us</h4>
                    <p className="text-muted-foreground">
                      <a href="mailto:hello@innerpathjourney.com" className="hover:text-primary transition-colors">
                        hello@innerpathjourney.com
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We aim to respond within 24 hours
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Live Chat</h4>
                    <p className="text-muted-foreground">
                      Available Monday-Friday
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      9:00 AM - 5:00 PM EST
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">
                      <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                        +1 (234) 567-890
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      For urgent inquiries only
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Stay updated with our latest articles, events, and offerings.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Your email address" type="email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs Section */}
        <div className="mt-20">
          <SectionHeader 
            title="Frequently Asked Questions" 
            subtitle="Find quick answers to common questions"
            centered
          />
          
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* Map and Location */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="bg-muted rounded-xl overflow-hidden">
            <div className="aspect-[16/9] w-full">
              <img 
                src="https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=1200x600&key=AIzaSyBQG2nagmaLUxetbCH5WMUr3sPZQTXuXxg" 
                alt="Map Location" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Visit Our Office</h3>
              <p className="text-muted-foreground">
                123 Transformation Ave, Suite 456<br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
