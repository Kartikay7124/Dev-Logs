import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kartikay Sharma. Have a project in mind or just want to say hello? Reach out through the contact form or connect on social media.",
  openGraph: {
    title: "Contact | Kartikay Sharma",
    description:
      "Get in touch with Kartikay Sharma. Have a project in mind or just want to say hello? Reach out through the contact form or connect on social media.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
