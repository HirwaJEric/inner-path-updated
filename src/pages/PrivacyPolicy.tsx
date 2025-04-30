
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | InnerPath Journey</title>
        <meta name="description" content="Our privacy policy details how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg">
          <p className="text-muted-foreground">Last updated: April 20, 2025</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Course progress and preferences</li>
              <li>Communications with us</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process your payments</li>
              <li>Send you updates and marketing communications</li>
              <li>Analyze and enhance our platform</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Service providers</li>
              <li>Payment processors</li>
              <li>Legal authorities when required</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
