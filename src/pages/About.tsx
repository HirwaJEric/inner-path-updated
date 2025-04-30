
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, Compass, Users, Globe, MessageCircle, Zap, Lightbulb } from "lucide-react";

// Team member data
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "With over 15 years of experience in mindfulness coaching and organizational psychology, Sarah founded InnerPath Journey to help people discover their authentic selves and live with greater purpose.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Michael Chen",
    role: "Chief Product Officer",
    bio: "Michael brings his background in UX design and behavioral science to create transformative digital experiences that make personal growth accessible and engaging for everyone.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Aisha Patel",
    role: "Head of Coaching",
    bio: "A certified mindfulness instructor and therapist, Aisha oversees our coaching programs and ensures they meet the highest standards of practice and care.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "David Rodriguez",
    role: "Chief Technology Officer",
    bio: "David leverages his expertise in software engineering and AI to build the technological foundation that supports our users' personal growth journeys.",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Emily Wong",
    role: "Content Director",
    bio: "As an author and meditation teacher, Emily creates and curates our educational content, ensuring it's both scientifically grounded and accessible.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "James Wilson",
    role: "Community Manager",
    bio: "James fosters connections within our community, creating spaces for sharing, support, and collective growth among our members.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Olivia Martinez",
    role: "Research Lead",
    bio: "With a PhD in positive psychology, Olivia keeps our approaches aligned with the latest research in wellbeing, habit formation, and personal growth.",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef131c1b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Nathan Lee",
    role: "Operations Director",
    bio: "Nathan ensures our organization runs smoothly and sustainably, allowing us to focus on our mission of helping people transform their lives.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

const About = () => {
  const [visibleTeamMembers, setVisibleTeamMembers] = useState(4);

  const loadMoreTeamMembers = () => {
    setVisibleTeamMembers(prev => Math.min(prev + 4, teamMembers.length));
  };
  
  return (
    <Layout>
      <Helmet>
        <title>About Us | InnerPath Journey</title>
        <meta name="description" content="Learn about our mission, values, and the team behind InnerPath Journey." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                At InnerPath Journey, we're dedicated to helping people discover their authentic selves and live with greater purpose, joy, and connection.
              </p>
              <p className="text-lg mb-8">
                Through evidence-based programs, expert guidance, and supportive community, we empower individuals to transform their lives from the inside out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/programs">
                    Explore Our Programs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Our team collaborating" 
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Founded in 2020</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Our Story"
            subtitle="How InnerPath Journey was born from a personal transformation"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="col-span-1">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80" 
                  alt="Founder's journey" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg">
                InnerPath Journey began in 2020 when our founder, Sarah Johnson, experienced her own transformative journey through mindfulness and personal development practices after a period of burnout and disconnection.
              </p>
              <p className="text-lg">
                After 15 years in corporate consulting, Sarah realized that many people were struggling with the same challenges: feeling disconnected from their purpose, overwhelmed by the pace of modern life, and unsure how to create meaningful change.
              </p>
              <p className="text-lg">
                Drawing on her background in organizational psychology and her training in mindfulness practices, Sarah assembled a team of experts to create accessible, science-backed programs that would help people navigate their own inner paths to growth and fulfillment.
              </p>
              <p className="text-lg">
                Today, InnerPath Journey has grown from a small startup to a global community, but our mission remains the same: to guide people toward lives of greater authenticity, purpose, and connection.
              </p>
              
              <div className="pt-6">
                <Button asChild variant="outline">
                  <Link to="/blog">
                    Read Sarah's Story on Our Blog
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Our Values"
            subtitle="The core principles that guide everything we do"
            centered={true}
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-card shadow-sm p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compassion</h3>
              <p className="text-muted-foreground">
                We approach every interaction with kindness, understanding, and care for the whole person.
              </p>
            </div>
            
            <div className="bg-card shadow-sm p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Compass className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
              <p className="text-muted-foreground">
                We champion honesty, transparency, and the courage to be truly ourselves in all we do.
              </p>
            </div>
            
            <div className="bg-card shadow-sm p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth</h3>
              <p className="text-muted-foreground">
                We embrace continuous learning and evolution, both for ourselves and those we serve.
              </p>
            </div>
            
            <div className="bg-card shadow-sm p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We believe in the power of connection and creating supportive environments for shared growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Our Approach"
            subtitle="How we help you transform your life"
          />
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                  Evidence-Based
                </h3>
                <p className="text-muted-foreground">
                  Our programs combine the wisdom of ancient practices with the latest research in psychology, neuroscience, and behavioral change. We're committed to approaches that have been shown to create lasting transformation.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                  Personalized
                </h3>
                <p className="text-muted-foreground">
                  We recognize that each person's journey is unique. Our programs adapt to your specific needs, challenges, and goals, offering customized guidance rather than one-size-fits-all solutions.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Holistic
                </h3>
                <p className="text-muted-foreground">
                  We address the whole person—mind, body, heart, and spirit—recognizing that true growth and well-being come from integrating all aspects of ourselves into a coherent, purposeful life.
                </p>
              </div>
            </div>
            
            <div>
              <div className="grid grid-cols-2 gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80" 
                  alt="Mindfulness practice" 
                  className="rounded-lg h-full w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80" 
                  alt="Personal growth" 
                  className="rounded-lg h-full w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80" 
                  alt="Community support" 
                  className="rounded-lg h-full w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80" 
                  alt="Personal coaching" 
                  className="rounded-lg h-full w-full object-cover"
                />
              </div>
              
              <div className="mt-8">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    Practical & Actionable
                  </h3>
                  <p className="text-muted-foreground">
                    We focus on practical tools and practices that you can integrate into your daily life, creating sustainable habits that lead to lasting change and growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Meet Our Team"
            subtitle="The passionate individuals behind InnerPath Journey"
            centered={true}
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {teamMembers.slice(0, visibleTeamMembers).map((member, index) => (
              <div key={index} className="bg-card shadow-sm rounded-lg overflow-hidden border hover:shadow-md transition-all">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </a>
                    <a href={member.social.twitter} className="text-muted-foreground hover:text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {visibleTeamMembers < teamMembers.length && (
            <div className="flex justify-center mt-10">
              <Button onClick={loadMoreTeamMembers} variant="outline" size="lg">
                Load More Team Members
              </Button>
            </div>
          )}
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">Join Our Team</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              We're always looking for talented individuals who are passionate about our mission.
              Check out our open positions and become part of our journey.
            </p>
            <Button size="lg" asChild>
              <Link to="/careers">
                View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
