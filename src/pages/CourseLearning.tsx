import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Check, ChevronLeft, BookOpen, FileText, PlayCircle, Award, CheckCircle, Clock } from "lucide-react";
import CourseVideoPlayer from "@/components/learning/CourseVideoPlayer";
import CourseNotes from "@/components/learning/CourseNotes";
import CourseQuiz from "@/components/learning/CourseQuiz";
import CourseExercise from "@/components/learning/CourseExercise";

// Course data (mock) - normally this would be fetched from an API
const courses = [
  {
    id: 1,
    slug: "mindful-living-essentials",
    title: "Mindful Living Essentials",
    description: "Learn foundational mindfulness practices to reduce stress and increase presence in your daily life.",
    fullDescription: `
      <p>In today's fast-paced world, finding moments of calm and clarity can feel impossible. <strong>Mindful Living Essentials</strong> offers a comprehensive introduction to mindfulness practices that can transform your relationship with stress, anxiety, and daily challenges.</p>

      <p>This course is designed for beginners with no prior experience in mindfulness or meditation. We'll start with the foundations and gradually build your practice through guided exercises, reflections, and practical applications for everyday situations.</p>

      <h3>What you'll learn:</h3>
      <ul>
        <li>How to establish a sustainable daily mindfulness practice</li>
        <li>Techniques to bring awareness to daily activities</li>
        <li>Methods for managing stress and anxiety through mindful awareness</li>
        <li>Ways to cultivate greater compassion for yourself and others</li>
        <li>Strategies for maintaining presence in challenging situations</li>
      </ul>

      <p>By the end of this course, you'll have a personal mindfulness toolkit that you can apply to any situation, helping you respond rather than react to life's challenges.</p>
    `,
    level: "Beginner",
    duration: "4 weeks",
    modules: 8,
    lessons: 32,
    students: 2438,
    language: "English",
    lastUpdated: "March 2025",
    rating: 4.8,
    reviews: 387,
    certification: true,
    requirements: [
      "No prior experience with mindfulness or meditation required",
      "An open mind and willingness to practice regularly",
      "15-20 minutes daily for practice exercises"
    ],
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Mindfulness Coach & Clinical Psychologist",
      bio: "Dr. Sarah Johnson has over 15 years of experience teaching mindfulness in clinical and corporate settings. With a Ph.D. in Clinical Psychology and certification in Mindfulness-Based Stress Reduction (MBSR), she combines scientific research with practical applications to make mindfulness accessible to everyone.",
      courses: 5,
      students: 12450,
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    price: 129,
    sale: true,
    salePrice: 79,
    featured: true,
    popular: true,
    category: "Mindfulness",
    badges: ["Bestseller", "Highly Rated"],
    curriculum: [
      {
        title: "Foundation of Mindfulness",
        lessons: [
          { title: "What is Mindfulness?", type: "video", duration: "15:24" },
          { title: "The Science Behind Mindfulness", type: "video", duration: "18:36" },
          { title: "Setting Up Your Practice", type: "video", duration: "12:45" },
          { title: "Guided Meditation: First Steps", type: "exercise", duration: "10:00" }
        ]
      },
      {
        title: "Mindful Awareness in Daily Life",
        lessons: [
          { title: "Mindful Eating Practice", type: "video", duration: "14:52" },
          { title: "Mindful Movement Basics", type: "video", duration: "20:18" },
          { title: "Bringing Awareness to Routine Activities", type: "exercise", duration: "08:40" },
          { title: "Reflection Exercise", type: "pdf", duration: "N/A" }
        ]
      },
      {
        title: "Working with Difficult Emotions",
        lessons: [
          { title: "Understanding Emotional Reactions", type: "video", duration: "16:29" },
          { title: "The RAIN Technique for Emotions", type: "video", duration: "22:10" },
          { title: "Guided Practice: Working with Anxiety", type: "exercise", duration: "15:00" },
          { title: "Journaling Exercise", type: "pdf", duration: "N/A" }
        ]
      },
      {
        title: "Mindfulness in Relationships",
        lessons: [
          { title: "Mindful Listening", type: "video", duration: "19:45" },
          { title: "Compassion and Loving-Kindness Practices", type: "video", duration: "21:36" },
          { title: "Navigating Difficult Conversations", type: "video", duration: "17:28" },
          { title: "Partner Practice Exercise", type: "exercise", duration: "25:00" }
        ]
      },
      {
        title: "Stress Reduction Techniques",
        lessons: [
          { title: "Understanding Your Stress Response", type: "video", duration: "14:55" },
          { title: "Body Scan Meditation", type: "exercise", duration: "18:20" },
          { title: "Mindful Approaches to Overwhelm", type: "video", duration: "16:42" },
          { title: "Progressive Relaxation Guide", type: "pdf", duration: "N/A" }
        ]
      },
      {
        title: "Cultivating Gratitude and Joy",
        lessons: [
          { title: "The Science of Gratitude", type: "video", duration: "13:18" },
          { title: "Gratitude Meditation Practice", type: "exercise", duration: "10:15" },
          { title: "Finding Joy in Simple Moments", type: "video", duration: "15:36" },
          { title: "Weekly Gratitude Journal Template", type: "pdf", duration: "N/A" }
        ]
      },
      {
        title: "Mindfulness for Better Sleep",
        lessons: [
          { title: "Understanding Sleep Challenges", type: "video", duration: "16:22" },
          { title: "Evening Wind-Down Routine", type: "video", duration: "12:47" },
          { title: "Bedtime Meditation Practice", type: "exercise", duration: "15:30" },
          { title: "Sleep Journal Template", type: "pdf", duration: "N/A" }
        ]
      },
      {
        title: "Sustaining Your Practice",
        lessons: [
          { title: "Creating a Sustainable Routine", type: "video", duration: "18:25" },
          { title: "Overcoming Common Obstacles", type: "video", duration: "20:14" },
          { title: "Advanced Practices to Explore", type: "video", duration: "23:18" },
          { title: "Final Reflection and Next Steps", type: "exercise", duration: "10:00" },
          { title: "Course Completion Certification", type: "certificate", duration: "N/A" }
        ]
      }
    ],
    faqs: [
      {
        question: "Do I need any special equipment for this course?",
        answer: "No special equipment is needed. We recommend having a comfortable place to sit and optionally a journal for reflections. The course can be completed from any device."
      },
      {
        question: "How much time should I dedicate to this course each week?",
        answer: "We recommend setting aside about 2-3 hours per week: 1 hour for viewing course materials and 15-20 minutes daily for practice exercises."
      },
      {
        question: "I've never meditated before. Is this course suitable for me?",
        answer: "Absolutely! This course is specifically designed for beginners with no prior experience. We start with the basics and gradually build your practice."
      },
      {
        question: "Will I receive a certificate upon completion?",
        answer: "Yes, you'll receive a certificate of completion once you finish all course modules and exercises."
      },
      {
        question: "How long will I have access to the course materials?",
        answer: "You'll have lifetime access to all course materials, including any future updates we make to the content."
      },
      {
        question: "Is there any support available if I have questions?",
        answer: "Yes, you can ask questions in the course discussion area where both the instructor and fellow students can provide guidance."
      }
    ],
    relatedCourses: [2, 5, 7]
  },
  // ... more courses here (refer to previous file for the data)
];

