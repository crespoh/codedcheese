import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";

const PrivacyPolicyPage = () => (
  <div className="flex flex-col min-h-screen bg-paper text-ink">
    <Header />
    <main className="flex-grow">
      <PrivacyPolicy />
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicyPage;
