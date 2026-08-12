import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppsSection from "@/components/AppsSection";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AppsSection />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
