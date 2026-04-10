"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { getFeaturedPosts } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedBlogs() {
  const featuredPosts = getFeaturedPosts();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div
          ref={headerRef}
          className="mb-14 flex flex-col items-start justify-between gap-4 opacity-0 sm:flex-row sm:items-center"
        >
          <div>
            <h2 className="mb-2 font-serif text-3xl font-bold md:text-4xl">
              Latest Articles
            </h2>
            <p className="text-muted-foreground">
              Curated insights on software development, artificial intelligence, and modern technology.
            </p>
          </div>

          <Button asChild variant="outline" className="gap-2 hover:scale-[1.02] transition hover:text-white white">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          {featuredPosts[0] && (
            <BlogCard
              post={featuredPosts[0]}
              variant="large"
            />
          )}

          <div className="flex grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.slice(1, 4).map((post, index) => (
              <div key={post.slug} className="h-full">
                <BlogCard post={post} index={index} />
              </div>
            ))}
          </div>

        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground/100">
          More articles coming soon - stay tuned!
        </p>

      </div>
    </section>
  );
}