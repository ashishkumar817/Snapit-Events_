import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import { Link } from "react-router-dom";

const cityPages = [
  { label: "Event Production in Udupi", path: "/event-production-udupi" },
  { label: "Event Management in Mangalore", path: "/event-production-mangalore" },
  { label: "Event Production in Bangalore", path: "/event-production-bangalore" },
  { label: "Event Planning in Kerala", path: "/event-production-kerala" },
  { label: "Luxury Events in Goa", path: "/event-production-goa" },
];

const ServicesPage = () => {
  return (
    <>
      <SEOHead
        title="Event Production Services | Weddings, Corporate Events & More | SnapIt Events"
        description="Explore our premium event production services including wedding planning, corporate events, birthday parties, concerts, stage & lighting setup. Serving Udupi, Mangalore, Bangalore, Kerala & Goa."
        canonical="/services"
      />

      <section className="pt-32 pb-16 bg-secondary/30 section-padding">
        <div className="container mx-auto text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            What We Offer
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Our Premium Event <span className="text-gold-gradient">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From intimate gatherings to grand celebrations — we deliver flawless event production across South India.
          </p>
        </div>
      </section>

      <ServicesSection />

      {/* City-specific service links */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">
            Services by <span className="text-gold-gradient">Location</span>
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            We offer tailored event production services across multiple cities. Explore location-specific details:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityPages.map((city) => (
              <Link
                key={city.path}
                to={city.path}
                className="p-4 rounded-sm border border-border bg-card hover:border-primary/40 transition-colors text-center font-medium hover:text-primary"
              >
                {city.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
