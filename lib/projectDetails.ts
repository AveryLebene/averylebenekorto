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

const furrcityGallery: ProjectGalleryItem[] = [
  { src: "/images/projects/furrcity-desktop.png", label: "Explore Desktop" },
  { src: "/images/projects/furrcity-mobile.png", label: "Explore Mobile" },
  { src: "/images/projects/furrcity-provider-desktop.png", label: "Provider Details Desktop" },
  { src: "/images/projects/furrcity-provider-mobile.png", label: "Provider Details Mobile" },
  { src: "/images/projects/furrcity-pet-desktop.png", label: "Pet Profile Desktop" },
  { src: "/images/projects/furrcity-pet-mobile.png", label: "Pet Profile Mobile" },
  { src: "/images/projects/furrcity-bookings-desktop.png", label: "Bookings Desktop" },
  { src: "/images/projects/furrcity-bookings-mobile.png", label: "Bookings Mobile" },
  { src: "/images/projects/furrcity-unifurrcity-mobile.png", label: "Unifurrcity Mobile" },
];

const repnoteGallery: ProjectGalleryItem[] = [
  { src: "/images/projects/repnote.png", label: "Login Desktop" },
  { src: "/images/projects/rep-login-mob.png", label: "Login Mobile" },
  { src: "/images/projects/repnote-home-desktop.png", label: "Home Desktop" },
  { src: "/images/projects/rep-home.png", label: "Homescreen Mobile" },
  { src: "/images/projects/repnote-new-workout-desktop.png", label: "New Workout Desktop" },
  { src: "/images/projects/repnote-workouts-desktop.png", label: "Workouts Desktop" },
  { src: "/images/projects/repnote-workouts-mobile.png", label: "Workouts Mobile" },
  { src: "/images/projects/rep-log.png", label: "Log Workout Mobile" },
  { src: "/images/projects/repnote-settings-desktop.png", label: "Settings Desktop" },
  { src: "/images/projects/settings-rep.png", label: "Settings Mobile" },
  { src: "/images/projects/repnote-profile-desktop.png", label: "Profile Desktop" },
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
  furrcity: {
    id: "furrcity",
    about: [
      "FurrCity is a marketplace that connects pet owners in  with groomers, vets, trainers, and daycare providers and pet profile system for tracking each animal's info and care history.",
      "It covers the full loop: browsing and filtering nearby providers, viewing provider details and hours, managing pet profiles, and tracking bookings.",
      "Each pet gets a record, that tracks: medical info, vaccinations, weight history, temperament traits, and wellness and behavior logs, alongside a timeline of vet visits, grooming records, and daycare reports. Much of that timeline is written by the vendor side rather than the owner — when a groomer or vet completes a booking, they log the visit from their own admin portal (diagnosis and treatment, coat condition, products used, behavioral notes) and it flows straight into the pet's profile as a caregiver-sourced entry, clearly attributed and separate from what the owner logs themselves.",
      "Pet Spotlight lets owners submit a photo of their pet to be featured on Explore; providers can also submit a photo on behalf of a pet they've serviced after a completed booking.",
      "Unifurrcity is FurrCity's learn hub; articles and courses on pet care, filtered by species and category, and personalized to the pets on the owner's account.",
      "Owners and providers are kept in the loop at every step of a booking — a new request, confirmation, payment, pickup-ready, or a nudge to leave a review after a visit — all sent automatically over SMS, WhatsApp, or email, plus reminders as the appointment date gets closer.",
    ],
    goal:
      "Make it simple for pet owners to find trustworthy, nearby pet care and keep every pet's details in one place, from discovery through booking.",
    gallery: furrcityGallery,
  },
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
