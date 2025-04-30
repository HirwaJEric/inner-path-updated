
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";

const CookiePolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Cookie Policy | InnerPath Journey</title>
        <meta name="description" content="Learn about how we use cookies on InnerPath Journey." />
      </Helmet>
      
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose prose-lg">
          <p className="text-muted-foreground">Last updated: April 20, 2025</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide and improve our services by:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Remembering your preferences</li>
              <li>Understanding how you use our site</li>
              <li>Personalizing your experience</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Essential cookies for site functionality</li>
              <li>Analytics cookies to improve our service</li>
              <li>Preference cookies to remember your settings</li>
              <li>Marketing cookies for targeted advertising</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. Managing Cookies</h2>
            <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
