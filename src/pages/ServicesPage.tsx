import SEOHead from "@/components/SEOHead";
import ServicesSection from "@/components/ServicesSection";
import { Link } from "react-router-dom";

const cityPages = [
  { label: "Event Production in Udupi", path: "/event-production-udupi" },
  { label: "Event Production Services in Mangalore", path: "/event-production-mangalore" },
  { label: "Event Production in Bangalore", path: "/event-production-bangalore" },
  { label: "Event Planning in Kerala", path: "/event-production-kerala" },
  { label: "Luxury Events in Goa", path: "/event-production-goa" },
  { label: "Stage Decoration in Udupi", path: "/stage-decoration-udupi" },

{ label: "Haldi Decoration in Udupi", path: "/haldi-decoration-udupi" },

{ label: "Mehendi Decoration in Udupi", path: "/mehendi-decoration-udupi" },

{ label: "Reception Stage Decoration in Udupi", path: "/reception-stage-decoration-udupi" },

{ label: "Corporate Event Planners in Udupi", path: "/corporate-event-planners-udupi" },

{ label: "Sound and Lighting for Events in Udupi", path: "/sound-lighting-events-udupi" },

{ label: "Coastal Wedding Planners in Karnataka", path: "/coastal-wedding-planners-karnataka" },

{ label: "Event Management Company in Mangalore", path: "/event-management-mangalore" },

{ label: "Wedding Planner in Mangalore", path: "/wedding-planner-mangalore" },

{ label: "Stage Decoration in Mangalore", path: "/stage-decoration-mangalore" },

{ label: "Sound and Lighting for Events in Mangalore", path: "/sound-lighting-events-mangalore" },
];

const ServicesPage = () => {
  return (
    <>
      <SEOHead
        title="Event Management, Wedding Planner & Stage Decoration Services | SnapIt Events"
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
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg mt-6">
SnapIt Events is a leading event management company providing wedding planning,
stage decoration, birthday party planning, corporate event management and
sound & lighting services across Udupi, Mangalore, Bangalore and surrounding
regions. Our experienced team specialises in creating unforgettable celebrations
with professional event production, elegant décor and flawless coordination.
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
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
SnapIt Events provides professional event management, wedding planning,
stage decoration, sound and lighting services across Udupi, Mangalore,
and coastal Karnataka. Explore our specialised event services in each
location to find the perfect solution for your celebration.
</p>
          <p className="text-muted-foreground text-center mb-8">
            We offer tailored event production services across multiple cities. Explore location-specific details:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cityPages.map((city) => (
        <Link
          key={city.path}
          to={city.path}
          className="p-5 rounded-sm border border-border bg-card hover:border-primary/40 transition-colors text-center"
        >
          <h3 className="font-semibold text-lg mb-2">{city.label}</h3>
          <p className="text-sm text-muted-foreground">
            Learn more about our {city.label.toLowerCase()} services.
          </p>
        </Link>
      ))}
    </div>
        </div>
      </section>
    </>
  );
};
<div className="hidden">
  <Link to="/event-management-udupi">Event Management Company in Udupi</Link>
  <Link to="/wedding-planner-udupi">Wedding Planner in Udupi</Link>
  <Link to="/stage-decoration-udupi">Stage Decoration in Udupi</Link>
  <Link to="/haldi-decoration-udupi">Haldi Decoration in Udupi</Link>
  <Link to="/mehendi-decoration-udupi">Mehendi Decoration in Udupi</Link>
</div>

export default ServicesPage;
