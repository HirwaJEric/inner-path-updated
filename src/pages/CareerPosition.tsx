
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, MapPin, Clock, Building, Calendar, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Mock job data - in a real app this would come from an API
const jobsData = {
  "mindfulness-coach": {
    title: "Mindfulness Coach",
    department: "Coaching",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-01",
    salary: "$65,000 - $85,000",
    description: "We are looking for a compassionate and experienced Mindfulness Coach to join our team. In this role, you will guide clients through our mindfulness programs, provide personalized support, and help them develop sustainable practices for wellbeing.",
    responsibilities: [
      "Guide clients through structured mindfulness programs via one-on-one and group sessions",
      "Develop personalized mindfulness practice plans tailored to individual needs",
      "Track client progress and adjust approaches based on feedback and outcomes",
      "Collaborate with our content team to develop mindfulness exercises and educational materials",
      "Stay updated on the latest research and techniques in mindfulness and meditation",
      "Participate in team meetings and contribute to the evolution of our programs"
    ],
    requirements: [
      "Certification in mindfulness teaching, meditation instruction, or related field",
      "3+ years of experience teaching mindfulness practices in individual or group settings",
      "Excellent communication and interpersonal skills",
      "Experience with online coaching and virtual instruction methods",
      "Personal mindfulness practice and commitment to ongoing learning",
      "Ability to create safe, inclusive spaces for diverse participants"
    ],
    preferred: [
      "Background in psychology, counseling, or related behavioral health field",
      "Experience with trauma-sensitive mindfulness approaches",
      "Knowledge of various contemplative traditions and practices",
      "Experience with program development and curriculum design",
      "Familiarity with digital coaching platforms and tools"
    ]
  },
  "content-writer": {
    title: "Content Writer",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-05",
    salary: "$60,000 - $75,000",
    description: "We're seeking a talented Content Writer to create engaging, informative, and inspiring content for our blog, courses, and programs. You'll be instrumental in communicating our approach to personal growth and mindfulness in ways that resonate with our audience.",
    responsibilities: [
      "Create high-quality written content for our blog, newsletters, and social media channels",
      "Develop educational materials for our online courses and programs",
      "Collaborate with subject matter experts to ensure content accuracy and depth",
      "Edit and proofread content from other team members",
      "Research and stay updated on topics related to mindfulness, well-being, and personal development",
      "Optimize content for SEO and audience engagement"
    ],
    requirements: [
      "Bachelor's degree in English, Communications, Journalism, or related field",
      "3+ years of professional writing experience, preferably in wellness, personal development, or related fields",
      "Excellent writing, editing, and proofreading skills",
      "Ability to adapt writing style for different formats and audiences",
      "Basic understanding of SEO principles",
      "Strong research skills and attention to detail"
    ],
    preferred: [
      "Personal interest or experience with mindfulness practices",
      "Knowledge of psychology, neuroscience, or contemplative traditions",
      "Experience with educational content writing",
      "Familiarity with content management systems",
      "Portfolio demonstrating versatility in writing styles"
    ]
  },
  "ux-designer": {
    title: "UX Designer",
    department: "Product",
    location: "Hybrid (San Francisco)",
    type: "Full-time",
    postedDate: "2025-04-10",
    salary: "$90,000 - $120,000",
    description: "We are looking for a skilled UX Designer to create intuitive and engaging user experiences for our web and mobile applications. You'll work closely with our product and engineering teams to design interfaces that support our users' personal growth journeys.",
    responsibilities: [
      "Design user-centered interfaces for our web and mobile applications",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing to inform design decisions",
      "Develop and maintain our design system and component library",
      "Collaborate with engineers to ensure proper implementation of designs",
      "Work with product managers to understand requirements and translate them into effective designs"
    ],
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "4+ years of experience in UX/UI design for digital products",
      "Proficiency with design tools such as Figma, Sketch, or Adobe XD",
      "Experience with responsive design and mobile-first approaches",
      "Understanding of accessibility standards and inclusive design principles",
      "Strong portfolio demonstrating user-centered design process"
    ],
    preferred: [
      "Experience designing for wellness, health, or educational applications",
      "Knowledge of design psychology and behavioral design principles",
      "Familiarity with front-end technologies (HTML, CSS, JavaScript)",
      "Experience with animation and micro-interactions",
      "Background in or passion for mindfulness and personal growth"
    ]
  },
  "frontend-developer": {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-15",
    salary: "$85,000 - $115,000",
    description: "We're looking for a talented Frontend Developer to build beautiful, responsive, and accessible user interfaces for our platform. You'll work with our design and engineering teams to create seamless experiences that help our users engage with our mindfulness and personal growth content.",
    responsibilities: [
      "Implement responsive and accessible user interfaces using React and TypeScript",
      "Collaborate with designers to bring mockups to life with attention to detail",
      "Write clean, maintainable code and participate in code reviews",
      "Optimize applications for performance and cross-browser compatibility",
      "Work with our backend team to integrate APIs and services",
      "Contribute to our component library and frontend architecture"
    ],
    requirements: [
      "3+ years of experience in frontend development",
      "Strong proficiency with React, TypeScript, and modern CSS",
      "Experience with responsive design and accessibility practices",
      "Understanding of state management patterns and solutions",
      "Familiarity with version control systems (Git) and CI/CD workflows",
      "Good problem-solving skills and attention to detail"
    ],
    preferred: [
      "Experience with Next.js or similar React frameworks",
      "Knowledge of testing frameworks like Jest and React Testing Library",
      "Experience with animation libraries (Framer Motion, GSAP)",
      "Understanding of performance optimization techniques",
      "Interest in wellness, mindfulness, or personal development"
    ]
  },
  "community-manager": {
    title: "Community Manager",
    department: "Community",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-04-18",
    salary: "$60,000 - $80,000",
    description: "We are seeking a passionate Community Manager to nurture and grow our community of users, facilitating connections, engagement, and shared learning. You'll be responsible for fostering a supportive environment where members can share their growth journeys and support each other.",
    responsibilities: [
      "Develop and implement community engagement strategies across various platforms",
      "Moderate community discussions and ensure a safe, inclusive environment",
      "Create and manage community content calendars and events",
      "Respond to community questions and provide support",
      "Collect and analyze community feedback to inform product improvements",
      "Collaborate with marketing, product, and content teams to align community initiatives"
    ],
    requirements: [
      "3+ years of experience in community management or related role",
      "Excellent written and verbal communication skills",
      "Experience moderating online communities and fostering positive interactions",
      "Ability to empathize with users and understand their needs",
      "Organizational skills and ability to manage multiple priorities",
      "Familiarity with community management tools and platforms"
    ],
    preferred: [
      "Experience with wellness, personal growth, or educational communities",
      "Knowledge of event planning and facilitation (virtual and in-person)",
      "Background in customer success or support",
      "Understanding of analytics and data-driven community building",
      "Personal interest in mindfulness and holistic well-being"
    ]
  }
};

