"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Code,
  Workflow,
  Server,
  Palette,
  LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, LucideIcon> = {
  AI: Brain,
  "Web Development": Code,
  Automation: Workflow,
  Backend: Server,
  "UI/UX": Palette,
};

const categoryDescriptions: Record<string, string> = {
  AI: "Machine learning, neural networks, and intelligent systems",
  "Web Development": "Frontend, React, Next.js, and modern web technologies",
  Automation: "Workflows, CI/CD, and process optimization",
  Backend: "APIs, databases, and server architecture",
  "UI/UX": "Design systems, accessibility, and user experience",
};

export function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".category-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
        <div ref={headerRef} className="mb-14 text-center opacity-0">
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Explore Topics
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Topics I write about — pick what interests you
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {categories.map((category, index) => {
            const Icon = categoryIcons[category] || Code;
            return (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
                className={`category-card group flex flex-col items-center rounded-xl border border-border/60 bg-card p-6 text-center opacity-0 transition-all duration-300 hover:border-primary/40 hover:bg-secondary/30 hover:shadow-lg hover:shadow-primary/5 ${
                  index === 1 ? "lg:translate-y-3" : ""
                } ${index === 3 ? "lg:-translate-y-2" : ""}`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-serif font-semibold text-foreground transition-colors group-hover:text-primary">
                  {category}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {categoryDescriptions[category]}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
