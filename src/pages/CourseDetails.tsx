
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { courses } from "@/data/courses";
import { useAuthStore } from "@/store/authStore";
import { enrollInCourse } from '@/utils/localStorage';
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseFeatures } from "@/components/courses/CourseFeatures";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Star, 
  Users, 
  Calendar, 
  CheckCircle, 
  Play, 
  FileText, 
  Award, 
  Clock 
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const CourseDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState(courses.find(course => course.slug === slug));
  const { hasActiveSubscription } = useAuthStore();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const toggleModule = (moduleIndex: number) => {
    setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex);
  };

  useEffect(() => {
    if (course) {
      // Check if user is enrolled in this course
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      setIsEnrolled(enrolledCourses.some((c: any) => c.id === course.id));
    }
  }, [course]);

  const getTotalDuration = () => {
    if (!course) return "0";
    
    let totalMinutes = 0;
    course.curriculum.forEach(module => {
      module.lessons.forEach(lesson => {
        if (lesson.type !== "pdf" && lesson.type !== "certificate") {
          const [minutes, seconds] = lesson.duration.split(":").map(part => parseInt(part, 10));
          totalMinutes += minutes + (seconds / 60);
        }
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    return `${hours}h ${minutes}m`;
  };

  const handleEnroll = () => {
    if (!course) return;

    if (isEnrolled) {
      // If already enrolled, navigate to learning page
      navigate(`/courses/${course.slug}/learn`);
      return;
    }

    if (hasActiveSubscription) {
      // If user has active subscription, enroll them directly
      enrollInCourse({
        id: course.id,
        title: course.title,
        slug: course.slug,
        price: course.sale ? course.salePrice : course.price,
        image: course.image
      });
      toast.success("Successfully enrolled");
      navigate(`/courses/${course.slug}/learn`);
    } else {
      // Otherwise, go to checkout with course information
      navigate('/checkout', { 
        state: { 
          course: {
            id: course.id,
            title: course.title,
            slug: course.slug,
            price: course.sale ? course.salePrice : course.price,
            image: course.image,
            description: course.description
          } 
        }
      });
    }
  };

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="mb-8">The course you're looking for doesn't exist or has been moved.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{course.title} | InnerPath Journey</title>
        <meta name="description" content={course.description} />
      </Helmet>
      
      <CourseHero 
        course={course} 
        onEnroll={handleEnroll}
        isEnrolled={isEnrolled}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 w-full justify-start border-b rounded-none h-auto p-0">
              <TabsTrigger value="overview" className="rounded-none pb-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Overview
              </TabsTrigger>
              <TabsTrigger value="curriculum" className="rounded-none pb-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="instructor" className="rounded-none pb-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Instructor
              </TabsTrigger>
              <TabsTrigger value="faq" className="rounded-none pb-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                FAQ
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-0 border-0">
              <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: course.fullDescription }} />
              
              <h3 className="text-xl font-semibold mb-6">Requirements</h3>
              <ul className="space-y-2 mb-12">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center mt-12">
                <Button size="lg" onClick={handleEnroll}>
                  Enroll in This Course
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="p-0 border-0">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Course Curriculum</h3>
                <p className="text-muted-foreground mb-4">
                  {course.modules} modules • {course.lessons} lessons • {getTotalDuration()} total length
                </p>
              </div>
              
              <div className="space-y-4">
                {course.curriculum.map((module, moduleIndex) => (
                  <Card key={moduleIndex} className="overflow-hidden">
                    <button 
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/40 transition-colors"
                      onClick={() => toggleModule(moduleIndex)}
                    >
                      <div className="flex items-center">
                        <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                          <span className="text-primary font-medium">{moduleIndex + 1}</span>
                        </div>
                        <h4 className="font-medium text-left">{module.title}</h4>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">
                          {module.lessons.length} lessons
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform ${
                            expandedModule === moduleIndex ? "transform rotate-180" : ""
                          }`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </button>
                    
                    {expandedModule === moduleIndex && (
                      <div className="border-t">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lessonIndex} 
                            className="px-6 py-3 flex items-center justify-between hover:bg-muted/20 transition-colors"
                          >
                            <div className="flex items-center">
                              {lesson.type === "video" && <Play className="h-4 w-4 text-primary mr-3" />}
                              {lesson.type === "exercise" && <FileText className="h-4 w-4 text-primary mr-3" />}
                              {lesson.type === "pdf" && <FileText className="h-4 w-4 text-primary mr-3" />}
                              {lesson.type === "certificate" && <Award className="h-4 w-4 text-primary mr-3" />}
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {lesson.type !== "pdf" && lesson.type !== "certificate" ? lesson.duration : lesson.type === "pdf" ? "PDF" : "Certificate"}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="p-0 border-0">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/4">
                  <Avatar className="h-32 w-32 rounded-xl">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} className="object-cover" />
                    <AvatarFallback className="text-2xl">{course.instructor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                  <p className="text-primary font-medium mb-4">{course.instructor.title}</p>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      <span>{course.instructor.rating} Instructor Rating</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.instructor.students.toLocaleString()} Students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{course.instructor.courses} Courses</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {course.instructor.bio}
                  </p>
                  
                  <Button variant="outline">View Profile</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="p-0 border-0">
              <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                {course.faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                    {index < course.faqs.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-muted/30 p-6 rounded-xl text-center">
                <h4 className="font-medium mb-2">Still have questions?</h4>
                <p className="text-muted-foreground mb-4">
                  Contact us for more information about this course.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-24">
          <SectionHeader 
            title="You Might Also Like" 
            subtitle="Other courses that complement this learning journey"
          />
          
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {courses
              .filter((c) => c.id !== course.id)
              .slice(0, 3)
              .map((relatedCourse) => (
                <Link to={`/courses/${relatedCourse.slug}`} key={relatedCourse.id} className="group">
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={relatedCourse.image} 
                        alt={relatedCourse.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {relatedCourse.sale && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                          Sale
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {relatedCourse.category}
                        </Badge>
                        <div className="flex items-center text-amber-500">
                          <Star className="h-3 w-3 fill-amber-500" />
                          <span className="text-sm ml-1">{relatedCourse.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedCourse.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {relatedCourse.description}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="px-6 py-4 border-t flex items-center justify-between">
                      <div className="font-bold">
                        {relatedCourse.sale ? (
                          <div className="flex items-center gap-2">
                            <span className="text-primary">${relatedCourse.salePrice}</span>
                            <span className="text-muted-foreground line-through text-sm">${relatedCourse.price}</span>
                          </div>
                        ) : (
                          <span>${relatedCourse.price}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {relatedCourse.duration}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;
