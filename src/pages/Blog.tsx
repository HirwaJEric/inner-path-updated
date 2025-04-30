
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MessageSquare, 
  Heart,
  Search,
  BookOpen
} from "lucide-react";

// Blog post data (mock data)
const blogPosts = [
  {
    id: 1,
    slug: "finding-inner-peace",
    title: "Finding Inner Peace in a Chaotic World",
    excerpt: "Discover practical methods to maintain calm and balance in today's fast-paced environment.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    category: "Mindfulness",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "April 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: 12,
    likes: 45
  },
  {
    id: 2,
    slug: "mindful-meditation-techniques",
    title: "5 Mindful Meditation Techniques for Beginners",
    excerpt: "Start your meditation journey with these simple yet powerful techniques anyone can master.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    category: "Meditation",
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "April 10, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: 8,
    likes: 32
  },
  {
    id: 3,
    slug: "career-transition-guidance",
    title: "Navigating a Successful Career Transition at Any Age",
    excerpt: "Learn how to make a smooth career change regardless of your life stage or background.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    category: "Career",
    author: {
      name: "Lisa Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "April 5, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: 15,
    likes: 67
  },
  {
    id: 4,
    slug: "emotional-intelligence",
    title: "Building Emotional Intelligence for Better Relationships",
    excerpt: "Enhance your emotional intelligence and transform the quality of your personal and professional relationships.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    category: "Relationships",
    author: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "March 28, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: 20,
    likes: 53
  },
  {
    id: 5,
    slug: "anxiety-management",
    title: "Practical Anxiety Management in High-Pressure Situations",
    excerpt: "Discover effective techniques to manage anxiety when facing high-stakes scenarios.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    category: "Mental Health",
    author: {
      name: "Jennifer Wright",
      avatar: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "March 20, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: 18,
    likes: 41
  },
  {
    id: 6,
    slug: "spiritual-growth",
    title: "Integrating Spiritual Practice Into Your Daily Routine",
    excerpt: "Learn how to incorporate spiritual elements into your everyday life for greater fulfillment.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    category: "Spirituality",
    author: {
      name: "Omar Hassan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "March 15, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    comments: 10,
    likes: 38
  }
];

const categories = [
  "All Categories", 
  "Mindfulness", 
  "Meditation", 
  "Career", 
  "Relationships", 
  "Mental Health", 
  "Spirituality", 
  "Personal Growth"
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <Helmet>
        <title>Blog | InnerPath Journey</title>
        <meta name="description" content="Explore articles on personal growth, mindfulness, career development, and mental health to guide your transformation journey." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <SectionHeader 
          title="InnerPath Blog" 
          subtitle="Insights and guidance for your personal growth journey"
          centered
        />
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 mt-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <Link to={`/blog/${filteredPosts[0].slug}`} className="group">
              <div className="rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={filteredPosts[0].image} 
                      alt={filteredPosts[0].title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          {filteredPosts[0].category}
                        </span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {filteredPosts[0].date}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {filteredPosts[0].title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6">
                        {filteredPosts[0].excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={filteredPosts[0].author.avatar} alt={filteredPosts[0].author.name} />
                          <AvatarFallback>{filteredPosts[0].author.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{filteredPosts[0].author.name}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="h-3 w-3 mr-1" />
                        <span>{filteredPosts[0].readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
        
        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <Link to={`/blog/${post.slug}`} className="group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Link>
              
              <CardFooter className="flex items-center justify-between p-6 pt-0 border-t border-border mt-auto">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{post.author.name}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <div className="flex items-center text-xs">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
