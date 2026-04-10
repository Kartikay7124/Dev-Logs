import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Kartikay Sharma - Full Stack Developer & AI Engineer with 5+ years of experience building scalable web applications and AI-powered solutions.",
  openGraph: {
    title: "About | Kartikay Sharma",
    description:
      "Learn more about Kartikay Sharma - Full Stack Developer & AI Engineer with 5+ years of experience building scalable web applications and AI-powered solutions.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
