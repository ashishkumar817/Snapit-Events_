import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setError("");

    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xojkqbbb", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        setError("");
        form.reset();
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Let's Plan Your <span className="text-gold-gradient">Dream Event</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                Tell Us About Your Event
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Describe your dream event..."
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold-gradient text-primary-foreground py-4 rounded-sm text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitted ? "✅ Message Sent Successfully!" : submitting ? "Sending..." : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Contact info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a href="tel:+918453846060" className="font-medium hover:text-primary transition-colors">+91 8453846060</a><a> </a>

                  <a href="tel:+918197956923" className="font-medium hover:text-primary transition-colors">+91 8197956923</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a href="mailto:snapiteventss@gmail.com" className="font-medium hover:text-primary transition-colors">snapiteventss@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">Church Complex, Shankarpura, Udupi, Karnataka 574115, India</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <p className="text-sm text-muted-foreground mb-3">
Find SnapIt Events in Udupi, Karnataka. Visit us for professional event production and lighting services.
</p>
              <div className="w-full h-64 bg-card border border-border rounded-sm overflow-hidden">
  <iframe
    title="SnapIt Events Location"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d970.8497349255742!2d74.768906!3d13.262992!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcb175a0dbe445%3A0xae80cbec9dd888d!2sMAX%20SOUND%20N%20LIGHTS!5e0!3m2!1sen!2sin!4v1772867571278!5m2!1sen!2sin"
    className="w-full h-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  ></iframe>
</div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
