
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SectionHeader } from "@/components/ui/section-header";
import { Briefcase, Users, Heart, ArrowRight, Sparkles, Globe, Lightbulb, Coffee } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const careersData = [
  {
    id: "mindfulness-coach",
    title: "Mindfulness Coach",
    department: "Coaching",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-01",
    summary: "Guide clients through our mindfulness programs and provide personalized support on their journey."
  },
  {
    id: "content-writer",
    title: "Content Writer",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-05",
    summary: "Create engaging and insightful content for our blog, courses, and programs."
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    department: "Product",
    location: "Hybrid (San Francisco)",
    type: "Full-time",
    postedDate: "2025-04-10",
    summary: "Design intuitive and engaging user experiences for our web and mobile applications."
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-15",
    summary: "Build beautiful, responsive, and accessible user interfaces for our platform."
  },
  {
    id: "community-manager",
    title: "Community Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-18",
    summary: "Nurture and grow our community of users, facilitating connections and engagement."
  },
]

interface CareerFilterProps {
  departments: string[];
  locations: string[];
  selectedDepartment: string;
  selectedLocation: string;
  onDepartmentChange: (dept: string) => void;
  onLocationChange: (loc: string) => void;
}

const CareerFilter = ({ 
  departments, locations, 
  selectedDepartment, selectedLocation, 
  onDepartmentChange, onLocationChange 
}: CareerFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
      <div className="flex-1">
        <h3 className="text-sm font-medium mb-2">Department</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={selectedDepartment === "" ? "default" : "outline"} 
            size="sm" 
            onClick={() => onDepartmentChange("")}
            className="rounded-full"
          >
            All
          </Button>
          {departments.map(dept => (
            <Button 
              key={dept} 
              variant={selectedDepartment === dept ? "default" : "outline"} 
              size="sm" 
              onClick={() => onDepartmentChange(dept)}
              className="rounded-full"
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div className="flex-1">
        <h3 className="text-sm font-medium mb-2">Location</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={selectedLocation === "" ? "default" : "outline"} 
            size="sm" 
            onClick={() => onLocationChange("")}
            className="rounded-full"
          >
            All
          </Button>
          {locations.map(loc => (
            <Button 
              key={loc} 
              variant={selectedLocation === loc ? "default" : "outline"} 
              size="sm" 
              onClick={() => onLocationChange(loc)}
              className="rounded-full"
            >
              {loc}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CareerCard = ({ job }: { job: typeof careersData[0] }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{job.type}</span>
      </div>
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <span className="mr-4">{job.department}</span>
        <span>{job.location}</span>
      </div>
      <p className="text-sm mb-5">{job.summary}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Posted on {new Date(job.postedDate).toLocaleDateString()}
        </span>
        <Button asChild>
          <Link to={`/careers/${job.id}`}>
            View Details <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const departments = [...new Set(careersData.map(job => job.department))];
  const locations = [...new Set(careersData.map(job => job.location))];
  
  const filteredJobs = careersData.filter(job => {
    if (selectedDepartment && job.department !== selectedDepartment) {
      return false;
    }
    if (selectedLocation && job.location !== selectedLocation) {
      return false;
    }
    return true;
  });

  return (
    <Layout>
      <Helmet>
        <title>Careers | InnerPath Journey</title>
        <meta name="description" content="Join our team and help people transform their lives through mindfulness and personal growth." />
      </Helmet>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us create transformative experiences that empower people to live with greater purpose, joy, and connection.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative h-80 md:h-96 w-full mb-16 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Our team collaborating" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
              <div className="p-8">
                <p className="text-xl md:text-2xl font-medium text-white">
                  We're on a mission to help people transform their lives through mindfulness and personal growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Why Join InnerPath Journey"
            subtitle="Work with purpose and passion in a supportive, innovative environment"
            centered={true}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meaningful Work</h3>
              <p className="text-muted-foreground">
                Make a positive impact on people's lives through our transformative programs and products.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth Oriented</h3>
              <p className="text-muted-foreground">
                Continuous learning opportunities with mentorship programs and education stipends.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Remote First</h3>
              <p className="text-muted-foreground">
                Work from anywhere with flexible hours and a focus on work-life balance.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusive Culture</h3>
              <p className="text-muted-foreground">
                A diverse and supportive team that values every individual's unique perspective.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Benefits & Perks"
            subtitle="We take care of our team so they can take care of themselves and our users"
            centered={true}
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-muted/20 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-primary" />
                Health & Wellness
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Comprehensive health, dental, and vision insurance</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Mental health benefits and resources</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Monthly wellness stipend for gym memberships, massages, etc.</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Generous paid time off and sick leave</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/20 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Coffee className="h-6 w-6 mr-2 text-primary" />
                Work & Life
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Flexible work hours and remote-first environment</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Home office stipend for comfortable remote work setup</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Professional development budget for courses and conferences</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mr-3 mt-1">•</span>
                  <span>Quarterly team retreats for connection and collaboration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Open Positions"
            subtitle="Find your place on our team and help shape the future of personal growth"
            centered={true}
          />

          <CareerFilter 
            departments={departments}
            locations={locations}
            selectedDepartment={selectedDepartment}
            selectedLocation={selectedLocation}
            onDepartmentChange={setSelectedDepartment}
            onLocationChange={setSelectedLocation}
          />
          
          <div className="space-y-6 mt-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <CareerCard key={job.id} job={job} />
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-medium mt-4">No positions found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or check back later
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedDepartment("");
                    setSelectedLocation("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">Don't see a position that fits your skills?</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about our mission. 
              Send us your resume and tell us how you can contribute.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
