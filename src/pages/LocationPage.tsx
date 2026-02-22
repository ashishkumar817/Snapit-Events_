import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { locationPages } from "@/data/locationPages";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = locationPages.find((p) => p.slug === slug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Page not found</p>
      </div>
    );
  }

  const otherCities = locationPages.filter((p) => p.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Event Production Services",
    provider: {
      "@type": "LocalBusiness",
      name: "SnapIt Events",
      telephone: "+91-8453846060",
      email: "snapiteventss@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Udupi",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": data.state === data.city ? "City" : "AdministrativeArea",
      name: data.city,
    },
    description: data.metaDescription,
  };

  return (
    <>
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        canonical={`/${data.slug}`}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary/30 section-padding">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-6">
            <MapPin size={14} />
            {data.city}, {data.state}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {data.h1.replace(data.city, "").trim()}{" "}
            <span className="text-gold-gradient">{data.city}</span>
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            {data.intro}
          </p>
        </div>
      </section>

      {/* Content sections */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl space-y-16">
          {data.sections.map((section, i) => (
            <article key={i}>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                {section.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Ready to Plan Your Event in{" "}
            <span className="text-gold-gradient">{data.city}</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact SnapIt Events today for a free consultation and customised quote for your upcoming event in {data.city}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-gold-gradient text-primary-foreground px-8 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity gold-glow"
            >
              {data.cta}
            </Link>
            <a
              href="tel:+918453846060"
              className="border border-border text-foreground px-8 py-4 rounded-sm text-sm font-semibold tracking-wider uppercase hover:border-primary hover:text-primary transition-colors"
            >
              Call +91 8453846060
            </a>
          </div>
        </div>
      </section>

      {/* Internal links to other cities */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">
            We Also Serve <span className="text-gold-gradient">Other Cities</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {otherCities.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="group flex items-center justify-between p-5 rounded-sm border border-border bg-card hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary" />
                  <div>
                    <p className="font-heading font-semibold group-hover:text-primary transition-colors">
                      {city.city}
                    </p>
                    <p className="text-xs text-muted-foreground">{city.h1}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationPage;
