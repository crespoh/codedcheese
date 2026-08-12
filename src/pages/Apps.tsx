import Header from "@/components/Header";
import AppsSection from "@/components/AppsSection";
import Footer from "@/components/Footer";

const Apps = () => {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink">
      <Header />
      <main className="flex-grow">
        <AppsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Apps;
