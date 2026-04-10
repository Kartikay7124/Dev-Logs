"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Zap, Cpu, Cloud, Lock, Boxes } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trendingTopics = [
  {
    icon: Zap,
    title: "AI-Powered Development",
    description:
      "Enhancing development workflows with AI assistants, copilots, and intelligent tooling.",
    trend: "+45%",
  },
  {
    icon: Cloud,
    title: "Edge Computing",
    description:
      "Delivering applications closer to users for improved performance and reduced latency.",
    trend: "+38%",
  },
  {
    icon: Lock,
    title: "Zero Trust Security",
    description:
      "Implementing modern security models for distributed and cloud-native systems.",
    trend: "+32%",
  },
  {
    icon: Boxes,
    title: "Microservices 2.0",
    description:
      "Evolving architectures with event-driven systems and service mesh patterns.",
    trend: "+28%",
  },
  {
    icon: Cpu,
    title: "WebAssembly",
    description:
      "Running high-performance, near-native code directly in the browser environment.",
    trend: "+25%",
  },
];

export function TrendingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".trending-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-y border-border/40 bg-secondary/20 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mb-14 flex items-center gap-3 opacity-0"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20">
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Trending in Tech
            </h2>
            <p className="text-sm text-muted-foreground">
              Hot topics in Technology
            </p>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.title}
              className={`trending-card group rounded-xl border border-border/60 bg-card p-5 opacity-0 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 ${
                index === 2 ? "lg:translate-y-2" : ""
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                  <topic.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                  {topic.trend}
                </span>
              </div>
              <h3 className="mb-1.5 font-serif font-semibold text-foreground transition-colors group-hover:text-accent">
                {topic.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
