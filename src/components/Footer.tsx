import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="SnapIt Events Logo" className="h-10 w-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold leading-tight">
                  <span className="text-foreground">SnapIt</span>{" "}
                  <span className="text-gold-gradient">Events</span>
                </span>
                <span className="text-[10px] tracking-[0.15em] text-muted-foreground">
                  Snap | Celebrate | Repeat
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium event production and management services across Udupi, Mangalore, Bangalore, Kerala &amp; Goa.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              {["Wedding Planning", "Corporate Events", "Birthday Parties", "Engagement & Anniversaries", "Stage & Sound", "Photography"].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:+918453846060" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={14} /> +91 8453846060
                </a>
              </li>
              <li>
                <a href="mailto:snapiteventss@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={14} /> snapiteventss@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} /> Shankarpura, Udupi, Karnataka 574115, India
                </span>
              </li>
            </ul>
            <h4 className="font-heading font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/snapit_events?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Footer Text */}
        <div className="border-t border-border mt-12 pt-8">
          <p className="text-sm text-muted-foreground text-center mb-4 font-medium">
            SnapIt Events – Trusted Event Production Services in Udupi, Mangalore, Bangalore, Kerala &amp; Goa.
          </p>
          <nav className="flex flex-wrap justify-center gap-3 mb-6" aria-label="Service area links">
            {[
              { label: "Udupi", href: "/event-production-udupi" },
              { label: "Mangalore", href: "/event-production-mangalore" },
              { label: "Bangalore", href: "/event-production-bangalore" },
              { label: "Kerala", href: "/event-production-kerala" },
              { label: "Goa", href: "/event-production-goa" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Events in {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <a href="tel:+918453846060" className="hover:text-primary transition-colors">+91 8453846060</a>
              <span>|</span>
              <a href="mailto:snapiteventss@gmail.com" className="hover:text-primary transition-colors">snapiteventss@gmail.com</a>
            </div>
            <p>© 2026 SnapIt Events. All Rights Reserved.</p>
          </div>
          <p className="text-xs text-primary text-center mt-4">
            Designed & Developed by{" "}
            <a
            href="https://www.instagram.com/_ash_kumar_21_?igsh=bHphcnN3YWExdzF3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-gold transition-colors duration-300 font-medium"
          >
            Ashish Kumar
          </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
