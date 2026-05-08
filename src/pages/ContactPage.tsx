import SEOHead from "@/components/SEOHead";
import ContactSection from "@/components/ContactSection";

const ContactPage = () => {
  return (
    <>
      <SEOHead
        title="Contact SnapIt Events | Get a Free Quote for Your Event"
        description="Contact SnapIt Events for professional event production services in Udupi, Mangalore, Bangalore, Kerala & Goa. Get a free quote for weddings, corporate events, and more."
        canonical="/contact"
      />

      <section className="pt-32 pb-16 bg-secondary/30 section-padding">
        <div className="container mx-auto text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Reach Out
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Contact <span className="text-gold-gradient">Us</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to create something extraordinary? Let's discuss your next event.
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
};

export default ContactPage;
