export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  titles: string[];
  bio: string;
  tagline: string;
  location: string;
  email: string;
  status: {
    available: boolean;
    text: string;
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export const profile: Profile = {
  name: "Gumiwang Gde Derazatna",
  shortName: "Gumiwang Gde",
  initials: "GD",
  titles: [
    "Backend & Distributed Systems Engineer",
    "Former CTO at PT Neurobyte",
    "Informatics Engineering Graduate (PENS)"
  ],
  bio: "Software Engineer with a primary focus on backend systems, custom WordPress architectures, and distributed services. Experienced in engineering web platforms, API development, and technical team leadership.",
  tagline: "Building resilient backend architectures, custom CMS ecosystems, and web platforms.",
  location: "Surabaya, Indonesia",
  email: "gugumgde26@gmail.com",
  status: {
    available: true,
    text: "Open for Full-Time Opportunities"
  },
  social: {
    github: "https://github.com/GumiwangGde",
    linkedin: "https://www.linkedin.com/in/gumiwang-gde-derazatna",
    email: "mailto:gugumgde26@gmail.com"
  }
};
