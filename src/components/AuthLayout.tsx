import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Page shell for the signed-out/auth routes so they carry the same header,
 * footer and palette as the marketing pages instead of rendering bare.
 */
const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col min-h-screen bg-paper text-ink">
    <Header />
    <main className="flex-grow">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">{children}</div>
      </section>
    </main>
    <Footer />
  </div>
);

export default AuthLayout;
