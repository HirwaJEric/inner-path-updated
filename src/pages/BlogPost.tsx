import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Calendar, 
  Clock,
  Heart,
  MessageSquare,
  Share2,
  Mail,
  ArrowLeft
} from "lucide-react";

// Blog post data (mock data)
const blogPosts = [
  {
    id: 1,
    slug: "finding-inner-peace",
    title: "Finding Inner Peace in a Chaotic World",
    excerpt: "Discover practical methods to maintain calm and balance in today's fast-paced environment.",
    content: `
      <p>In today's fast-paced world, finding inner peace can feel like an impossible task. We're constantly bombarded with notifications, deadlines, and responsibilities that leave little room for reflection and tranquility. Yet, cultivating a sense of inner calm is perhaps more essential now than ever before.</p>
      
      <h2>The Importance of Finding Balance</h2>
      <p>Our modern lifestyles often prioritize productivity and achievement over well-being and balance. We find ourselves caught in a cycle of constant doing, rarely giving ourselves permission to simply be. This imbalance takes a toll on our mental, emotional, and physical health.</p>
      
      <p>Research has shown that chronic stress can lead to a variety of health issues, including anxiety, depression, heart disease, and a weakened immune system. Finding inner peace isn't just a spiritual pursuit—it's a necessity for our overall well-being.</p>
      
      <h2>Practical Methods for Cultivating Inner Peace</h2>
      
      <h3>1. Mindful Breathing</h3>
      <p>One of the simplest ways to center yourself is through mindful breathing. Take a few moments throughout your day to focus solely on your breath. Notice the sensation of air entering and leaving your body. This simple practice can anchor you to the present moment and create a sense of calm amid chaos.</p>
      
      <h3>2. Create Boundaries with Technology</h3>
      <p>Our devices can be wonderful tools, but they can also be significant sources of stress and distraction. Consider establishing tech-free zones or times in your life. Perhaps you keep devices out of your bedroom or turn off notifications during dinner. These boundaries can help create space for peace to flourish.</p>
      
      <h3>3. Connect with Nature</h3>
      <p>Spending time in natural environments has been shown to reduce stress and promote feelings of well-being. Whether it's a walk in the park, tending to houseplants, or simply gazing at the stars, connecting with nature can help restore a sense of peace and perspective.</p>
      
      <h3>4. Practice Gratitude</h3>
      <p>Regularly acknowledging the things you're grateful for can shift your focus from what's wrong to what's right in your life. This simple practice can foster contentment and peace. Consider keeping a gratitude journal or simply reflecting on three things you're thankful for each day.</p>
      
      <h2>Inner Peace as a Journey</h2>
      <p>Finding inner peace isn't a destination you arrive at once and forever. It's a continual practice, a return to center that we must choose again and again. Some days will be easier than others, and that's okay. The key is to approach the journey with patience and self-compassion.</p>
      
      <p>Remember that even small moments of peace are valuable. You don't need to radically change your life overnight to experience greater tranquility. Start small, be consistent, and watch as these moments of peace begin to expand and connect.</p>
      
      <h2>Conclusion</h2>
      <p>In a world that often seems designed to keep us distracted and off-balance, choosing peace is a radical act. It's a declaration that your well-being matters, that you deserve moments of calm and clarity amidst life's inevitable storms.</p>
      
      <p>As you incorporate these practices into your life, notice how they affect not only your inner experience but also your relationships and work. Often, the peace we cultivate within radiates outward, positively impacting all areas of our lives.</p>
      
      <p>The journey to inner peace is both deeply personal and universally human. However you choose to pursue it, know that each step you take is valuable and worthwhile.</p>
    `,
    category: "Mindfulness",
    author: {
      name: "Sarah Johnson",
      bio: "Mindfulness coach and meditation teacher with over 10 years of experience helping people find peace in their daily lives.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "April 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    comments: [
      {
        id: 1,
        author: {
          name: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        date: "April 16, 2025",
        content: "This article came at the perfect time for me. I've been feeling overwhelmed lately, and these practices seem doable. I'm going to start with the mindful breathing today!"
      },
      {
        id: 2,
        author: {
          name: "Lisa Rodriguez",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        date: "April 17, 2025",
        content: "I've found that connecting with nature is especially powerful. Even just 10 minutes outside can completely shift my mood and perspective. Thanks for the reminder!"
      }
    ],
    likes: 45,
    related: [2, 5, 6]
  },
  // ... more blog posts here (refer to previous file for the data)
];

// Schema for comment form
const commentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  comment: z.string().min(5, { message: "Comment must be at least 5 characters" })
});

type CommentFormValues = z.infer<typeof commentSchema>;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState(blogPosts.find(post => post.slug === slug));
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes || 0);
  const [relatedPosts, setRelatedPosts] = useState<typeof blogPosts>([]);

  // Form setup for comments
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: ""
    }
  });

  // Fetch related posts
  useEffect(() => {
    if (post && post.related) {
      const related = blogPosts.filter(p => post.related.includes(p.id));
      setRelatedPosts(related);
    }
  }, [post]);

  // Handle like action
  const handleLike = () => {
    if (!liked) {
      setLikesCount(prevCount => prevCount + 1);
      setLiked(true);
      toast({
        title: "Thanks for your support!",
        description: "You liked this article.",
      });
    } else {
      setLikesCount(prevCount => prevCount - 1);
      setLiked(false);
    }
  };

  // Handle share to social media
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "Check out this article";
    
    let shareUrl = "";
    
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  // Handle comment submission
  const onSubmit = (data: CommentFormValues) => {
    console.log("Comment submitted:", data);
    toast({
      title: "Comment submitted!",
      description: "Your comment will appear after moderation.",
    });
    form.reset();
  };

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | InnerPath Journey</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      
      <div className="bg-muted/30 py-8 mb-12">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-3">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <article className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden mb-10">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          {/* Article content */}
          <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-border mb-12">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex items-center gap-2 ${liked ? 'text-red-500' : ''}`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
                {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
              </Button>
              
              <Separator orientation="vertical" className="h-6 mx-3" />
              
              <div className="flex items-center text-muted-foreground text-sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                {post.comments.length} Comments
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-1">Share:</span>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={() => handleShare("twitter")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={() => handleShare("facebook")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={() => handleShare("linkedin")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={() => handleShare("email")}>
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Author Info */}
          <div className="bg-muted/30 rounded-xl p-6 mb-12">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold mb-1">About {post.author.name}</h3>
                <p className="text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.id} className="hover:shadow-md transition-shadow">
                    <Link to={`/blog/${relatedPost.slug}`} className="block">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground mb-2">{relatedPost.date}</div>
                        <h4 className="font-semibold line-clamp-2 mb-1 hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Comments Section */}
          <div id="comments">
            <h3 className="text-2xl font-bold mb-6">Comments ({post.comments.length})</h3>
            
            {post.comments.map(comment => (
              <div key={comment.id} className="border-b border-border py-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{comment.author.name}</h4>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Comment Form */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Leave a Comment</h4>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <textarea
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your comment..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Post Comment</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
