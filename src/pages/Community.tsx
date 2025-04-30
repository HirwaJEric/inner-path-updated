
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import CommunityCard from "@/components/community/CommunityCard";

const Community = () => {
  // Mock data - replace with real data from your backend
  const communities = [
    {
      id: "meditation",
      name: "Meditation Masters",
      description: "A community dedicated to mindfulness and meditation practice",
      image: "/placeholder.svg",
      totem: "🧘",
      memberCount: 1250,
    },
    {
      id: "reading",
      name: "Book Enthusiasts",
      description: "Share your reading journey and discover new books",
      image: "/placeholder.svg",
      totem: "📚",
      memberCount: 890,
    },
    {
      id: "wellness",
      name: "Wellness Warriors",
      description: "Supporting each other in health and wellness goals",
      image: "/placeholder.svg",
      totem: "🌱",
      memberCount: 750,
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Community | InnerPath Journey</title>
      </Helmet>

      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Communities</h1>
          <p className="text-lg text-muted-foreground">
            Join like-minded individuals on your journey of personal growth and transformation
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <SectionHeader
            title="Community Guidelines"
            subtitle="Our community values and policies"
          />
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3>Our Values</h3>
            <ul>
              <li>Respect and support for all members</li>
              <li>Open and honest communication</li>
              <li>Commitment to personal growth</li>
              <li>Sharing knowledge and experiences</li>
            </ul>

            <h3>Engagement Policies</h3>
            <ul>
              <li>Be kind and courteous to other members</li>
              <li>No hate speech or bullying</li>
              <li>Respect privacy and confidentiality</li>
              <li>Stay on topic and contribute meaningfully</li>
            </ul>
          </div>
        </div>

        <SectionHeader
          title="Join a Community"
          subtitle="Find your tribe and grow together"
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <CommunityCard key={community.id} {...community} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Community;
