import { 
  BookOpen, 
  Users, 
  BarChart, 
  DollarSign, 
  FileText,
  Bookmark,
  HelpCircle,
  Calendar,
  Clock,
  Mail,
  ShoppingBag,
  Image,
  Users2,
  Briefcase,
  UserPlus,
  LogOut,
  Home,
  ChevronDown,
  ChevronRight,
  User,
  Bell,
  Megaphone,
  MailOpen,
  Sun,
  Moon
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface SidebarSection {
  title: string;
  items: {
    id: string;
    name: string;
    icon: React.ElementType;
  }[];
}

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    content: true,
    events: true,
    team: true,
    other: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sections: SidebarSection[] = [
    {
      title: "Overview",
      items: [
        { id: "overview", name: "Dashboard", icon: Home },
        { id: "users", name: "Users", icon: Users },
        { id: "analytics", name: "Analytics", icon: BarChart },
        { id: "sales", name: "Sales", icon: DollarSign },
      ]
    },
    {
      title: "Content",
      items: [
        { id: "courses", name: "Courses", icon: BookOpen },
        { id: "course-categories", name: "Course Categories", icon: BookOpen },
        { id: "blog-categories", name: "Blog Categories", icon: FileText },
        { id: "streaks", name: "Streaks", icon: BarChart },
        { id: "blogs", name: "Blog Posts", icon: FileText },
        { id: "quizzes", name: "Quizzes", icon: HelpCircle },
        { id: "books", name: "Books", icon: Bookmark },
      ]
    },
    {
      title: "Events",
      items: [
        { id: "events", name: "Events", icon: Calendar },
        { id: "calendar", name: "Calendar", icon: Clock },
        { id: "consultations", name: "Consultations", icon: Users },
      ]
    },
    {
      title: "Team",
      items: [
        { id: "team-members", name: "Team Members", icon: Users },
        { id: "careers", name: "Careers", icon: Briefcase },
        { id: "applicants", name: "Applicants", icon: UserPlus },
      ]
    },
    {
      title: "Other",
      items: [
        { id: "emails", name: "Email List", icon: Mail },
        { id: "email-campaigns", name: "Email Campaigns", icon: MailOpen },
        { id: "notifications", name: "Notifications", icon: Bell },
        { id: "products", name: "Products", icon: ShoppingBag },
        { id: "gallery", name: "Gallery", icon: Image },
        { id: "communities", name: "Communities", icon: Users2 },
      ]
    },
  ];

  return (
    <div className="hidden md:flex md:w-64 flex-col bg-background border-r h-screen sticky top-0 p-4 space-y-6 overflow-y-auto">
      <div className="text-2xl font-bold gradient-text">Admin Dashboard</div>
      
      {sections.map((section) => (
        <div key={section.title} className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-between mb-1 text-xs font-medium tracking-widest uppercase"
            onClick={() => toggleSection(section.title.toLowerCase())}
          >
            {section.title}
            {expandedSections[section.title.toLowerCase()] ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </Button>
          
          {expandedSections[section.title.toLowerCase()] && (
            <div className="space-y-1">
              {section.items.map((item) => (
                <Button 
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="pt-4 mt-auto space-y-2 border-t">
        <div className="flex items-center justify-between mb-2 px-3">
          <span className="text-xs font-medium text-muted-foreground">THEME</span>
          <ThemeToggle />
        </div>
        <Button 
          variant={activeTab === "profile" ? "default" : "ghost"} 
          className="w-full justify-start"
          onClick={() => setActiveTab("profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
