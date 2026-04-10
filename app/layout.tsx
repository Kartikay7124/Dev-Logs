import type { Metadata, Viewport } from "next";
import { Poppins, JetBrains_Mono, Space_Grotesk} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import favicon from "/public/favicon.png";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Dev Logs By Kartikay",
    template: "%s | Kartikay Sharma",
  },
  description:
    "Personal tech blog by Kartikay Sharma. Building scalable web apps and AI-powered solutions. Insights on web development, AI, automation, and modern technology.",
  keywords: [
    "Full Stack Developer",
    "AI Engineer",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Machine Learning",
    "Blog",
  ],
  authors: [{ name: "Kartikay Sharma" }],
  creator: "Kartikay Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devlogsbyks",
    siteName: "Kartikay Sharma",
    title: "Kartikay Sharma | Full Stack Developer & AI Engineer",
    description:
      "Personal tech blog by Kartikay Sharma. Building scalable web apps and AI-powered solutions.",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Kartikay Sharma - Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartikay Sharma | Full Stack Developer & AI Engineer",
    description:
      "Personal tech blog by Kartikay Sharma. Building scalable web apps and AI-powered solutions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} ${jetbrainsMono.variable} antialiased`}
      >
        <ScrollProgress />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
