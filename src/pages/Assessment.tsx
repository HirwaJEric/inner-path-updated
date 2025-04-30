
import Layout from "@/components/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import AssessmentForm from "@/components/assessment/AssessmentForm";
import { Helmet } from "react-helmet-async";

const Assessment = () => {
  return (
    <Layout>
      <Helmet>
        <title>Self-Assessment | Where Are You On Your Journey?</title>
        <meta name="description" content="Take our comprehensive self-assessment to discover where you are on your journey and receive personalized recommendations for your growth path." />
        <meta name="keywords" content="self-assessment, personal growth assessment, life journey quiz, transformation path" />
      </Helmet>
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Where Are You On Your Journey?</h1>
            <p className="text-xl text-muted-foreground">
              This assessment will help us understand your current state and provide personalized recommendations for your growth.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader
            title="Your Self-Assessment"
            subtitle="Take a few minutes to reflect on where you are in your journey"
            centered={true}
          />
          
          <div className="mt-10">
            <AssessmentForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Assessment;
