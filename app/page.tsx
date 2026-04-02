import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
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
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="about">
        <About />
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
