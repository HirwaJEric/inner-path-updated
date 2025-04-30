
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizLayout } from "@/components/quiz/QuizLayout";
import { ArrowRight, ArrowLeft, Book } from "lucide-react";

// Mock quiz data - this would typically come from an API
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

const QuizTaking = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Validate quiz ID and redirect if not valid
  useEffect(() => {
    if (!quizId || !quizData[quizId as keyof typeof quizData]) {
      navigate("/quiz");
    }
  }, [quizId, navigate]);
  
  if (!quizId || !quizData[quizId as keyof typeof quizData]) {
    return null;
  }
  
  const quiz = quizData[quizId as keyof typeof quizData];
  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Navigate to results page with answers
      navigate(`/quiz/${quizId}/results`, { 
        state: { answers, quizType: quizId } 
      });
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  return (
    <>
      <Helmet>
        <title>{quiz.title} Quiz | InnerPath Journey</title>
        <meta name="description" content={`Take our ${quiz.title} assessment to receive personalized recommendations for your growth journey.`} />
      </Helmet>
      
      <QuizLayout 
        title={quiz.title}
        subtitle={quiz.description}
        showBackButton={currentQuestionIndex > 0}
        onBackClick={handlePreviousQuestion}
      >
        <div className="space-y-8">
          <QuizProgress 
            currentStep={currentQuestionIndex + 1} 
            totalSteps={questions.length} 
          />
          
          <QuizQuestion
            question={currentQuestion.text}
            options={currentQuestion.options}
            selectedOption={answers[currentQuestion.id] || null}
            onOptionSelect={handleOptionSelect}
            className="my-8"
          />
          
          <div className="flex justify-between pt-4 border-t">
            {currentQuestionIndex > 0 ? (
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            <Button
              onClick={handleNextQuestion}
              disabled={!answers[currentQuestion.id]}
            >
              {isLastQuestion ? (
                <>
                  <Book className="mr-2 h-4 w-4" /> Complete Quiz
                </>
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </QuizLayout>
    </>
  );
};

export default QuizTaking;
