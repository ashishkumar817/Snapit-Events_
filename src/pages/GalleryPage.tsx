import SEOHead from "@/components/SEOHead";
import GallerySection from "@/components/GallerySection";

const GalleryPage = () => {
  return (
    <>
      <SEOHead
        title="Event Gallery | SnapIt Events – Weddings, Corporate Events & More"
        description="Browse our event gallery showcasing stunning weddings, corporate events, sangeet nights, receptions, and stage productions across Udupi, Mangalore, Bangalore, Kerala & Goa."
        canonical="/gallery"
      />

      <section className="pt-32 pb-16 bg-secondary/30 section-padding">
        <div className="container mx-auto text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Our Work
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Event <span className="text-gold-gradient">Gallery</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A glimpse of the extraordinary events we've produced across South India.
          </p>
        </div>
      </section>

      <GallerySection />
    </>
  );
};

export default GalleryPage;
