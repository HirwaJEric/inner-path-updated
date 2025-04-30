
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminStreaks from "@/components/admin/AdminStreaks";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminSales from "@/components/admin/AdminSales";
import AdminBlogPosts from "@/components/admin/AdminBlogPosts";
import AdminQuizzes from "@/components/admin/AdminQuizzes";
import AdminBooks from "@/components/admin/AdminBooks";
import AdminEvents from "@/components/admin/AdminEvents";
import AdminCalendar from "@/components/admin/AdminCalendar";
import AdminConsultations from "@/components/admin/AdminConsultations";
import AdminEmailList from "@/components/admin/AdminEmailList";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminCommunities from "@/components/admin/AdminCommunities";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminTeamMembers from "@/components/admin/AdminTeamMembers";
import AdminCareers from "@/components/admin/AdminCareers";
import AdminApplicants from "@/components/admin/AdminApplicants";
import AdminAddUser from "@/components/admin/AdminAddUser";
import AdminViewEditUsers from "@/components/admin/AdminViewEditUsers";
import AdminAddCourse from "@/components/admin/AdminAddCourse";
import AdminViewEditCourses from "@/components/admin/AdminViewEditCourses";
import AdminCourseCategories from "@/components/admin/AdminCourseCategories";
import AdminBlogCategories from "@/components/admin/AdminBlogCategories";
import AdminProfile from "@/components/admin/AdminProfile";
import AdminEmailCampaigns from "@/components/admin/AdminEmailCampaigns";
import AdminCreateCampaign from "@/components/admin/AdminCreateCampaign";
import AdminNotifications from "@/components/admin/AdminNotifications";
import NotificationsPopover from "@/components/admin/NotificationsPopover";
import AddTeamMember from "@/components/admin/AddTeamMember";
import EditTeamMember from "@/components/admin/EditTeamMember";
import JobPostingDetails from "@/components/admin/JobPostingDetails";
import ApplicantDetails from "@/components/admin/ApplicantDetails";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { isAdmin, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showViewEditUsers, setShowViewEditUsers] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showViewEditCourses, setShowViewEditCourses] = useState(false);

  // Email Campaigns state
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  
  // Team Members state
  const [showAddTeamMember, setShowAddTeamMember] = useState(false);
  const [editTeamMemberId, setEditTeamMemberId] = useState<number | null>(null);
  
  // Career/Jobs state
  const [showAddJobPosting, setShowAddJobPosting] = useState(false);
  const [showJobPostingDetails, setShowJobPostingDetails] = useState<number | null>(null);
  
  // Applicants state
  const [showApplicantDetails, setShowApplicantDetails] = useState<number | null>(null);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    logout();
    navigate('/login');
  };

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Handle showing team member components
  if (showAddTeamMember) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>Add Team Member | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setShowAddTeamMember(false)}>
              ← Back to Team Members
            </button>
            <AddTeamMember />
          </div>
        </div>
      </div>
    );
  }

  if (editTeamMemberId !== null) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>Edit Team Member | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setEditTeamMemberId(null)}>
              ← Back to Team Members
            </button>
            <EditTeamMember />
          </div>
        </div>
      </div>
    );
  }

  // Handle showing job posting components
  if (showAddJobPosting) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>Add Job Posting | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setShowAddJobPosting(false)}>
              ← Back to Careers
            </button>
            {/* Add Job Posting component would be here */}
            <div>Add Job Posting Form</div>
          </div>
        </div>
      </div>
    );
  }

  if (showJobPostingDetails !== null) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>Job Posting Details | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setShowJobPostingDetails(null)}>
              ← Back to Careers
            </button>
            <JobPostingDetails />
          </div>
        </div>
      </div>
    );
  }

  // Handle showing applicant details
  if (showApplicantDetails !== null) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>Applicant Details | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setShowApplicantDetails(null)}>
              ← Back to Applicants
            </button>
            <ApplicantDetails />
          </div>
        </div>
      </div>
    );
  }

  // Email campaign creation & navigation logic
  if (showCreateCampaign) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>Create Campaign | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <AdminCreateCampaign onBack={() => setShowCreateCampaign(false)} />
          </div>
        </div>
      </div>
    );
  }

  if (showAddUser) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>Add User | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setShowAddUser(false)}>
              ← Back to Users
            </button>
            <AdminAddUser />
          </div>
        </div>
      </div>
    );
  }

  if (showViewEditUsers) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>View/Edit Users | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setShowViewEditUsers(false)}>
              ← Back to Users
            </button>
            <AdminViewEditUsers />
          </div>
        </div>
      </div>
    );
  }

  if (showAddCourse) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>Add Course | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setShowAddCourse(false)}>
              ← Back to Courses
            </button>
            <AdminAddCourse />
          </div>
        </div>
      </div>
    );
  }

  if (showViewEditCourses) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Helmet>
          <title>View/Edit Courses | InnerPath Journey Admin</title>
        </Helmet>
        <div className="flex min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-8">
            <button className="mb-6 text-primary hover:underline" onClick={() => setShowViewEditCourses(false)}>
              ← Back to Courses
            </button>
            <AdminViewEditCourses />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Helmet>
        <title>Admin Dashboard | InnerPath Journey</title>
        <meta name="description" content="Admin dashboard for managing InnerPath Journey platform" />
      </Helmet>
      <div className="flex min-h-screen">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {activeTab === "overview" && "Admin Dashboard"}
              {activeTab === "users" && "Manage Users"}
              {activeTab === "courses" && "Manage Courses"}
              {activeTab === "course-categories" && "Course Categories"}
              {activeTab === "blog-categories" && "Blog Categories"}
              {activeTab === "streaks" && "Manage Streaks"}
              {activeTab === "analytics" && "Website Analytics"}
              {activeTab === "sales" && "Sales & Revenue"}
              {activeTab === "blogs" && "Manage Blog Posts"}
              {activeTab === "quizzes" && "Manage Quizzes"}
              {activeTab === "books" && "Upcoming Books"}
              {activeTab === "events" && "Manage Events"}
              {activeTab === "calendar" && "Calendar Availability"}
              {activeTab === "consultations" && "Scheduled Consultations"}
              {activeTab === "emails" && "Email List"}
              {activeTab === "email-campaigns" && "Email Campaigns"}
              {activeTab === "products" && "Shop Products"}
              {activeTab === "gallery" && "Gallery Management"}
              {activeTab === "communities" && "Communities"}
              {activeTab === "profile" && "Admin Profile"}
              {activeTab === "notifications" && "Notifications"}
              {activeTab === "team-members" && "Team Members"}
              {activeTab === "careers" && "Career Opportunities"}
              {activeTab === "applicants" && "Job Applicants"}
            </h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                Welcome, Admin
              </span>
              <ThemeToggle />
              {/* Notifications bell icon popover */}
              <NotificationsPopover />
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          <div>
            {activeTab === "overview" && <AdminOverview />}
            {activeTab === "users" && (
              <AdminUsers
                onAddUser={() => setShowAddUser(true)}
                onViewEditUsers={() => setShowViewEditUsers(true)}
              />
            )}
            {activeTab === "courses" && (
              <AdminCourses
                onAddCourse={() => setShowAddCourse(true)}
                onViewEditCourses={() => setShowViewEditCourses(true)}
              />
            )}
            {activeTab === "course-categories" && <AdminCourseCategories />}
            {activeTab === "blog-categories" && <AdminBlogCategories />}
            {activeTab === "streaks" && <AdminStreaks />}
            {activeTab === "analytics" && <AdminAnalytics />}
            {activeTab === "sales" && <AdminSales />}
            {activeTab === "blogs" && <AdminBlogPosts />}
            {activeTab === "quizzes" && <AdminQuizzes />}
            {activeTab === "books" && <AdminBooks />}
            {activeTab === "events" && <AdminEvents />}
            {activeTab === "calendar" && <AdminCalendar />}
            {activeTab === "consultations" && <AdminConsultations />}
            {activeTab === "emails" && <AdminEmailList />}
            {activeTab === "email-campaigns" && (
              <AdminEmailCampaigns onCreate={() => setShowCreateCampaign(true)} />
            )}
            {activeTab === "products" && <AdminProducts />}
            {activeTab === "gallery" && <AdminGallery />}
            {activeTab === "communities" && <AdminCommunities />}
            {activeTab === "profile" && <AdminProfile onLogout={handleLogout} />}
            {activeTab === "notifications" && <AdminNotifications />}
            {activeTab === "team-members" && (
              <AdminTeamMembers 
                onAdd={() => setShowAddTeamMember(true)}
                onEdit={(id) => setEditTeamMemberId(id)}
              />
            )}
            {activeTab === "careers" && (
              <AdminCareers 
                onAddJob={() => setShowAddJobPosting(true)}
                onViewDetails={(id) => setShowJobPostingDetails(id)}
              />
            )}
            {activeTab === "applicants" && (
              <AdminApplicants 
                onViewApplicant={(id) => setShowApplicantDetails(id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
