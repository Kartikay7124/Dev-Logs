import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read articles on web development, AI, automation, and modern technology. Tutorials, insights, and best practices for developers.",
  openGraph: {
    title: "Blog | Kartikay Sharma",
    description:
      "Read articles on web development, AI, automation, and modern technology. Tutorials, insights, and best practices for developers.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
