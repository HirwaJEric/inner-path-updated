import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Calendar, ShoppingBag, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Import the quiz data - this would typically come from an API
// We're adding this here to resolve the TS2304 error
const quizData = {
  "self-mastery": {
    title: "Master Your Habits",
    description: "Assess your self-discipline, routines, and habits",
    questions: [
      {
        id: "q1",
        text: "How often do you struggle to stick to a new habit?",
        options: [
          { id: "q1-a", text: "Almost never - I can maintain new habits easily", value: 1 },
          { id: "q1-b", text: "Occasionally - Some habits stick, others don't", value: 2 },
          { id: "q1-c", text: "Often - I regularly start strong but lose momentum", value: 3 },
          { id: "q1-d", text: "Almost always - I find it very difficult to maintain new habits", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How would you rate your current morning routine?",
        options: [
          { id: "q2-a", text: "Excellent - Consistent, energizing and sets me up for success", value: 1 },
          { id: "q2-b", text: "Good - Mostly consistent but could be improved", value: 2 },
          { id: "q2-c", text: "Fair - Inconsistent but I have some good elements", value: 3 },
          { id: "q2-d", text: "Poor - Chaotic or non-existent", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "When you set goals, how often do you achieve them?",
        options: [
          { id: "q3-a", text: "Almost always - I consistently achieve what I set out to do", value: 1 },
          { id: "q3-b", text: "Usually - I achieve most goals with some exceptions", value: 2 },
          { id: "q3-c", text: "Sometimes - I achieve about half of my goals", value: 3 },
          { id: "q3-d", text: "Rarely - I struggle to follow through on most goals", value: 4 }
        ]
      },
      {
        id: "q4",
        text: "How do you typically respond to setbacks in your routine?",
        options: [
          { id: "q4-a", text: "I quickly adjust and get back on track", value: 1 },
          { id: "q4-b", text: "I feel discouraged but eventually resume", value: 2 },
          { id: "q4-c", text: "I often abandon the routine and try something new", value: 3 },
          { id: "q4-d", text: "I give up and feel like I've failed", value: 4 }
        ]
      },
      {
        id: "q5",
        text: "How easy is it for you to avoid distractions when working on important tasks?",
        options: [
          { id: "q5-a", text: "Very easy - I can focus deeply for extended periods", value: 1 },
          { id: "q5-b", text: "Somewhat easy - I can focus but need occasional breaks", value: 2 },
          { id: "q5-c", text: "Somewhat difficult - I get distracted fairly often", value: 3 },
          { id: "q5-d", text: "Very difficult - I'm constantly fighting distractions", value: 4 }
        ]
      },
      {
        id: "q6",
        text: "How often do you procrastinate on important tasks?",
        options: [
          { id: "q6-a", text: "Rarely - I usually start tasks promptly", value: 1 },
          { id: "q6-b", text: "Sometimes - I procrastinate on certain types of tasks", value: 2 },
          { id: "q6-c", text: "Often - I frequently delay starting important work", value: 3 },
          { id: "q6-d", text: "Very often - Procrastination is a significant issue for me", value: 4 }
        ]
      },
      {
        id: "q7",
        text: "How effectively do you manage your time?",
        options: [
          { id: "q7-a", text: "Very effectively - I consistently prioritize well", value: 1 },
          { id: "q7-b", text: "Somewhat effectively - I'm usually on top of things", value: 2 },
          { id: "q7-c", text: "Not very effectively - I often feel rushed or behind", value: 3 },
          { id: "q7-d", text: "Poorly - I feel constantly overwhelmed by time pressure", value: 4 }
        ]
      },
      {
        id: "q8",
        text: "How consistent are you with your sleep schedule?",
        options: [
          { id: "q8-a", text: "Very consistent - I go to bed and wake up at similar times daily", value: 1 },
          { id: "q8-b", text: "Mostly consistent - With some variation on weekends", value: 2 },
          { id: "q8-c", text: "Somewhat inconsistent - My schedule varies frequently", value: 3 },
          { id: "q8-d", text: "Very inconsistent - I have no regular sleep pattern", value: 4 }
        ]
      },
      {
        id: "q9",
        text: "How often do you engage in deliberate self-improvement activities?",
        options: [
          { id: "q9-a", text: "Daily - I consistently make time for personal growth", value: 1 },
          { id: "q9-b", text: "Weekly - I regularly set aside time for development", value: 2 },
          { id: "q9-c", text: "Monthly - I occasionally focus on self-improvement", value: 3 },
          { id: "q9-d", text: "Rarely - I seldom engage in deliberate self-improvement", value: 4 }
        ]
      },
      {
        id: "q10",
        text: "How would you rate your ability to say 'no' to things that don't align with your priorities?",
        options: [
          { id: "q10-a", text: "Excellent - I confidently protect my priorities", value: 1 },
          { id: "q10-b", text: "Good - I usually set boundaries but sometimes give in", value: 2 },
          { id: "q10-c", text: "Fair - I often find it difficult to decline requests", value: 3 },
          { id: "q10-d", text: "Poor - I regularly overcommit and struggle with boundaries", value: 4 }
        ]
      }
    ]
  },
  "addictions": {
    title: "Break Free From Addictions",
    description: "Assess your relationship with habits and dependencies",
    questions: [
      {
        id: "q1",
        text: "How often do you find yourself using social media when you intended not to?",
        options: [
          { id: "q1-a", text: "Rarely or never", value: 1 },
          { id: "q1-b", text: "Sometimes (1-2 times per week)", value: 2 },
          { id: "q1-c", text: "Often (several times per week)", value: 3 },
          { id: "q1-d", text: "Very frequently (daily)", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "When you try to cut back on a habit you're concerned about, how difficult is it?",
        options: [
          { id: "q2-a", text: "Not difficult at all", value: 1 },
          { id: "q2-b", text: "Slightly difficult, but manageable", value: 2 },
          { id: "q2-c", text: "Moderately difficult, requiring significant effort", value: 3 },
          { id: "q2-d", text: "Extremely difficult or seemingly impossible", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How has your behavior affected your relationships with others?",
        options: [
          { id: "q3-a", text: "Not at all - my relationships are healthy", value: 1 },
          { id: "q3-b", text: "Minimally - occasional tension but generally fine", value: 2 },
          { id: "q3-c", text: "Moderately - recurring conflicts or distance", value: 3 },
          { id: "q3-d", text: "Significantly - serious relationship damage", value: 4 }
        ]
      }
    ]
  },
  "purpose": {
    title: "Find Your Purpose",
    description: "Explore your life direction and meaning",
    questions: [
      {
        id: "q1",
        text: "How clear are you about your purpose in life?",
        options: [
          { id: "q1-a", text: "Very clear - I know exactly what gives my life meaning", value: 1 },
          { id: "q1-b", text: "Somewhat clear - I have some ideas but not complete clarity", value: 2 },
          { id: "q1-c", text: "Somewhat unclear - I'm exploring but still confused", value: 3 },
          { id: "q1-d", text: "Very unclear - I feel lost about my purpose", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How satisfied are you with your current career path?",
        options: [
          { id: "q2-a", text: "Very satisfied - My work aligns with my values and strengths", value: 1 },
          { id: "q2-b", text: "Somewhat satisfied - It's good but could be better", value: 2 },
          { id: "q2-c", text: "Somewhat dissatisfied - I often feel unfulfilled", value: 3 },
          { id: "q2-d", text: "Very dissatisfied - My work feels meaningless or draining", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How often do you feel that what you do day-to-day matters in the bigger picture?",
        options: [
          { id: "q3-a", text: "Almost always - I regularly see the impact of my actions", value: 1 },
          { id: "q3-b", text: "Often - I frequently feel my contributions matter", value: 2 },
          { id: "q3-c", text: "Sometimes - I occasionally feel my actions have meaning", value: 3 },
          { id: "q3-d", text: "Rarely - I seldom feel what I do matters", value: 4 }
        ]
      }
    ]
  },
  "trauma": {
    title: "Heal Your Past",
    description: "Process and integrate past experiences",
    questions: [
      {
        id: "q1",
        text: "How often do difficult past experiences intrude on your present thoughts?",
        options: [
          { id: "q1-a", text: "Rarely or never - Past experiences don't trouble me", value: 1 },
          { id: "q1-b", text: "Occasionally - They come up but don't disrupt my life", value: 2 },
          { id: "q1-c", text: "Frequently - They regularly affect my thoughts", value: 3 },
          { id: "q1-d", text: "Constantly - They dominate my thinking", value: 4 }
        ]
      },
      {
        id: "q2",
        text: "How comfortable are you discussing difficult past experiences?",
        options: [
          { id: "q2-a", text: "Very comfortable - I can talk about them with ease", value: 1 },
          { id: "q2-b", text: "Somewhat comfortable - I can discuss them with trusted people", value: 2 },
          { id: "q2-c", text: "Somewhat uncomfortable - I avoid these topics when possible", value: 3 },
          { id: "q2-d", text: "Very uncomfortable - I actively avoid discussing my past", value: 4 }
        ]
      },
      {
        id: "q3",
        text: "How much do past experiences affect your current relationships?",
        options: [
          { id: "q3-a", text: "Not at all - My relationships are not affected", value: 1 },
          { id: "q3-b", text: "Slightly - Occasional impact but generally manageable", value: 2 },
          { id: "q3-c", text: "Moderately - Regular impact on how I relate to others", value: 3 },
          { id: "q3-d", text: "Significantly - Major impact on my ability to connect", value: 4 }
        ]
      }
    ]
  },
  "general": {
    title: "General Assessment",
    description: "Find your focus area for personal growth",
    questions: [
      {
        id: "q1",
        text: "Which area of your life would you most like to improve?",
        options: [
          { id: "q1-a", text: "Habits and routines", value: "self-mastery" },
          { id: "q1-b", text: "Breaking unwanted habits or dependencies", value: "addictions" },
          { id: "q1-c", text: "Finding meaning and direction", value: "purpose" },
          { id: "q1-d", text: "Processing difficult past experiences", value: "trauma" }
        ]
      },
      {
        id: "q2",
        text: "What do you find most challenging in your daily life?",
        options: [
          { id: "q2-a", text: "Maintaining discipline and consistency", value: "self-mastery" },
          { id: "q2-b", text: "Resisting urges or compulsions", value: "addictions" },
          { id: "q2-c", text: "Feeling fulfilled and purposeful", value: "purpose" },
          { id: "q2-d", text: "Managing emotional reactions to triggers", value: "trauma" }
        ]
      },
      {
        id: "q3",
        text: "What would make the biggest positive difference in your life right now?",
        options: [
          { id: "q3-a", text: "Better time management and habits", value: "self-mastery" },
          { id: "q3-b", text: "Freedom from a dependency or addiction", value: "addictions" },
          { id: "q3-c", text: "Clearer direction and meaning", value: "purpose" },
          { id: "q3-d", text: "Healing from past wounds", value: "trauma" }
        ]
      }
    ]
  }
};

// Mock recommendation data - would come from analysis of quiz answers
const recommendations = {
  "self-mastery": {
    summary: "You're ready to build self-discipline with daily habits!",
    description: "Our assessment shows you have a solid foundation, but could benefit from structured routines and accountability to reach your full potential.",
    compatibilityScore: 87,
    courses: [
      {
        id: "self-discipline-blueprint",
        title: "Self-Discipline Blueprint",
        description: "Master the psychology of habit formation and willpower with our comprehensive 8-week course.",
        price: 99,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "morning-mastery",
        title: "Morning Mastery",
        description: "Transform your mornings to unlock productivity, clarity and purpose throughout your day.",
        price: 79,
        image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ],
    streaks: [
      {
        id: "30-day-focus",
        title: "30-Day Focus Streak",
        description: "Daily micro-habits to sharpen your attention span and productivity.",
        members: 1243,
        difficulty: "Moderate",
        duration: "4 weeks"
      },
      {
        id: "mindful-mornings",
        title: "Mindful Mornings",
        description: "Start each day with intention through guided mindfulness practices.",
        members: 876,
        difficulty: "Easy",
        duration: "Ongoing"
      },
      {
        id: "evening-reflection",
        title: "Evening Reflection",
        description: "End each day with structured reflection to accelerate your growth.",
        members: 652,
        difficulty: "Easy",
        duration: "Ongoing"
      }
    ],
    products: [
      {
        id: "habit-journal",
        title: "InnerPath Habit Journal",
        description: "Track your habits, reflect on your progress, and stay accountable.",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1598439210625-2325f3111596?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  "addictions": {
    summary: "You're ready to break free from dependencies that are holding you back.",
    description: "Our assessment indicates you have the awareness needed for change, but could benefit from proven frameworks and support systems.",
    compatibilityScore: 82,
    courses: [
      {
        id: "digital-detox",
        title: "Digital Detox Protocol",
        description: "Regain control over your relationship with technology and reclaim your focus.",
        price: 89,
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ],
    streaks: [
      {
        id: "mindful-tech",
        title: "Mindful Tech Use",
        description: "Daily practices to build a healthier relationship with technology.",
        members: 932,
        difficulty: "Moderate",
        duration: "6 weeks"
      },
      {
        id: "habit-replacement",
        title: "Habit Replacement",
        description: "Systematically replace unwanted habits with positive alternatives.",
        members: 745,
        difficulty: "Challenging",
        duration: "8 weeks"
      }
    ],
    products: [
      {
        id: "focus-timer",
        title: "Focus Timer & Journal",
        description: "Track your progress and build accountability as you break unwanted habits.",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  "purpose": {
    summary: "You're ready to clarify your purpose and find more meaningful direction.",
    description: "Our assessment shows you're asking the right questions and are prepared to explore deeper meaning in your life and work.",
    compatibilityScore: 91,
    courses: [
      {
        id: "purpose-finder",
        title: "Purpose Finder",
        description: "A structured 10-week journey to uncover your unique gifts, values, and mission.",
        price: 129,
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ],
    streaks: [
      {
        id: "values-clarity",
        title: "Values Clarity",
        description: "Daily reflection practices to identify and align with your core values.",
        members: 1105,
        difficulty: "Moderate",
        duration: "4 weeks"
      },
      {
        id: "meaningful-work",
        title: "Meaningful Work",
        description: "Find purpose in your daily tasks through targeted mindset shifts.",
        members: 872,
        difficulty: "Moderate",
        duration: "Ongoing"
      }
    ],
    products: [
      {
        id: "purpose-journal",
        title: "Purpose Journal & Workbook",
        description: "Guided exercises to help you uncover and live your purpose daily.",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  "trauma": {
    summary: "You're ready to heal past experiences with mindfulness and self-compassion.",
    description: "Our assessment indicates you would benefit from trauma-informed approaches to processing difficult experiences.",
    compatibilityScore: 85,
    courses: [
      {
        id: "gentle-healing",
        title: "Gentle Healing Journey",
        description: "A trauma-informed approach to processing and integrating difficult experiences.",
        price: 149,
        image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ],
    streaks: [
      {
        id: "self-compassion",
        title: "Daily Self-Compassion",
        description: "Build your capacity for self-kindness through daily micro-practices.",
        members: 1342,
        difficulty: "Easy",
        duration: "Ongoing"
      },
      {
        id: "emotional-resilience",
        title: "Emotional Resilience",
        description: "Strengthen your ability to process difficult emotions with grace.",
        members: 968,
        difficulty: "Moderate",
        duration: "6 weeks"
      }
    ],
    products: [
      {
        id: "calm-toolkit",
        title: "Inner Calm Toolkit",
        description: "Essential resources for self-regulation during emotional challenges.",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      }
    ]
  },
  "general": {
    summary: "",
    description: "",
    compatibilityScore: 0,
    courses: [],
    streaks: [],
    products: []
  }
};

const QuizResults = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, we would analyze the answers and generate personalized results
    // Here we'll simulate that by using the static recommendations based on quiz type
    
    // Check if we have answers from the quiz
    if (!location.state || !location.state.answers) {
      // If no answers, redirect back to quiz selection
      navigate("/quiz");
      return;
    }

    // For the general quiz, we'd determine which area they should focus on
    // For this demo, let's simulate that by checking their answer to the first question
    let recommendationType = quizId;
    
    if (quizId === "general") {
      // Use the most frequent answer as the recommended path
      const answers = location.state.answers;
      const answerValues = Object.values(answers) as string[];
      
      // Get the option values from their answers
      const valueMap: Record<string, number> = {};
      
      // For each answer, find the selected option and get its value
      Object.entries(answers).forEach(([questionId, optionId]) => {
        const question = quizData.general.questions.find(q => q.id === questionId);
        if (question) {
          const option = question.options.find(o => o.id === optionId);
          if (option) {
            if (typeof option.value === 'string') {
              valueMap[option.value] = (valueMap[option.value] || 0) + 1;
            }
          }
        }
      });
      
      // Find the most frequent value
      let maxCount = 0;
      let maxValue = '';
      
      Object.entries(valueMap).forEach(([value, count]) => {
        if (count > maxCount) {
          maxCount = count;
          maxValue = value;
        }
      });
      
      recommendationType = maxValue || 'self-mastery';
    }
    
    // Get the recommendations for this type
    const typeResults = recommendations[recommendationType as keyof typeof recommendations];
    
    setResults({
      ...typeResults,
      quizType: quizId,
      recommendationType
    });
  }, [quizId, location.state, navigate]);

  if (!results) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Your Personalized Results | InnerPath Journey</title>
        <meta name="description" content="Your personalized growth recommendations based on your quiz results." />
      </Helmet>
      
      <QuizLayout 
        title="Your Personalized Results"
        subtitle={`Based on your ${quizId === "general" ? "general assessment" : quizId.replace("-", " ")} quiz`}
      >
        <div className="space-y-8">
          {/* Results Summary */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">{results.summary}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{results.description}</p>
            
            {quizId === "general" && results.recommendationType !== quizId && (
              <div className="my-6 p-4 bg-primary/10 rounded-lg">
                <p className="font-medium">Based on your answers, we recommend focusing on <span className="text-primary font-bold">{results.recommendationType.replace("-", " ")}</span> for your personal growth journey.</p>
                <Link to={`/quiz/${results.recommendationType}`} className="text-primary text-sm hover:underline inline-block mt-2">
                  Take the full {results.recommendationType.replace("-", " ")} assessment →
                </Link>
              </div>
            )}
            
            <div className="mt-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-xs mb-2">
                <span className="text-sm font-medium">Compatibility Score</span>
                <span className="text-sm font-bold">{results.compatibilityScore}%</span>
              </div>
              <Progress value={results.compatibilityScore} className="w-full max-w-xs h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                This indicates how well our recommendations match your needs
              </p>
            </div>
          </div>
          
          {/* Recommended Courses */}
          <div>
            <h3 className="text-xl font-bold mb-4">Recommended Courses</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {results.courses.map((course: any) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-40 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {course.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="font-bold">${course.price}</span>
                    <Button asChild>
                      <Link to={`/courses/${course.id}`}>
                        <Book className="mr-2 h-4 w-4" /> View Course
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Recommended Streaks */}
          <div>
            <h3 className="text-xl font-bold mb-4">Recommended Streaks</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {results.streaks.map((streak: any) => (
                <Card key={streak.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{streak.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {streak.description}
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Members</span>
                        <span className="font-medium">{streak.members.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty</span>
                        <span className="font-medium">{streak.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{streak.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/streaks/${streak.id}`}>
                        <Calendar className="mr-2 h-4 w-4" /> Join Streak
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Recommended Products */}
          {results.products.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Recommended Products</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {results.products.map((product: any) => (
                  <Card key={product.id} className="flex overflow-hidden">
                    <div className="w-1/3">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold">{product.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-bold">${product.price}</span>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/shop/${product.id}`}>
                            <ShoppingBag className="mr-2 h-4 w-4" /> View Product
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Next Steps */}
          <div className="border-t pt-6 mt-10">
            <h3 className="text-xl font-bold mb-4">Next Steps</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <Button asChild className="flex-1">
                <Link to={`/courses`}>
                  <Book className="mr-2 h-4 w-4" /> Browse All Courses
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/quiz">
                  Take Another Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </QuizLayout>
    </>
  );
};

export default QuizResults;
