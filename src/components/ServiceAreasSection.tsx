import { MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ServiceArea {
  id: string;
  city: string;
  heading: string;
  description: string;
}

const serviceAreas: ServiceArea[] = [
  {
    id: "event-production-udupi",
    city: "Udupi",
    heading: "Event Management, Wedding Planning & Event Production in Udupi",
    description:
      "As a proudly Udupi event management service, SnapIt Events brings unmatched expertise to every celebration in the temple city and surrounding coastal regions. Whether you're planning a grand wedding at a heritage venue, a corporate conference, or a vibrant cultural festival, our team delivers end-to-end event production — from stage design and fabrication to professional lighting, sound engineering, and décor. We understand the unique cultural fabric of Udupi and craft events that honour local traditions while embracing modern production standards. Our strong vendor network in Udupi ensures competitive pricing without compromising quality.",
  },
  {
    id: "event-production-mangalore",
    city: "Mangalore",
    heading: "Event Management Company in Mangalore",
    description:
      "SnapIt Events is a leading event management company in Mangalore, offering comprehensive event production services for weddings, receptions, corporate gatherings, product launches, and stage shows. Mangalore's thriving social and business scene demands world-class event execution, and our experienced crew delivers exactly that. From LED walls and intelligent lighting rigs to immersive sound setups and elegant stage backdrops, we transform Mangalore venues into breathtaking experiences. Our deep understanding of Mangalore's diverse communities allows us to tailor every event to reflect your vision perfectly.",
  },
  {
    id: "event-production-bangalore",
    city: "Bangalore",
    heading: "Event Management, Wedding Planning & Event Production in Bangalore",
    description:
      "Bangalore's dynamic corporate culture and vibrant social scene call for event production that matches the city's energy. SnapIt Events provides premium event production in Bangalore — covering large-scale corporate conferences, tech summits, destination weddings, luxury receptions, and entertainment shows. Our Bangalore operations feature cutting-edge AV technology, creative stage concepts, precision lighting design, and crystal-clear sound engineering. We partner with top Bangalore venues and vendors to deliver seamless, high-impact events that leave a lasting impression on every guest.",
  },
  {
    id: "event-production-kerala",
    city: "Kerala",
    heading: "Event Planning Services in Kerala",
    description:
      "Kerala's stunning backwaters, lush landscapes, and rich cultural heritage make it one of India's most sought-after event destinations. SnapIt Events offers bespoke event planning services in Kerala, specialising in destination weddings, traditional ceremonies, luxury corporate retreats, and grand celebrations. Our team handles everything from venue scouting across Kochi, Trivandrum, and Alleppey to full-scale stage production, ambient lighting, live sound, and floral décor. We blend Kerala's natural beauty with professional production to create events that are truly magical and unforgettable.",
  },
  {
    id: "event-production-goa",
    city: "Goa",
    heading: "Luxury Event Production in Goa",
    description:
      "Goa is synonymous with celebration, and SnapIt Events brings luxury event production to this vibrant coastal paradise. Whether it's a beachside destination wedding, an exclusive corporate gala, a music festival, or an intimate private party, our Goa team delivers world-class production value. We specialise in open-air stage setups, weatherproof lighting solutions, beach-ready sound systems, and stunning tropical décor. Our expertise in navigating Goa's unique venue landscape — from five-star resorts to private villas and beach shacks — ensures your event is executed flawlessly.",
  },
];

const ServiceAreasSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="service-areas" className="section-padding bg-background" aria-label="Service Areas">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Where We Serve
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Event Management & Event Production Services Across{" "}
            <span className="text-gold-gradient">South India</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From our services in Udupi, we deliver premium event production across Karnataka, Kerala, and Goa.
          </p>

          {/* Internal anchor links for SEO */}
          <nav className="flex flex-wrap justify-center gap-3 mt-8" aria-label="Service area navigation">
            {serviceAreas.map((area) => (
              <a
                key={area.id}
                href={`#${area.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(`#${area.id}`); }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <MapPin size={14} />
                {area.city}
              </a>
            ))}
          </nav>
        </div>

        <div
          ref={ref}
          className={`space-y-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {serviceAreas.map((area, index) => (
            <article
              key={area.id}
              id={area.id}
              className="scroll-mt-24"
            >
              <div className={`grid md:grid-cols-[auto_1fr] gap-6 items-start p-6 md:p-8 rounded-sm border border-border bg-card hover:border-primary/30 transition-colors`}>
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                    {area.heading.split(" in ")[0]} in{" "}
                    <span className="text-gold-gradient">{area.city}</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {area.description}
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:opacity-90 transition-opacity text-sm tracking-wider uppercase"
                  >
                    Get a Quote for {area.city}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
