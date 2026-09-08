export interface LiveSiteLink {
  name: string;
  url: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  badge: string;
  description: string;
  tech: string[];
  role: string;
  liveSites?: LiveSiteLink[];
  github?: string | null;
  playstore?: string | null;
  demoUrl?: string | null;
}

export const projects: Project[] = [
  {
    id: "rkd-wordpress-ecosystem",
    title: "RKD Digital Foundation Ecosystem",
    subtitle: "Unified Multi-Platform Web Suite for Yayasan Ruang Karya Berdampak",
    year: "2026",
    badge: "WordPress Suite",
    description:
      "Developed and deployed a unified suite of 3 custom WordPress web platforms powering the RKD Foundation ecosystem across Indonesia, featuring custom theme engineering, LiteSpeed caching, and cross-site navigation.",
    tech: ["WordPress", "PHP", "Custom Theme", "MySQL", "LiteSpeed Cache", "JavaScript"],
    role: "Full-Stack & CMS Developer",
    liveSites: [
      {
        name: "Ruang Karya Berdampak",
        url: "https://ruangberdampak.org/",
        desc: "Core Foundation & National Impact Ecosystem Portal"
      },
      {
        name: "Jejak Baik Platform",
        url: "https://jejakbaik.org/",
        desc: "Social Kindness & Humanitarian Storytelling Network"
      },
      {
        name: "Klinik Digital",
        url: "https://klinikdigital.org/",
        desc: "Digital Intelligence & AI Educational Hub"
      }
    ],
    github: null,
    playstore: null,
    demoUrl: null
  },
  {
    id: "bidmaster-realtime-auction",
    title: "BidMaster Real-Time Auction",
    subtitle: "High-Concurrency Bidding & Asynchronous Worker System",
    year: "2025",
    badge: "Backend System",
    description:
      "Real-time auction backend built to handle simultaneous bidding traffic using RabbitMQ message queues, .NET background worker consumers, PostgreSQL transactions, and Redis caching.",
    tech: [".NET Worker", "RabbitMQ", "Express.js", "PostgreSQL", "Redis", "Docker"],
    role: "Backend Engineer",
    github: "https://github.com/GumiwangGde/bidmaster-api",
    demoUrl: null,
    playstore: null
  },
  {
    id: "hospital-payment-inventory",
    title: "Hospital Payment & Inventory Core",
    subtitle: "Healthcare Transaction & Pharmacy Management Service",
    year: "2025",
    badge: "Enterprise Service",
    description:
      "Backend services handling hospital billing transactions and pharmaceutical stock deductions with relational PostgreSQL database modeling and strict Zod schema validation.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "Zod", "JWT Auth"],
    role: "Backend Developer",
    github: null,
    demoUrl: null,
    playstore: null
  },
  {
    id: "hydration-activity-tracking",
    title: "Hydration & Sensor Geospatial Tracker",
    subtitle: "Mobile Health Application with Weather & Sensor Integration",
    year: "2024",
    badge: "Mobile App",
    description:
      "Mobile health application built with Flutter that combines device step sensors with real-time weather API data to dynamically calculate daily hydration targets and render GPS running routes.",
    tech: ["Flutter", "Dart", "GetX", "Mapbox SDK", "Weather API"],
    role: "Mobile Developer",
    playstore:
      "https://play.google.com/store/apps/details?id=com.hydrate.pdbl&pcampaignid=web_share",
    github: null,
    demoUrl: null
  }
];
