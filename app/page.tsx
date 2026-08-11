import HeroSection from "./components/HeroSection";
import LatestProjects from "./components/LatestProjects";
import LatestBlogs from "./components/LatestBlogs";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <div className="flex items-center pb-24">
        <div className="h-px bg-green-200/60 w-10 mr-4"></div>
        <span className="text-green-200/80 font-gt-regular text-sm tracking-wider uppercase">
          Portfolio
        </span>
      </div>
      <LatestProjects />
      {/* <LatestBlogs /> */}
    </main>
  );
}
