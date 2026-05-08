import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import { Heart, Building2, Cake, Gem, Music, Camera } from "lucide-react";

const services = [
  { icon: Heart, title: "Wedding Planning", description: "From fairy-tale ceremonies to grand receptions, we design weddings that reflect your unique love story." },
  { icon: Building2, title: "Corporate Events", description: "Professional conferences, product launches, and corporate galas executed with precision and elegance." },
  { icon: Cake, title: "Birthday Parties", description: "Themed celebrations, milestone birthdays, and surprise parties that create unforgettable memories." },
  { icon: Gem, title: "Engagement & Anniversaries", description: "Romantic proposals, engagement parties, and anniversary celebrations that capture your love." },
  { icon: Music, title: "Concerts & Live Shows", description: "From intimate acoustic sessions to large-scale concerts with world-class production." },
  { icon: Camera, title: "Decoration & Photography", description: "Stunning décor design and professional photography to capture every precious moment." },
];

const cityLinks = [
  { city: "Udupi", slug: "/event-production-udupi", desc: "Our premium event production in the temple city." },
  { city: "Mangalore", slug: "/event-production-mangalore", desc: "Leading event management across Mangalore's vibrant communities." },
  { city: "Bangalore", slug: "/event-production-bangalore", desc: "World-class production for India's Silicon Valley." },
  { city: "Kerala", slug: "/event-production-kerala", desc: "Bespoke events amidst Kerala's stunning natural beauty." },
  { city: "Goa", slug: "/event-production-goa", desc: "Luxury beach weddings and destination events in Goa." },
];

const Index = () => {
  return (
    <>
      <SEOHead
        title="Professional Event Production Services in Udupi & Across Karnataka | SnapIt Events"
        description="SnapIt Events offers premium event production services in Udupi, Mangalore, Bangalore, Kerala & Goa. Expert wedding planning, corporate events, stage production, lighting & sound setup."
        canonical="/"
      />

      <HeroSection />

      {/* About Section */}
      <AboutSection />
      <div className="text-center -mt-12 mb-16">
        <Link to="/about" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
          Learn More About Us <ArrowRight size={16} />
        </Link>
      </div>

      {/* Services overview */}
      <section id="services" className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Our Premium <span className="text-gold-gradient">Services</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="group relative bg-card border border-border rounded-sm p-8 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:gold-glow">
                <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:opacity-90 transition-opacity text-lg gap-2">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />
      <div className="text-center -mt-12 mb-16">
        <Link to="/gallery" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
          View Full Gallery <ArrowRight size={16} />
        </Link>
      </div>

      {/* Service Areas */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Where We Serve</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Event Production Across <span className="text-gold-gradient">South India</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From our services in Udupi, we deliver premium event management across Karnataka, Kerala, and Goa.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityLinks.map((city) => (
              <Link
                key={city.slug}
                to={city.slug}
                className="group flex flex-col p-6 rounded-sm border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={18} className="text-primary" />
                  <h3 className="text-lg font-heading font-semibold group-hover:text-primary transition-colors">{city.city}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{city.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
      <div className="text-center -mt-12 mb-16">
        <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
          Visit Contact Page <ArrowRight size={16} />
        </Link>
      </div>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Create Something <span className="text-gold-gradient">Extraordinary</span>?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Contact SnapIt Events today for a free consultation and quote for your next event.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-gold-gradient text-primary-foreground px-8 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity gold-glow"
            >
              Book Event Production
            </Link>
            <Link
              to="/contact"
              className="border border-border text-foreground px-8 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase hover:border-primary hover:text-primary transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
