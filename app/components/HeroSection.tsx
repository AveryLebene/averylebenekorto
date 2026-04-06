"use client";

import { motion, useReducedMotion } from "framer-motion";
import avery from "../../public/images/avery-3.jpg";
import { pageContentStagger } from "@/lib/motion";
import { MotionNextImage } from "./MotionNextImage";

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const v = pageContentStagger(reduceMotion);

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <motion.div
        className=" mx-auto flex xl:gap-12 xl:px-0 justify-between lg:flex-row flex-col-reverse px-4 gap-4  lg:px-8  pt-14  pb-20"
        variants={v.section}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="lg:w-1/2  xl:pl-12  flex flex-col  justify-between py-12"
          variants={v.section}
        >
          <div className="lg:flex-1">
            <motion.h2
              variants={v.block}
              className=" md:text-4xl text-3xl lg:leading-[5rem] text-center md:text-start italianno-regular"
            >
              Hi, I&apos;m Avery Lebene Korto,
            </motion.h2>
            <motion.p
              variants={v.block}
              className="text-center font-thin text-gray-300 lg:text-xl md:text-start max-w-xl pt-4 leading-7"
            >
              <span>
                I'm a Frontend Engineer who transforms ideas into seamless web
                experiences. With 3+ years working alongside design and product
                teams, I thrive where creativity meets code.
              </span>
            </motion.p>
          </div>

          <motion.div
            variants={v.block}
            className="flex lg:justify-start justify-center lg:mb-10"
          >
            <a
              href="/cv.pdf"
              download="Avery-Lebene-Korto-Resume.pdf"
              className="inline-flex bg-green-200 px-6 py-3 font-bold rounded-full mt-20 text-black transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-200"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>
        <motion.div variants={v.block} className="sm:mb-16 mb-6 lg:mb-0">
          <div className=" text-center ">
            <div className="mx-auto  sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]  lg:w-[500px] lg:h-[500px] xl-h-[600px] xl-w-[600px] rounded-full overflow-hidden shrink-0">
              <MotionNextImage
                src={avery}
                alt="portrait picture"
                placeholder="empty"
                priority
                className="mx-auto w-[600px] h-[600px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]  lg:w-[500px] lg:h-[500px] xl-h-[600px] xl-w-[600px] rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
