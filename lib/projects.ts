export interface Project {
  id: string;
  name: string;
  description: string;
  image: string | null;
  imageMobile?: string;
  tags: string[];
  detailsUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "repnote",
    name: "RepNote",
    description:
      "A fitness tracking app that allows you to track your workouts and see your progress.",
    image: "/images/projects/repnote.png",
    imageMobile: "/images/projects/repnote-mobile.png",
    tags: ["Web app", "Next.js", "Tailwind", "TypeScript", "Supabase"],
  },
  {
    id: "hitched",
    name: "Hitched",
    description: "A dating platform landing website",
    image: null,
    tags: ["Tailwind", "React"],
  },
  {
    id: "amovies",
    name: "A Movies",
    description:
      "A movie search app that allows you to search for movies and see their trailers/details.",
    image: null,
    tags: ["Web app", "Tailwind", "React", "Axios"],
  },

  {
    id: "asranna",
    name: "Asranna",
    description:
      "A platform to help you remember dates and add events to your calendar",
    image: null,
    tags: ["Web app", "Tailwind", "React", "Axios"],
  },
  {
    id: "bds",
    name: "Butterfly Design System",
    description: "A design system for the Butterfly Design System platform",
    image: null,
    tags: ["Web app", "Tailwind", "Astro"],
  },
  {
    id: "hubtel-web",
    name: "Hubtel Web",
    description: "A web app for the Hubtel platform",
    image: null,
    tags: ["Web app", "Tailwind", "Nuxt"],
  },
];

const LATEST_COUNT = 2;
export const LATEST_PROJECTS = PROJECTS.slice(0, LATEST_COUNT);
