export interface Project {
  id: string;
  name: string;
  description: string;
  image: string | null;
  imageMobile?: string;
  tags: string[];
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "repnote",
    name: "RepNote",
    description:
      "A fitness tracking app that allows you to track your workouts and see your progress.",
    image: "/images/projects/repnote-desktop.png",
    imageMobile: "/images/projects/rep-login-mob.png",
    tags: ["Web app", "Next.js", "Tailwind CSS", "TypeScript", "Supabase"],
    liveUrl: "https://repnotes.vercel.app/",
  },
  // {
  //   id: "hitched",
  //   name: "Hitched",
  //   description:
  //     "A dating platform landing experience—find your match with a clear, welcoming first impression.",
  //   image: "/images/projects/hitched-desktop.png",
  //   imageMobile: "/images/projects/hitched-mobile.png",
  //   tags: ["Tailwind CSS", "React", "Landing"],
  //   liveUrl: "https://hitched-sand.vercel.app/",
  // },
  {
    id: "asranna",
    name: "Asranna",
    description:
      "Remember important dates, sync with your calendar, and plan ahead for the people you care about.",
    image: "/images/projects/asranna-desktop.png",
    imageMobile: "/images/projects/asranna-mob.png",
    tags: ["Tailwind CSS", "React", "Axios"],
    liveUrl: "https://main.d1bv76t7u8u3k6.amplifyapp.com/",
  },
  {
    id: "hubtel-ux",
    name: "Hubtel UX System",
    description:
      "Hubtel’s home for UX systems and learning resources for consistent product experiences.",
    image: "/images/projects/hubtel-ux-desktop.png",
    imageMobile: "/images/projects/hubtel-mobile.png",
    tags: ["Design system", "Documentation"],
    liveUrl: "https://ux.hubtel.com/",
  },
];

const LATEST_COUNT = 2;
export const LATEST_PROJECTS = PROJECTS.slice(0, LATEST_COUNT);

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
