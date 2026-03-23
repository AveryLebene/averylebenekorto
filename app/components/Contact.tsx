import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";

const social = [
  {
    label: "GitHub",
    href: "https://github.com/AveryLebene",
    icon: FiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/avery-lebene-korto-046293253/",
    icon: FiLinkedin,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/233268051515",
    icon: SiWhatsapp,
  },
] as const;

const cardClass =
  "rounded-lg border border-[#333]/40 bg-[#222]/40 p-4 md:p-8 text-[#c7c7c7]";

const Contact = () => {
  return (
    <div className="lg:py-6 pb-10 lg:px-8 px-4 max-w-6xl mx-auto">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-bold text-3xl md:text-4xl mb-4 text-white">
          Let&apos;s work together
        </h1>
        <p className="text-[#c7c7c7] leading-relaxed">
          I&apos;m always interested in new opportunities, challenging projects,
          and meaningful collaborations. Whether you have something in mind or
          just want to connect, I&apos;d love to hear from you.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-12 items-start">
        <div>
          <h2 className="font-bold text-xl mb-6 text-white">
            Send a message
          </h2>
          <form action="" className="space-y-4 max-w-lg">
            <div>
              <label htmlFor="name" className="block text-sm text-[#c7c7c7] mb-1">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                className="p-3 text-start rounded-md w-full mt-1 bg-[#1a1a1a] border border-[#333]/60 text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-green-200/40 focus:border-green-200/50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-[#c7c7c7] mb-1">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full p-3 text-start rounded-md mt-1 bg-[#1a1a1a] border border-[#333]/60 text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-green-200/40 focus:border-green-200/50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-[#c7c7c7] mb-1">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Enter your message"
                className="w-full p-3 text-start rounded-md mt-1 bg-[#1a1a1a] border border-[#333]/60 text-white placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-green-200/40 focus:border-green-200/50 resize-y min-h-[120px]"
              />
            </div>
            <button
              type="submit"
              className="bg-green-200 mt-2 text-black px-6 py-3 font-semibold rounded-md hover:bg-green-100 transition-colors"
            >
              Send message
            </button>
          </form>
        </div>

        <aside className={`${cardClass}  space-y-8`}>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Available for exciting projects
            </h3>
            <p className="text-sm leading-relaxed">
              I&apos;m open to new roles, freelance work, and collaborations. If
              you&apos;d like to discuss an idea or bring me onto your team,
              reach out anytime.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#888] mb-1">
                Email
              </p>
              <a
                href="mailto:averylebene@gmail.com"
                className="inline-flex items-center gap-2 text-green-200 hover:underline font-medium"
              >
                <FiMail className="shrink-0" aria-hidden />
                averylebene@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#888] mb-1">
                Location
              </p>
              <p className="inline-flex items-center gap-2 text-[#e5e5e5]">
                <FiMapPin className="shrink-0 text-green-200/90" aria-hidden />
                Ghana · Open to remote
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect with me
            </h3>
            <ul className="flex flex-wrap gap-3">
              {social.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#444]/60 text-sm text-[#e5e5e5] hover:border-green-200/50 hover:text-green-200 transition-colors"
                  >
                    <Icon className="text-lg" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className={`${cardClass} mt-10 text-center max-w-3xl mx-auto`}>
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
          Let&apos;s build something meaningful
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-[#b0b0b0]">
          Ready to turn an idea into a product, improve an existing experience,
          or talk shop about frontend and full-stack craft? Send a message or
          connect on socials.
        </p>
      </div>
    </div>
  );
};

export default Contact;
