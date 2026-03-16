import Image from "next/image";
import image from "../../public/images/image.jpg";
import AV from "../../public/images/AV.png";
import ave_round from "../../public/images/ave_round.svg";

// import avery from "../../public/images/avery.png"
import img from "../../public/images/img.png";
import avery from "../../public/images/avery-3.jpg";
import ave2 from "../../public/images/ave-2.jpg";

const HeroSection = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className=" mx-auto flex xl:gap-12 xl:px-0 justify-between lg:flex-row flex-col-reverse px-4 gap-4  lg:px-8  pt-14  pb-20">
        <div className="lg:w-1/2  xl:pl-12  flex flex-col  justify-between py-12">
          <div className="lg:flex-1">
            <h2 className=" md:text-4xl text-3xl lg:leading-[5rem] text-center md:text-start italianno-regular">
              Hi, I&apos;m Avery Lebene Korto,
            </h2>
            <p className="text-center font-thin text-gray-300 lg:text-xl md:text-start max-w-xl pt-4 leading-7">
              <span>
           
                a web developer building clean, idea-driven digital
                products. I am interested in creative tools, music tech, and thoughtful UI.
              </span>
        
            </p>
          </div>

          <div className="flex lg:justify-start justify-center lg:mb-10">
            <button className=" bg-green-200 px-6 py-3 font-bold rounded-full mt-20 text-black">
              Download Resume
            </button>
          </div>
        </div>
        <div className="sm:mb-16 mb-6 lg:mb-0">
          <div className=" text-center ">
          <div className="mx-auto  sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]  lg:w-[500px] lg:h-[500px] xl-h-[600px] xl-w-[600px] rounded-full overflow-hidden shrink-0">

            <Image
              src={avery}
              alt="portrait picture"
              priority={true}
              placeholder="empty"
              className="mx-auto w-[600px] h-[600px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]  lg:w-[500px] lg:h-[500px] xl-h-[600px] xl-w-[600px] rounded-full object-cover"
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
