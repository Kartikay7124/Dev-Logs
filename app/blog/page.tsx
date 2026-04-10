"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts, categories } from "@/lib/blog";
import { useSearchParams } from "next/navigation";

export default function BlogPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory
  );

  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const allPosts = getAllPosts();

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll(".animate-item");
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }

      // Filters animation
      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-14 text-center">
          <h1 className="animate-item mb-4 font-serif text-4xl font-bold text-foreground opacity-0 md:text-5xl">
            Blog
          </h1>
          <p className="animate-item mx-auto max-w-2xl text-lg text-muted-foreground opacity-0">
            Thoughts, tutorials, and insights on web development, AI, and modern technology
          </p>
        </div>

        {/* Search and Filters */}
        <div ref={filtersRef} className="mb-12 space-y-6 opacity-0">
          {/* Search Bar */}
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 border-border/60 pl-12 text-base transition-colors focus:border-primary/40"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="mr-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter:</span>
            </div>
            <Badge
              variant={selectedCategory === "" ? "default" : "outline"}
              className="cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => setSelectedCategory("")}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer transition-all duration-200 hover:scale-105"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? "" : category
                  )
                }
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-8 text-sm text-muted-foreground">
          Showing {filteredPosts.length}{" "}
          {filteredPosts.length === 1 ? "article" : "articles"}
          {selectedCategory && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>

        {/* Blog Grid - Asymmetric layout */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <div
                key={post.slug}
                className="h-full"
              >
                <BlogCard
                  post={post}
                  index={index}
                  variant={
                    "default"
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              No articles found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
              }}
              className="mt-4 text-primary transition-colors hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
