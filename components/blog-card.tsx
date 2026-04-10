"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, type BlogPost } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
  variant?: "default" | "large" | "compact";
}

export function BlogCard({
  post,
  index = 0,
  featured = false,
  variant = "default",
}: BlogCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { opacity: 0, y: 30 });

    const animation = gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      animation.kill();
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [index]);

  const isLarge = variant === "large" || featured;

  return (
    <article ref={cardRef} className="group opacity-0">
      <Link href={`/blog/${post.slug}`}>
        <div
          className={`overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 ${
            isLarge ? "md:flex md:gap-0" : ""
          }`}
        >
          <div
            className={`relative overflow-hidden ${
              isLarge ? "md:w-[55%]" : "aspect-[16/10]"
            }`}
          >
            <div className={isLarge ? "aspect-[4/3] md:aspect-auto md:h-full" : "h-full"}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <Badge
              variant="secondary"
              className="absolute left-4 top-4 bg-primary/90 text-primary-foreground backdrop-blur-sm"
            >
              {post.category}
            </Badge>
          </div>

          <div
            className={`p-5 ${
              isLarge ? "md:flex md:w-[45%] md:flex-col md:justify-center md:p-8" : ""
            }`}
          >
            <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime}
              </span>
            </div>

            <h3
              className={`mb-3 font-serif font-semibold text-foreground transition-colors duration-200 group-hover:text-primary ${
                isLarge ? "text-xl md:text-2xl" : "text-lg"
              }`}
            >
              {post.title}
            </h3>

            <p
              className={`mb-4 text-muted-foreground ${
                isLarge ? "line-clamp-3" : "line-clamp-2"
              } text-sm leading-relaxed`}
            >
              {post.description}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <span className="animated-underline">Read Article</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
