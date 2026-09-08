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
    "Software Engineer",
    "Backend & Distributed Systems Specialist",
    "Informatics Engineering Graduate (PENS)"
  ],
  bio: "Software Engineer specializing in backend infrastructure, custom web architectures, and distributed services. Passionate about building reliable APIs, scalable database systems, and clean, maintainable web platforms.",
  tagline: "Building resilient backend architectures, scalable web platforms, and custom CMS ecosystems.",
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
