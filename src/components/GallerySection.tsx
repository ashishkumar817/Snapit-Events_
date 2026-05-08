import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/lib/supabase";

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

type Category = string;
type LightingSubCategory = "All Lighting" | "Entrance" | "Roof";

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  subCategory?: string; // only for Lighting
}

export const staticImages: GalleryImage[] = [
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
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("All Lighting");
  const { ref, isVisible } = useScrollAnimation();

  // Dynamic Images State
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          const mapped = data.map((img: any) => ({
            src: img.url,
            alt: img.altText,
            category: img.category,
            subCategory: img.subCategory
          }));
          setDbImages(mapped);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Merge DB images with static images so both are always visible
  const allImages = [...dbImages, ...staticImages];

  // Extract dynamic categories
  const dynamicCategories = Array.from(new Set(allImages.map(img => img.category)));
  const displayCategories = ["All", ...dynamicCategories];

  // 🔥 Filtering Logic
  const filtered =
    activeCategory === "All"
      ? allImages
      : activeCategory === "Lighting"
      ? activeSubCategory === "All Lighting"
        ? allImages.filter((img) => img.category === "Lighting")
        : allImages.filter(
            (img) =>
              img.category === "Lighting" &&
              img.subCategory === activeSubCategory
          )
      : allImages.filter((img) => img.category === activeCategory);

  const displayedImages = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section id="gallery" className="section-padding bg-secondary/30" ref={ref}>
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
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveSubCategory("All Lighting"); // reset when switching
                setVisibleCount(12); // reset pagination
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
                onClick={() => {
                  setActiveSubCategory(sub);
                  setVisibleCount(12); // reset pagination
                }}
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div
              className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {displayedImages.map((img, i) => (
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

            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No images found in this category.
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="px-8 py-3 rounded-full bg-primary/10 text-primary font-medium border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Load More Images
                </button>
              </div>
            )}
          </>
        )}
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
            src={displayedImages[lightbox].src}
            alt={displayedImages[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-fade-in"
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
