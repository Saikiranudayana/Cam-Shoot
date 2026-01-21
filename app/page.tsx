import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <BookingForm />
      {/* Footer will go in Layout */}
    </main>
  );
}
