import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";

export const metadata: Metadata = {
  title: "Avery Lebene Korto | Software Engineer",
  description: "A software developer based in Accra, Ghana",
  keywords: ["Avery Lebene Korto","Avery", "Avery Lebene", "Lebhie", "Korto", "Software Engineer", "Accra, Ghana", "Software Developer", "Software Engineering", "Software Development", "Software Architect", "Software Consultant", "Software Engineer", "Software Developer", "Software Engineering",],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Avery Lebene Korto | Software Engineer",
    description: "A software developer based in Accra, Ghana",
    url: "https://averylebenekor.to",
    siteName: "Avery Lebene Korto",
    images: [
      { url: "/images/avery-3.jpg" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "fASFua1gTfJrAshxdZbIlXAqjXe3GYfh4nnQY4dSzwU",
  },

  authors: [{ name: "Avery Lebene Korto", url: "https://averylebenekor.to" }],

  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-[#1E1E1E] text-white">
        <header
          className="fixed top-0 left-0 right-0 z-50"
          aria-label="Site header"
        >
          <Navbar />
        </header>
        <main className="min-h-screen pt-20 md:pt-24 pb-20 md:pb-0">
          <div>{children}</div>
          <footer>
            <Footer />
          </footer>
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
