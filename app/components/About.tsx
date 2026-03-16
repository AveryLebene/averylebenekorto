import Image from "next/image";
const About = () => {
  return (
    <div className="lg:p-12  lg:px-8 px-4">
      <div className="flex justify-center items-center lg:px-12   max-width">
        <div className="lg:max-w-7xl w-full lg:px-24 xl:px-64  text-gray-300">
          <div className="flex justify-center items-center mb-12">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden shrink-0">
              <Image
                src="/images/avery-3.jpg"
                alt="Avery Lebene Korto"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="leading-loose mb-4 text-lg font-thin">
            I craft digital experiences that feel effortless. Frontend
            development is my playground, where I shape intuitive interfaces,
            but I also dive deep into full-stack architecture to turn bold ideas
            into real products.
          </p>
          <p className="leading-loose mb-4 text-lg font-thin">
            I thrive at the intersection of strategy and execution — planning
            systems, writing code, and seeing projects through from concept to
            launch. Every line I write and every interface I design is guided by
            clarity, purpose, and the user in mind.
          </p>
          <p className="leading-loose mb-4 text-lg font-thin">
            {" "}
            Outside the code, I explore new technologies, experiment with ideas,
            and share insights along the way. For me, building great products is
            about blending technical skill, thoughtful design, and human-focused
            problem solving, clear thinking and sometimes stepping back to see
            the bigger picture.
          </p>

          <p className="leading-loose mb-4 text-lg font-thin">
            {" "}
            When I&apos;m not working, I&apos;m usually out touching grass, often out
            djing or dance kizomba or learning new things.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
