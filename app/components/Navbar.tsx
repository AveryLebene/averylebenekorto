"use client";
import AL from "../../public/images/AL.svg";
import AV from "../../public/images/AV.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const linkBase = " flex justify-center items-center rounded-full px-3 transition-all duration-400 hover:border-green-200 hover:border hover:pointer";
  const activeStyle = "border-green-200 border";
  const toggleMenu = (): any => {
    setIsOpen(!isOpen);
    // if (isOpen){
    //     const toggleButton = document.getElementById("toggleButton")
    //     if (toggleButton) {
    //         toggleButton.style.display = 'none';
    //     }else {
    //         const toggleButton = document.getElementById('toggleButton');
    //         if (toggleButton) {
    //             toggleButton.style.display = 'block';
    //         }
    //     }
    // }
  };
  return (
    <div className="bg-[#1e1e1e]/20 w-full xl:px-8 px-4 py-4 shadow-sm backdrop-blur">
      <nav className="flex items-center relative justify-between">
        <div className="bg-white rounded-full ">
          <Link href="/">
            {" "}
            <Image
              src={AL}
              alt="portrait picture"
              className=" "
              width={40}
              height={40}
            />
          </Link>
        </div>

        <div className="">
          <div className="md:hidden  flex items-center gap-2">
            <button className="" onClick={toggleMenu} id="#toggleButton">
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:block bg-[#1a1a1a] rounded-full px-4 py-1 border">
            <ul className="flex gap-10 cursor-pointer justify-center items-center">
              <li className={`${linkBase} ${pathname === "/" ? activeStyle : ""}`}>
                <Link href="/" className="flex justify-center items-center">Home</Link>
              </li>
              <li className={` ${linkBase} ${pathname === "/projects" ? activeStyle : ""}`}>
                <Link href="/projects" className="flex justify-center items-center">Projects</Link>
              </li>
              <li className={` ${linkBase} ${pathname === "/about" ? activeStyle : ""}`}>
                <Link href="/about" className="flex justify-center items-center">About</Link>
              </li>
              <li className={` ${linkBase} ${pathname === "/contact" ? activeStyle : ""}`}>
                <Link href="/contact" className="flex justify-center items-center">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="">
          <div className="flex ">
            {/*<svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">*/}
            {/*    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />*/}
            {/*</svg>*/}

            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
