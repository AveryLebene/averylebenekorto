export type ProjectGalleryItem = Readonly<{
  src: string;
  label: string;
}>;

export type ProjectDetail = Readonly<{
  id: string;
  about: readonly string[];
  goal: string;
  /** Extra narrative (e.g. product direction). */
  direction?: string;
  /** Ordered roadmap sections for products like Hitched. */
  roadmap?: ReadonlyArray<Readonly<{ phase: string; items: readonly string[] }>>;
  gallery: readonly ProjectGalleryItem[];
}>;

const repnoteGallery: ProjectGalleryItem[] = [
  { src: "/images/projects/repnote.png", label: "Login Desktop" },
  { src: "/images/projects/rep-login-mob.png", label: "Login Mobile" },
  { src: "/images/projects/rep-home.png", label: "Homescreen Mobile" },
  { src: "/images/projects/settings-rep.png", label: "Settings Mobile" },
  { src: "/images/projects/rep-log.png", label: "Log Workout Mobile" },
];

const hitchedGallery: ProjectGalleryItem[] = [
  { src: "/images/projects/hitched-desktop.png", label: "Desktop (1280×720)" },
  { src: "/images/projects/hitched-tablet.png", label: "Tablet (834×1112)" },
  { src: "/images/projects/hitched-mobile.png", label: "Mobile (390×844)" },
];

const asrannaGallery: ProjectGalleryItem[] = [
  { src: "/images/projects/asranna-desktop.png", label: "Desktop" },
  { src: "/images/projects/asrana-tab.png", label: "Tablet " },
  { src: "/images/projects/asranna-mob.png", label: "Mobile" },
];

const hubtelUxGallery: ProjectGalleryItem[] = [
  { src: "/images/projects/hubtel-ux-desktop.png", label: "Desktop (1280×720)" },
  { src: "/images/projects/hubtel-ux-tablet.png", label: "Tablet (834×1112)" },
  { src: "/images/projects/hubtel-mobile.png", label: "Mobile (390×844)" },
  { src: "/images/projects/hubtel-docs.png", label: "Chips Documentation" },
];

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  repnote: {
    id: "repnote",
    about: [
      "RepNote is a fitness tracking web app focused on logging workouts and seeing progress over time. It is built as a practical product surface for sets, reps, and consistency.",

    ],
    goal:
      "Give lifters a simple place to record training, revisit past sessions, and stay motivated by visible progress.",
    gallery: repnoteGallery,
  },
  hitched: {
    id: "hitched",
    about: [
      "Hitched is a dating-focused landing experience that introduces the brand and sets expectations for a platform about finding a compatible match.",
      "The live site is deployed on Vercel and styled with Tailwind and React, prioritizing clear messaging, trust, and a path for people to learn more or join when the full product opens up.",
    ],
    goal:
      "Help people discover Hitched as a serious, welcoming place to meet someone compatible—built on clarity, safety, and intentional matching rather than endless swiping.",
    roadmap: [
      {
        phase: "Foundation",
        items: [
          "Polish onboarding and profile creation with strong photo and prompt guidance.",
          "Core discovery: filters and compatibility signals that reflect what people actually care about.",
        ],
      },
      {
        phase: "Connection",
        items: [
          "Thoughtful messaging and interest flows that reduce spam and encourage real conversation.",
          "Safety tooling: reporting, blocking, and clear community standards in-product.",
        ],
      },
      {
        phase: "Growth",
        items: [
          "Events or community touchpoints so matches can meet in low-pressure settings.",
          "Mobile-first iteration and performance passes as usage scales.",
        ],
      },
    ],
    gallery: hitchedGallery,
  },
  asranna: {
    id: "asranna",
    about: [
      "Asranna is a web app for remembering important dates and tying them to your calendar so milestones do not slip by unnoticed.",
      "It is actively evolving: the current build focuses on dates and events; the next chapter is about proactive reminders and making it easier to act when an occasion is coming up.",
    ],
    goal:
      "Make important dates impossible to forget and effortless to plan for, so you show up prepared for the people who matter.",
    direction:
      "I am extending Asranna into a companion that reminds you ahead of each event and helps you find the right gift: suggestions, saved ideas, and gentle nudges so you are not scrambling the night before.",
    gallery: asrannaGallery,
  },
  "hubtel-ux": {
    id: "hubtel-ux",
    about: [
      "The Hubtel UX System site is a private hub for how Hubtel designs product experiences: a shared design system, a story system grounded in user goals, research insights, and learning resources for teams building at scale.",
      "It acts as the connective tissue between design and engineering, so components, patterns, and narrative framing stay aligned as products evolve.",
    ],
    goal:
      "Give designers and engineers one trusted place to learn Hubtel’s UX standards, reuse patterns, and ship experiences that feel clear, consistent, and intentional across the product suite.",
    gallery: hubtelUxGallery,
  },
};

export function getProjectDetail(id: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[id];
}

export function getAllProjectDetailIds(): string[] {
  return Object.keys(PROJECT_DETAILS);
}
