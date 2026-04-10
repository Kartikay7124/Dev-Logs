"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Send, Github, Linkedin, Twitter, Mail, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Kartikay7124",
    username: "Kartikay Sharma",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/kartikaysharma07",
    username: "Kartikay Sharma",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/",
    username: "Kartikay Sharma",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@kartikay.dev",
    username: "kartikaywebdev@gmail.com",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      }

      // Info cards animation
      if (infoRef.current) {
        const cards = infoRef.current.querySelectorAll(".info-card");
        gsap.fromTo(
          cards,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <h1 className="animate-item mb-4 font-serif text-4xl font-bold text-foreground opacity-0 md:text-5xl">
            Get in Touch
          </h1>
          <p className="animate-item mx-auto max-w-2xl text-lg text-muted-foreground opacity-0">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div ref={formRef} className="opacity-0">
            <div className="rounded-2xl border border-border/60 bg-card p-8">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
                Send a Message
              </h2>

              {isSubmitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleChange}
                        className="border-border/60 transition-colors focus:border-primary/40"
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        className="border-border/60 transition-colors focus:border-primary/40"
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="subject">Subject</FieldLabel>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is this regarding?"
                        value={formState.subject}
                        onChange={handleChange}
                        className="border-border/60 transition-colors focus:border-primary/40"
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project or just say hi..."
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        className="border-border/60 transition-colors focus:border-primary/40"
                        required
                      />
                    </Field>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2 transition-transform duration-200 hover:scale-[1.01]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </FieldGroup>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6">
            {/* Location */}
            <div className="info-card rounded-2xl border border-border/60 bg-card p-8 opacity-0 transition-all duration-300 hover:border-primary/30">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                Location
              </h3>
              <p className="text-muted-foreground">
                Based in India, working globally with clients and teams across different time zones.
              </p>
            </div>

            {/* Social Links */}
            <div className="info-card rounded-2xl border border-border/60 bg-card p-8 opacity-0">
              <h3 className="mb-6 font-serif text-lg font-semibold text-foreground">
                Connect With Me
              </h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-lg border border-border/60 bg-background p-4 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/30 hover:scale-[1.01]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110">
                      <social.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground transition-colors group-hover:text-primary">
                        {social.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {social.username}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <div className="info-card rounded-2xl border border-primary/20 bg-primary/5 p-8 opacity-0">
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                Quick Response
              </h3>
              <p className="text-muted-foreground">
                I typically respond within 24-48 hours. For urgent inquiries, reach out on Twitter or LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
