import { HeroSection } from "@/components/hero-section";
import { FeaturedBlogs } from "@/components/featured-blogs";
import { CategoriesSection } from "@/components/categories-section";
import { TrendingSection } from "@/components/trending-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="section-divider pt-8" />
      <FeaturedBlogs />
      <div className="section-divider pt-8" />
      <CategoriesSection />
      <TrendingSection />
    </>
  );
}
