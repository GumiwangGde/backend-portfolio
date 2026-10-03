export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  titles: string[];
  summary: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  status: {
    available: boolean;
    text: string;
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
  };
}

export const profile: Profile = {
  name: "Gumiwang Gde Derazatna",
  shortName: "Gumiwang Gde",
  initials: "GD",
  titles: [
    "Software Developer",
    "Full Stack & Backend Specialist",
    "Informatics Engineering (PENS)"
  ],
  summary:
    "Software Developer with practical experience in full-stack web applications, distributed backend services, and native-grade mobile development. Proficient in TypeScript, JavaScript, Node.js, Next.js, Vue 3, Flutter, and PostgreSQL. Experienced across the software development lifecycle, including sub-20ms edge caching, atomic transaction concurrency, encrypted session security, third-party logistics/payment integrations, and automated CI/CD container deployments.",
  tagline: "Software Developer specializing in full-stack web applications, distributed backend services, and mobile development.",
  location: "Bangkalan, Indonesia",
  email: "gugumgde26@gmail.com",
  phone: "0877-6272-8242",
  status: {
    available: true,
    text: "Open for Opportunities"
  },
  social: {
    github: "https://github.com/GumiwangGde",
    linkedin: "https://www.linkedin.com/in/gumiwang-gde-derazatna",
    email: "mailto:gugumgde26@gmail.com",
    phone: "https://wa.me/6287762728242"
  }
};
