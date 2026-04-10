"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
}

export function useGsapReveal<T extends HTMLElement>(
  options: UseGsapAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      start = "top 85%",
      duration = 0.8,
      delay = 0,
      ease = "power3.out",
      y = 40,
      opacity = 0,
    } = options;

    gsap.set(element, { opacity, y });

    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) trigger.kill();
      });
    };
  }, [options]);

  return ref;
}

export function useGsapStagger<T extends HTMLElement>(
  selector: string,
  options: UseGsapAnimationOptions = {}
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (!elements.length) return;

    const {
      start = "top 85%",
      stagger = 0.1,
      duration = 0.6,
      ease = "power3.out",
      y = 30,
    } = options;

    gsap.set(elements, { opacity: 0, y });

    const animation = gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) trigger.kill();
      });
    };
  }, [selector, options]);

  return containerRef;
}

export function useGsapScale<T extends HTMLElement>(
  options: UseGsapAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      start = "top 85%",
      duration = 0.8,
      ease = "power3.out",
      scale = 0.95,
    } = options;

    gsap.set(element, { opacity: 0, scale });

    const animation = gsap.to(element, {
      opacity: 1,
      scale: 1,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) trigger.kill();
      });
    };
  }, [options]);

  return ref;
}