const CourseLearning = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any | null>(null);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [contentType, setContentType] = useState("video");
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [enrolledStatus, setEnrolledStatus] = useState(true);

  useEffect(() => {
    // Check if the user is enrolled - via location state OR localStorage
    if (location.state?.enrolled) {
      setEnrolledStatus(true);
    } else {
      // Check localStorage for enrollment status
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      const isEnrolled = enrolledCourses.some((c: any) => c.slug === slug);
      setEnrolledStatus(isEnrolled);
    }

    // Load course data
    const courseData = courses.find(c => c.slug === slug);
    if (courseData) {
      setCourse(courseData);
      
      // Calculate initial progress (would come from the backend in a real app)
      const storedProgress = localStorage.getItem(`course-progress-${slug}`);
      if (storedProgress) {
        const parsedProgress = JSON.parse(storedProgress);
        setProgress(parsedProgress.progress || 0);
        setCompletedLessons(parsedProgress.completedLessons || []);
      } else {
        setProgress(0);
      }
    } else {
      navigate('/courses');
      toast.error("Course not found");
    }
  }, [slug, location.state, navigate]);

  useEffect(() => {
    // Update progress whenever completedLessons changes
    if (course) {
      const totalLessons = course.curriculum.reduce((total: number, module: any) => total + module.lessons.length, 0);
      const newProgress = (completedLessons.length / totalLessons) * 100;
      setProgress(newProgress);
      
      // Save progress to localStorage
      localStorage.setItem(`course-progress-${slug}`, JSON.stringify({
        progress: newProgress,
        completedLessons
      }));
    }
  }, [completedLessons, course, slug]);

  const handleLessonComplete = () => {
    const currentLesson = course.curriculum[activeModule].lessons[activeLesson];
    const lessonId = `${activeModule}-${activeLesson}`;
    
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      toast.success("Lesson completed!");
    }
    
    // Move to the next lesson if available
    const nextLesson = activeLesson + 1;
    if (nextLesson < course.curriculum[activeModule].lessons.length) {
      setActiveLesson(nextLesson);
    } else {
      const nextModule = activeModule + 1;
      if (nextModule < course.curriculum.length) {
        setActiveModule(nextModule);
        setActiveLesson(0);
        toast.success("Module completed! Moving to the next one.");
      } else {
        toast.success("Congratulations! You've completed the course!");
      }
    }
  };

  const handleSelectLesson = (moduleIndex: number, lessonIndex: number) => {
    setActiveModule(moduleIndex);
    setActiveLesson(lessonIndex);
    
    // Set content type based on the lesson type
    if (course?.curriculum[moduleIndex]?.lessons[lessonIndex]) {
      const lessonType = course.curriculum[moduleIndex].lessons[lessonIndex].type;
      
      switch (lessonType) {
        case "video":
          setContentType("video");
          break;
        case "exercise":
          setContentType("exercise");
          break;
        case "pdf":
          setContentType("notes");
          break;
        case "certificate":
          setContentType("certificate");
          break;
        default:
          setContentType("video");
      }
    }
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading course content...</h2>
          <p className="text-muted-foreground">Please wait while we load your course materials.</p>
        </div>
      </div>
    );
  }

  // If not enrolled, redirect to course details page
  if (!enrolledStatus) {
    useEffect(() => {
      navigate(`/courses/${slug}`);
      toast.error("You need to enroll in this course first");
    }, [navigate, slug]);
    
    return null;
  }

  const currentLesson = course.curriculum[activeModule].lessons[activeLesson];

  return (
    <>
      <Helmet>
        <title>{course.title} | Learning Platform</title>
      </Helmet>
      
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="border-b bg-background z-10">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/courses">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="font-semibold">{course.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Your progress</span>
                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-r bg-muted/30 overflow-auto">
            <div className="p-4">
              <h2 className="font-semibold mb-2">Course Content</h2>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.modules} modules • {course.lessons} lessons</span>
              </div>
              
              <Accordion type="multiple" className="w-full" defaultValue={[`module-${activeModule}`]}>
                {course.curriculum.map((module: any, moduleIndex: number) => (
                  <AccordionItem value={`module-${moduleIndex}`} key={moduleIndex}>
                    <AccordionTrigger className="text-sm py-3">
                      <div className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs text-primary font-medium">{moduleIndex + 1}</span>
                        </span>
                        <span className="text-left font-medium">{module.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1">
                        {module.lessons.map((lesson: any, lessonIndex: number) => {
                          const isActive = moduleIndex === activeModule && lessonIndex === activeLesson;
                          const isCompleted = completedLessons.includes(`${moduleIndex}-${lessonIndex}`);
                          
                          return (
                            <li key={lessonIndex}>
                              <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={`w-full justify-start h-auto py-2 px-8 text-left ${isCompleted ? "text-muted-foreground" : ""}`}
                                onClick={() => handleSelectLesson(moduleIndex, lessonIndex)}
                              >
                                <div className="flex items-center w-full">
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full mr-2 flex items-center justify-center">
                                    {isCompleted ? (
                                      <CheckCircle className="h-4 w-4 text-primary" />
                                    ) : (
                                      <>
                                        {lesson.type === "video" && <PlayCircle className="h-4 w-4" />}
                                        {lesson.type === "exercise" && <FileText className="h-4 w-4" />}
                                        {lesson.type === "pdf" && <BookOpen className="h-4 w-4" />}
                                        {lesson.type === "certificate" && <Award className="h-4 w-4" />}
                                      </>
                                    )}
                                  </span>
                                  <span className="text-sm truncate">{lesson.title}</span>
                                  {isActive && <Badge className="ml-auto">Current</Badge>}
                                </div>
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 overflow-auto">
            <div className="p-4 md:p-8">
              <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold mb-1">{currentLesson.title}</h1>
                  <div className="text-sm text-muted-foreground">
                    {course.curriculum[activeModule].title} • {currentLesson.type !== "pdf" && currentLesson.type !== "certificate" ? `${currentLesson.duration} minutes` : "Resource"}
                  </div>
                </div>
                
                <Tabs value={contentType} onValueChange={setContentType} className="mb-8">
                  <TabsList>
                    {currentLesson.type === "video" && <TabsTrigger value="video">Video</TabsTrigger>}
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    {currentLesson.type === "exercise" && <TabsTrigger value="exercise">Exercise</TabsTrigger>}
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="video" className="mt-6">
                    <CourseVideoPlayer 
                      lessonTitle={currentLesson.title}
                      onComplete={handleLessonComplete}
                    />
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-6">
                    <CourseNotes 
                      lessonId={`${activeModule}-${activeLesson}`}
                      moduleTitle={course.curriculum[activeModule].title}
                      lessonTitle={currentLesson.title}
                    />
                  </TabsContent>
                  
                  <TabsContent value="exercise" className="mt-6">
                    <CourseExercise 
                      lessonId={`${activeModule}-${activeLesson}`}
                      moduleTitle={course.curriculum[activeModule].title}
                      lessonTitle={currentLesson.title}
                      onComplete={handleLessonComplete}
                    />
                  </TabsContent>
                  
                  <TabsContent value="discussion" className="mt-6">
                    <div className="bg-muted/30 p-8 text-center rounded-md">
                      <h3 className="font-medium text-lg mb-2">Discussion coming soon</h3>
                      <p className="text-muted-foreground">
                        We're working on adding a discussion forum for this lesson.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-between mt-12 border-t pt-6">
                  <Button variant="outline" disabled={activeLesson === 0 && activeModule === 0}
                    onClick={() => {
                      if (activeLesson > 0) {
                        handleSelectLesson(activeModule, activeLesson - 1);
                      } else if (activeModule > 0) {
                        const prevModuleIndex = activeModule - 1;
                        const prevModule = course.curriculum[prevModuleIndex];
                        handleSelectLesson(prevModuleIndex, prevModule.lessons.length - 1);
                      }
                    }}
                  >
                    Previous Lesson
                  </Button>
                  
                  <Button 
                    onClick={handleLessonComplete}
                    disabled={completedLessons.includes(`${activeModule}-${activeLesson}`)}
                  >
                    {completedLessons.includes(`${activeModule}-${activeLesson}`) ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Completed
                      </>
                    ) : "Mark as Complete"}
                  </Button>
                  
                  <Button
                    disabled={
                      activeModule === course.curriculum.length - 1 && 
                      activeLesson === course.curriculum[course.curriculum.length - 1].lessons.length - 1
                    }
                    onClick={() => {
                      if (activeLesson < course.curriculum[activeModule].lessons.length - 1) {
                        handleSelectLesson(activeModule, activeLesson + 1);
                      } else if (activeModule < course.curriculum.length - 1) {
                        handleSelectLesson(activeModule + 1, 0);
                      }
                    }}
                  >
                    Next Lesson
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseLearning;
