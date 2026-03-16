const Contact = () => {
  return (
    <div className="lg:py-6 pb-10 lg:px-8 px-4">
      <div className="flex justify-between flex-col md:flex-row">
        <div>
          <h4 className="font-bold text-3xl mb-4">Let&apos;s connect</h4>
          <p className="pr-12">
            I am always looking for new opportunities to connect and
            collaborate.{" "}
          </p>
          <h4 className="font-bold text-xl mb-4 pt-8">Just get in touch with me</h4>
        </div>
        <div>
          <form action="">
            <div className="mb-4">
              <label htmlFor="name" className="">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="p-3 text-start rounded-md w-full mt-1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="">
                Your Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full p-3 text-start rounded-md mt-1"
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="name" className="">
                Your Message
              </label>
              <textarea  rows={3} placeholder="Enter your message" className=" w-full lg:w-[500px] p-3 text-start rounded-md" />
            </div>
            <button type="submit" className="bg-green-200 mt-6  block text-black p-3 font-semibold rounded-md">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
