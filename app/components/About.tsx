import { MotionNextImage } from "./MotionNextImage";

const About = () => {
  return (
    <div className="lg:p-12  lg:px-8 px-4">
      <div className="flex justify-center items-center lg:px-12   max-width">
        <div className="lg:max-w-7xl w-full lg:px-24 xl:px-64  text-gray-300">
          <div className="flex justify-center items-center mb-12">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden shrink-0">
              <MotionNextImage
                src="/images/avery-3.jpg"
                alt="Avery Lebene Korto"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="leading-loose mb-4 text-lg font-thin">
  I design and build digital experiences that feel simple, intuitive, and
  effortless to use. While frontend development is where I bring interfaces to
  life, I also work across the stack to transform ideas into fully functional
  products.
</p>

<p className="leading-loose mb-4 text-lg font-thin">
  I operate at the intersection of strategy and execution, translating concepts
  into systems, and systems into real-world solutions. From planning and
  architecture to writing code and shipping, I focus on delivering products that
  are not only functional, but meaningful and user-centered.
</p>

<p className="leading-loose mb-4 text-lg font-thin">
  I’m driven by curiosity and continuous improvement. I spend time exploring new
  technologies, experimenting with ideas, and refining how I think about product
  design and development. To me, great products come from a balance of technical
  depth, thoughtful design, and a clear understanding of people.
</p>

<p className="leading-loose mb-4 text-lg font-thin">
  Outside of work, I step away to reset, reflect, and stay inspired, usually by
  getting outdoors and disconnecting for a bit.
</p>
        </div>
      </div>
    </div>
  );
};

export default About;
