import { Heart, Building2, Cake, Gem, Music, Camera } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Heart,
    title: "Wedding Planning",
    description:
      "Professional wedding planning services in Udupi and Mangalore, including stage décor, lighting, mandap setup, and complete event coordination.",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description:
      "Professional conferences, product launches, and corporate galas executed with precision and elegance.",
  },
  {
    icon: Cake,
    title: "Birthday Parties",
    description:
      "Themed celebrations, milestone birthdays, and surprise parties that create unforgettable memories.",
  },
  {
    icon: Gem,
    title: "Engagement & Anniversaries",
    description:
      "Romantic proposals, engagement parties, and anniversary celebrations that capture your love.",
  },
  {
    icon: Music,
    title: "Concerts & Live Shows",
    description:
      "From intimate acoustic sessions to large-scale concerts with world-class production.",
  },
  {
    icon: Camera,
    title: "Decoration & Photography",
    description:
      "Stunning décor design and professional photography to capture every precious moment.",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Our Premium <span className="text-gold-gradient">Services</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative bg-card border border-border rounded-sm p-8 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:gold-glow"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:opacity-90 transition-opacity text-lg"
          >
            Book Your Event Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
