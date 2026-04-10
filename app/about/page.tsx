"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Brain,
  Server,
  Palette,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: Code2,
    title: "Full Stack Development",
    technologies: ["React", "Next.js", "MongoDB", "Node.js", "SQL"],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    technologies: ["Python", "Java", "OpenAI", "LangChain", "Vector DBs"],
  },
  {
    icon: Server,
    title: "Backend Engineering",
    technologies: ["REST", "GraphQL", "Express.js", "Docker", "AWS"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    technologies: ["Figma", "Tailwind CSS", "Framer Motion", "Accessibility"],
  },
];

const socialLinks = [
  { href: "https://github.com/Kartikay7124", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/kartikaysharma07", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com/", icon: Twitter, label: "Twitter" },
  { href: "mailto:kartikaywebdev@gmail.com", icon: Mail, label: "Email" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsHeaderRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll(".hero-animate");
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
        );
      }

      // Skills header
      if (skillsHeaderRef.current) {
        gsap.fromTo(
          skillsHeaderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsHeaderRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Skills cards
      if (skillsRef.current) {
        const cards = skillsRef.current.querySelectorAll(".skill-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Portfolio Style */}
        <section ref={heroRef} className="mb-24">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3">
              <p className="hero-animate mb-4 text-sm font-medium uppercase tracking-wider text-primary opacity-0">
                About Me
              </p>
              <h1 className="hero-animate mb-6 font-serif text-4xl font-bold text-foreground opacity-0 md:text-5xl lg:text-6xl">
                Kartikay Sharma
              </h1>
              <p className="hero-animate mb-4 text-xl font-medium text-foreground/80 opacity-0 md:text-2xl">
                Full Stack Developer & AI Engineer
              </p>
              <p className="hero-animate mb-6 max-w-xl leading-relaxed text-muted-foreground opacity-0">
                I build scalable web applications and AI-powered solutions that
                solve real-world problems. I focus on clean architecture,
                performance, and creating user experiences that feel intuitive.
              </p>
              <p className="hero-animate mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground/80 opacity-0">
                Beyond coding, I write about technology, explore new ideas, and
                stay at the edge of AI and modern web development.
              </p>

              <div className="hero-animate flex flex-wrap items-center gap-4 opacity-0">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <a
                    href="https://kartikaysharma.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Full Portfolio
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary hover:scale-105"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-animate relative lg:col-span-2 opacity-0">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-accent/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-28 w-28 items-center justify-center rounded-full bg-primary/15 backdrop-blur-sm">
                      <span className="font-serif text-4xl font-bold text-primary">
                        KS
                      </span>
                    </div>
                    <p className="text-lg font-medium text-foreground">
                      Designer & Developer
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based in India
                    </p>
                  </div>
                </div>
                {/* Decorative elements with slight asymmetry */}
                <div className="absolute -right-3 -top-3 h-20 w-20 rounded-xl border border-primary/20 bg-primary/5" />
                <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-xl border border-accent/20 bg-accent/5" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <div ref={skillsHeaderRef} className="mb-12 opacity-0">
            <h2 className="mb-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Skills & Expertise
            </h2>
            <p className="max-w-xl text-muted-foreground">
              A comprehensive toolkit for building scalable, modern applications.
            </p>
          </div>

          <div
            ref={skillsRef}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className={`skill-card group rounded-xl border border-border/60 bg-card p-6 opacity-0 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${
                  index === 1 ? "lg:translate-y-3" : ""
                } ${index === 2 ? "lg:-translate-y-2" : ""}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <skill.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">
                  {skill.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="text-center opacity-0">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-10 md:p-16">
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Let&apos;s Work Together
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
              Interested in collaborating or have a project in mind? I&apos;d
              love to hear from you.
            </p>
            <Button
              asChild
              size="lg"
              className="gap-2 transition-transform duration-200 hover:scale-[1.02]"
            >
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
