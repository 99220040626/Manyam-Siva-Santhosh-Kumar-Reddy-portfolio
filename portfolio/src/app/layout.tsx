import type { Metadata, Viewport } from "next";
import "./globals.css";
import { me } from "@/data/resume";
import Effects from "@/components/animations/Effects";

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = `${me.name} is a ${me.title}. Projects in Java, Spring Boot, React and TensorFlow. Open to entry-level software development roles.`;
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: `${me.name} | ${me.title}`, template: `%s | ${me.short}` },
  description, keywords: ["Java", "Spring Boot", "React", "Python", "TensorFlow", "Full-Stack Developer", me.name],
  authors: [{ name: me.name }], icons: { icon: "/icon.svg" },
  openGraph: { title: `${me.name} | ${me.title}`, description, url, type: "website", siteName: `${me.short} Portfolio` },
  twitter: { card: "summary", title: `${me.name} | ${me.title}`, description },
};
export const viewport: Viewport = { themeColor: "#05060a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { "@context": "https://schema.org", "@type": "Person", name: me.name, jobTitle: me.title, email: me.email, url, sameAs: [me.links.github, me.links.linkedin, me.links.leetcode] };
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <Effects />
        {children}
      </body>
    </html>
  );
}
