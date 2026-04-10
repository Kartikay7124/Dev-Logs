"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          statsRef.current?.children ? Array.from(statsRef.current.children) : [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pb-24 pt-32 md:pb-36 md:pt-44"
    >
      {/* Background Glow - warmer yellow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[900px] w-[1400px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />
        {/* <div className="absolute top-20 left-1/4 h-[600px] w-[300px] rounded-full bg-accent/10 blur-[80px]" /> */}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          <h1
            ref={headingRef}
            className="mb-6 max-w-4xl text-balance font-serif text-4xl font-bold tracking-tight text-foreground opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-primary">Kartikay Sharma</span>
          </h1>

          <p
            ref={subtitleRef}
            className="mb-5 text-xl font-medium text-foreground/80 opacity-0 md:text-2xl"
          >
            Full Stack Developer & AI Engineer
          </p>

          <p
            ref={descRef}
            className="mb-12 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground opacity-0 md:text-lg"
          >
            I build scalable web applications and AI-powered solutions, focusing on clean code, modern architecture, and delivering exceptional user experiences.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col gap-4 opacity-0 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="gap-2 transition-transform duration-200 hover:scale-[1.02]"
            >
              <Link href="/blog">
                Read Blogs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="transition-transform duration-200 hover:scale-[1.02] text-white hover:text-white"
            >
              <Link href="/about">View Projects</Link>
            </Button>
          </div>
        </div>

        {/* Stats - slightly asymmetric spacing */}
        <div
          ref={statsRef}
          className="mx-auto mt-24 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-10"
        >
          {[
            { label: "Blog Posts", value: "10+" },
            { label: "Projects", value: "30+" },
            { label: "Years Exp", value: "2+" },
            { label: "Tech Stack", value: "20+" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "text-center",
                i === 1 && "md:translate-y-2",
                i === 2 && "md:-translate-y-1"
              )}
            >
              <p className="mb-1.5 font-serif text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
