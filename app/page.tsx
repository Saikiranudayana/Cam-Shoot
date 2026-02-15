import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Packages from "@/components/Packages";
import Addons from "@/components/Addons"; // Import Addons
import WhyChooseUs from "@/components/WhyChooseUs";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      <section id="packages">
        <Packages />
        <Addons /> {/* Added Addons here as requested "right below the package" */}
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>
      <section id="contact">
        <BookingForm />
      </section>
      {/* Footer will go in Layout */}
    </main>
  );
}