const CareerPosition = () => {
  const { id } = useParams<{ id: string }>();
  
  // Try to get the job data, if it doesn't exist, we'll show a not found message
  const job = id ? jobsData[id as keyof typeof jobsData] : undefined;
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job?.title} at InnerPath Journey`,
        text: `Check out this job opportunity: ${job?.title} at InnerPath Journey`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this job posting",
      });
    }
  };

  if (!job) {
    return (
      <Layout>
        <Helmet>
          <title>Position Not Found | InnerPath Journey</title>
        </Helmet>
        <div className="py-32 px-6 md:px-12 text-center">
          <h1 className="text-3xl font-bold mb-6">Position Not Found</h1>
          <p className="mb-8">The job position you're looking for doesn't exist or has been filled.</p>
          <Button asChild>
            <Link to="/careers">View All Positions</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{job.title} | Careers | InnerPath Journey</title>
        <meta name="description" content={`Apply for the ${job.title} position at InnerPath Journey and join our mission to transform lives.`} />
      </Helmet>

      <div className="py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/careers" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to all positions
            </Link>

            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" asChild>
                <Link to={`/careers/apply/${id}`}>
                  Apply Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" onClick={handleShareClick}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="bg-muted/20 text-lg font-medium p-4 rounded-lg">
              Salary range: {job.salary}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Position Overview</h2>
              <p className="text-lg">{job.description}</p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
              <ul className="space-y-3 list-disc pl-5">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-3 list-disc pl-5">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Nice to Have</h2>
              <ul className="space-y-3 list-disc pl-5">
                {job.preferred.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">About InnerPath Journey</h2>
              <p className="mb-4">
                InnerPath Journey is dedicated to helping people transform their lives through mindfulness and personal growth. 
                Our platform offers courses, coaching, and community support for individuals seeking greater purpose, joy, and connection.
              </p>
              <p>
                We are committed to creating a diverse, equitable, and inclusive workplace. We encourage applications from all qualified individuals, 
                regardless of race, color, religion, gender, sexual orientation, gender identity or expression, age, national origin, disability status, 
                or any other characteristic protected by law.
              </p>
            </section>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Ready to Apply?</h2>
              <p className="mb-6">We'd love to hear from you! Click the button below to start your application process.</p>
              <Button size="lg" asChild>
                <Link to={`/careers/apply/${id}`}>
                  Apply for this Position
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareerPosition;
