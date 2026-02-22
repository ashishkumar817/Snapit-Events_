import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import aboutImg from "@/assets/about-image.webp";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div
        ref={ref}
        className={`container mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-start transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Image */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gold-gradient rounded-sm opacity-20 group-hover:opacity-30 transition-opacity blur-sm" />
          <img
            src={aboutImg}
            alt="SnapIt Events team planning a premium event in Udupi, Karnataka"
            className="relative w-full h-[400px] object-cover rounded-sm"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Turning Moments Into{" "}
            <span className="text-gold-gradient">Unforgettable Memories</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            At SnapIt Events, we believe every celebration tells a story. Our mission is simple — to
            transform your vision into extraordinary experiences that leave lasting impressions. From
            intimate gatherings to grand celebrations, we plan, design, and execute events with
            precision, creativity, and passion.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            With a team of dedicated event managers, we specialize in crafting seamless,
            stress-free events that reflect your style and personality. Every detail matters to us —
            from venue selection and décor to lighting, entertainment, and coordination.
          </p>

          {/* Who We Are */}
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-4">
            Who We <span className="text-gold-gradient">Are</span>
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            SnapIt Events is a full-service event management company committed to excellence. We bring
            together creativity, strategic planning, and flawless execution to deliver events that
            exceed expectations.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-2">
            We don't just organize events —
          </p>
          <ul className="text-muted-foreground leading-relaxed mb-6 space-y-1">
            <li>✨ We create experiences.</li>
            <li>✨ We build emotions.</li>
            <li>✨ We capture unforgettable moments.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our approach combines innovation with professionalism, ensuring that every event we manage
            is elegant, organized, and memorable.
          </p>

          {/* Why Choose Us */}
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-4">
            Why Choose <span className="text-gold-gradient">SnapIt Events?</span>
          </h3>
          <ul className="text-muted-foreground leading-relaxed space-y-1.5 mb-6">
            <li>✔ Experienced and creative team</li>
            <li>✔ Personalized event planning</li>
            <li>✔ Transparent pricing and professional execution</li>
            <li>✔ Strong vendor network</li>
            <li>✔ Commitment to quality and perfection</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed italic mb-8">
            We take pride in turning your ideas into reality — flawlessly and beautifully.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-sm hover:bg-primary/10 transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
