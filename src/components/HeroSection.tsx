import { Helmet } from "react-helmet-async";
import heroBg from "@/assets/hero-bg.webp";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Helmet>
        <link rel="preload" as="image" href={heroBg} fetchPriority="high" />
      </Helmet>
      {/* Hero background as img for LCP discoverability */}
      <img
        src={heroBg}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-white/80 font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm mb-4 md:mb-6 animate-fade-up">
          Premium Event Production
        </p>
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-4 md:mb-6 animate-fade-up-delay-1 text-white">
          Professional Event Production Services in{" "}
          <span className="text-gold-gradient">Udupi &amp; Across Karnataka</span>
        </h1>
        <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-8 md:mb-10 animate-fade-up-delay-2">
          Serving Udupi, Mangalore, Bangalore, Kerala &amp; Goa with premium event production and management solutions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-2">
          <button
            onClick={() => scrollTo("#contact")}
            className="bg-gold-gradient text-white px-8 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity gold-glow"
          >
            Book Your Event
          </button>
          <button
            onClick={() => scrollTo("#services")}
            className="border border-white/40 text-white px-8 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase hover:bg-white/10 transition-colors"
          >
            View Our Services
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-fade-in" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
