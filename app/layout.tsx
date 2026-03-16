
import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";


export const metadata: Metadata = {
  title: "Avery Lebene Korto",
  description: "A brief introduction to me",
  icons: {
    icon: "/avery.ico",
  },

  authors: [{ name: "Avery Lebene Korto", url: "https://averylebene.com" }],
  creator: "Avery Lebene Korto",
  publisher: "Avery Lebene Korto",
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({

  children,
}: {
  children: React.ReactNode;
})
{
 
  return (
    <html lang="en">
      <body className=" bg-[#1E1E1E] text-white">
        <header className="fixed top-0 left-0 right-0 z-50" aria-label="Site header">
          <Navbar />
        </header>
        <main className="min-h-screen animate-page-in pt-20 md:pt-24 pb-20 md:pb-0">
          <div>
            {children}
          </div>
          <footer>
            <Footer />
          </footer>
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
