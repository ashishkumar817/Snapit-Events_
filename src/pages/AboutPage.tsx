import SEOHead from "@/components/SEOHead";
import AboutSection from "@/components/AboutSection";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="About SnapIt Events | Event Production Company in Udupi, Karnataka"
        description="Learn about SnapIt Events – a trusted event production company based in Udupi, Karnataka. We deliver premium weddings, corporate events, and celebrations across South India."
        canonical="/about"
      />

      {/* Hero banner */}
      <section className="pt-32 pb-16 bg-secondary/30 section-padding">
        <div className="container mx-auto text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Know Us Better
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            About <span className="text-gold-gradient">SnapIt Events</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your trusted event production partner based in Udupi, Karnataka — serving clients across Mangalore, Bangalore, Kerala &amp; Goa.
          </p>
        </div>
      </section>

      <AboutSection />

      {/* Extra SEO content */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">
            Our Service <span className="text-gold-gradient">Areas</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-center mb-8">
            We proudly serve clients across South India. Explore our city-specific event production services:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Udupi", path: "/event-production-udupi" },
              { label: "Mangalore", path: "/event-production-mangalore" },
              { label: "Bangalore", path: "/event-production-bangalore" },
              { label: "Kerala", path: "/event-production-kerala" },
              { label: "Goa", path: "/event-production-goa" },
            ].map((city) => (
              <Link
                key={city.path}
                to={city.path}
                className="px-5 py-2.5 rounded-full border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Events in {city.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
