import { useState } from "react";
import { X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import gallerySangeet1 from "@/assets/gallery-sangeet-1.webp";
import gallerySangeet2 from "@/assets/gallery-sangeet-2.webp";
import galleryWedding from "@/assets/gallery-wedding.webp";
import galleryWedding2 from "@/assets/gallery-wedding-2.webp";
import galleryWedding3 from "@/assets/gallery-wedding-3.webp";
import galleryWedding4 from "@/assets/gallery-wedding-4.webp";
import galleryReception1 from "@/assets/gallery-reception-1.jpg";
import galleryCorporate from "@/assets/gallery-corporate.webp";
import galleryCorporate2 from "@/assets/gallery-corporate-2.webp";
import galleryCorporate3 from "@/assets/gallery-corporate-3.webp";
import galleryCorporate4 from "@/assets/gallery-corporate-4.webp";
import galleryDecor2 from "@/assets/gallery-decor-2.jpg";
import galleryEngagement from "@/assets/gallery-engagement.webp";
import galleryLighting1 from "@/assets/galleryLighting1.webp";
import galleryLighting2 from "@/assets/galleryLighting2.webp";
import galleryLighting3 from "@/assets/galleryLighting3.webp";
import galleryLighting4 from "@/assets/galleryLighting4.webp";
import galleryLighting5 from "@/assets/galleryLighting5.webp";
import galleryLighting6 from "@/assets/galleryLighting6.webp";
import galleryLighting7 from "@/assets/galleryLighting7.webp";
import galleryLighting8 from "@/assets/galleryLighting8.webp";
import galleryLighting9 from "@/assets/galleryLighting9.webp";
import galleryLighting10 from "@/assets/galleryLighting10.webp";
import galleryLighting11 from "@/assets/galleryLighting11.webp";
import galleryLighting12 from "@/assets/galleryLighting12.webp";

const categories = ["All", "Sangeet", "Reception", "Wedding", "Lighting", "Corporate"] as const;
type Category = (typeof categories)[number];
type LightingSubCategory = "All Lighting" | "Entrance" | "Roof";


interface GalleryImage {
  src: string;
  alt: string;
  category: Exclude<Category, "All">;
  subCategory?: "Entrance" | "Roof"; // only for Lighting
}

const images: GalleryImage[] = [
  { src: gallerySangeet1, alt: "Sangeet night stage production with lighting in Mangalore", category: "Sangeet" },
  { src: galleryWedding2, alt: "Grand wedding mandap event production in Goa beach", category: "Wedding" },
  { src: galleryWedding4, alt: "wedding event management", category: "Wedding" },
  { src: galleryReception1, alt: "Luxury reception stage setup in Bangalore", category: "Reception" },
  { src: galleryWedding3, alt: "Outdoor wedding event production in Kerala", category: "Wedding" },
  { src: galleryDecor2, alt: "Premium floral décor for events in Udupi", category: "Reception" },
  { src: gallerySangeet2, alt: "Vibrant sangeet stage production in Mangalore", category: "Sangeet" },
  { src: galleryCorporate2, alt: "Corporate event stage and lighting in Bangalore", category: "Corporate" },
  { src: galleryCorporate3, alt: "Corporate event stage and lighting in Smart Bazar, Udupi", category: "Corporate" },
  { src: galleryCorporate4, alt: "Corporate event stage and lighting ", category: "Corporate" },
  { src: galleryWedding, alt: "Elegant wedding ceremony production in Udupi", category: "Wedding" },
  { src: galleryCorporate, alt: "Premium corporate event production in Bangalore", category: "Corporate" },
  
  {
    src: galleryLighting2,
    alt: "Entrance lighting setup",
    category: "Lighting",
    subCategory: "Entrance",
  },
  
  {
    src: galleryLighting3,
    alt: "Luxury lighting setup",
    category: "Lighting",
    subCategory: "Entrance",
  },
  {
    src: galleryLighting6,
    alt: "Luxury entrance lighting setup",
    category: "Lighting",
    subCategory: "Entrance",
  },
  {
    src: galleryLighting5,
    alt: "entrance lighting setup",
    category: "Lighting",
    subCategory: "Entrance",
  },
  {
    src: galleryLighting7,
    alt: "beautiful filled entrance lighting setup",
    category: "Lighting",
    subCategory: "Entrance",
  },
  {
    src: galleryLighting9,
    alt: "flowered entrance lighting setup",
    category: "Lighting",
    subCategory: "Entrance",
  },
  {
    src: galleryLighting12,
    alt: "LED strip triangular entrance lighting setup",
    category: "Lighting",
    subCategory: "Entrance",
  },
  {
    src: galleryLighting4,
    alt: "LED strip triangular entrance lighting setup in udupi",
    category: "Lighting",
    subCategory: "Entrance",
  },


  {
    src: galleryLighting1,
    alt: "Roof lighting design",
    category: "Lighting",
    subCategory: "Roof",
  },
  {
    src: galleryLighting8,
    alt: "Roof lighting lamp design",
    category: "Lighting",
    subCategory: "Roof",
  },
  {
    src: galleryLighting10,
    alt: "Beautiful Roof lighting design",
    category: "Lighting",
    subCategory: "Roof",
  },
  {
    src: galleryLighting11,
    alt: "Roof lighting design in udupi",
    category: "Lighting",
    subCategory: "Roof",
  },
  { src: galleryEngagement, alt: "Engagement celebration event planning in Goa", category: "Reception" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeSubCategory, setActiveSubCategory] =
    useState<LightingSubCategory>("All Lighting");
  const { ref, isVisible } = useScrollAnimation();

  // 🔥 Filtering Logic
  const filtered =
    activeCategory === "All"
      ? images
      : activeCategory === "Lighting"
      ? activeSubCategory === "All Lighting"
        ? images.filter((img) => img.category === "Lighting")
        : images.filter(
            (img) =>
              img.category === "Lighting" &&
              img.subCategory === activeSubCategory
          )
      : images.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Our Events <span className="text-gold-gradient">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            A glimpse of moments we've crafted
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveSubCategory("All Lighting"); // reset when switching
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

           {/* Lighting Subcategory Buttons */}
        {activeCategory === "Lighting" && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["All Lighting", "Entrance", "Roof"].map((sub) => (
              <button
                key={sub}
                onClick={() =>
                  setActiveSubCategory(sub as LightingSubCategory)
                }
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 ${
                  activeSubCategory === sub
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}


        {/* Gallery Grid */}
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filtered.map((img, i) => (
            <button
              key={`${activeCategory}-${i}`}
              onClick={() => setLightbox(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-3 left-0 right-0 text-center text-sm text-foreground/90 font-medium tracking-wide lowercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {img.category.toLowerCase()}
                {img.subCategory && ` • ${img.subCategory.toLowerCase()}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-fade-in"
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
