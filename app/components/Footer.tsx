
import Image from "next/image";

const Footer = () => {
  return (
    <div className="">
      <div className="lg:max-w-md max-w-sm  w-full mx-auto border-t border-white/10" aria-hidden="true" />
      <div className="justify-center font-thin text-gray-100 flex flex-col lg:flex-row gap-4 items-center lg:justify-between  py-6 px-4 lg:px-12">
        <p className="italiano-regular"> © {new Date().getFullYear()} Avery Lebene Korto</p>
        <div className="flex flex-row items-center gap-4">
          <a href="https://github.com/AveryLebene" target="_blank">
            <Image src="./svg/github.svg" alt="x" width={40} height={40} />
          </a>
          <a href="https://www.linkedin.com/in/avery-lebene-korto-046293253/" target="_blank">
            <Image
              src="./svg/linkedin.svg"
              alt="linkedin"
              width={40}
              height={40}
            />
          </a>
          <a href="mailto:averylebene@gmail.com" target="_blank">
            <Image src="./svg/email.svg" alt="email" width={40} height={40} />
          </a>
          <a href="https://wa.me/233268051515" target="_blank">
            {" "}
            <Image
              src="./svg/whatsapp.svg"
              alt="whatsapp"
              width={40}
              height={40}
            />{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
