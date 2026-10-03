export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  subtitle: string;
  image?: string;
  url?: string;
  links?: ProjectLink[];
  stack: string[];
  points: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "tapinaja",
    title: "TAPINAJA",
    role: "Full Stack Developer",
    subtitle: "Edge-Accelerated Smart NFC & Automated Production Platform",
    image: "/projects/tapinaja.png",
    url: "https://tapinaja.com",
    featured: true,
    stack: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Vue 3",
      "Cloudflare Workers & KV",
      "Docker",
      "Infisical"
    ],
    points: [
      "Architected an edge-accelerated NFC redirection system using Cloudflare Workers and KV, offloading ~95% of origin database traffic with sub-20ms global redirect response times.",
      "Engineered an end-to-end physical card manufacturing and QC workflow featuring an in-browser WebRTC QR scanner and atomic inventory reservation using PostgreSQL FOR UPDATE SKIP LOCKED to prevent checkout race conditions.",
      "Built an automated print batch engine generating streaming ZIP archives with bleed-margin PNGs and CSV manifests, backed by an asynchronous outbox queue ensuring eventual consistency between PostgreSQL and edge KV cache.",
      "Integrated DOKU payment gateway and Biteship logistics APIs with HMAC SHA-256 signature verification, idempotent webhook processing, automated thermal shipping labels, and 12 granular platform permissions."
    ]
  },
  {
    id: "merdeka-sejahtera",
    title: "PT Merdeka Sejahtera",
    role: "Full Stack Developer",
    subtitle: "Enterprise B2B Manufacturing & Customer Portal",
    image: "/projects/merdeka-sejahtera.png",
    url: "https://msb.pradita.my.id",
    featured: true,
    stack: [
      "Next.js 16",
      "Strapi v5",
      "PostgreSQL",
      "Docker Compose",
      "GitLab CI/CD"
    ],
    points: [
      "Delivered a full-stack corporate B2B portal using Next.js 16 App Router and Strapi v5, implementing AES-256-GCM encrypted JWT session cookies (jose), automated token rotation, and strict same-origin request verification.",
      "Designed custom Strapi v5 schemas with automated database bootstrapping, multi-language localization (ID/EN), dynamic manufacturing seed scripts, and role-scoped customer inventory endpoints.",
      "Containerized the multi-service architecture using Docker Compose and established automated build and deployment pipelines to a Linux VPS via GitLab CI/CD on a self-hosted runner."
    ]
  },
  {
    id: "hydrate",
    title: "Hydrate",
    role: "Lead Mobile Developer & Product Owner",
    subtitle: "Sensor-Driven Mobile Hydration & GPS Tracking Platform (Final Year Project)",
    image: "/projects/hydrate.png",
    url: "https://play.google.com/store/apps/details?id=com.hydrate.pdbl&pcampaignid=web_share",
    featured: true,
    stack: [
      "Flutter",
      "Dart",
      "Android",
      "Firebase",
      "GitLab CI/CD"
    ],
    points: [
      "Led a 4-person team to build and publish a mobile health app on Google Play using Flutter, structured on Clean Architecture principles and GetX for reactive state management.",
      "Implemented persistent background tracking via device pedometer sensors and GPS geolocation (flutter_map) to continuously log user steps and routes even when the screen is locked or the app is minimized.",
      "Applied the Strategy Design Pattern to decouple calculation logic for metabolic caloric burn and hydration depletion rates across different exercise modes.",
      "Integrated Firebase Authentication, Cloud Messaging push alerts, and Crashlytics, accompanied by an automated GitLab CI/CD pipeline handling code analysis, testing, and release APK signing."
    ]
  },
  {
    id: "rkd-ecosystem",
    title: "RKD Foundation Web Ecosystem",
    role: "Full-Stack & CMS Developer",
    subtitle: "Multi-Platform WordPress Web Suite for National Impact Foundation",
    image: "/projects/rkd.png",
    featured: true,
    links: [
      { label: "Ruang Berdampak", url: "https://ruangberdampak.org/" },
      { label: "Jejak Baik", url: "https://jejakbaik.org/" },
      { label: "Klinik Digital", url: "https://klinikdigital.org/" }
    ],
    stack: [
      "WordPress",
      "PHP",
      "Custom Theme",
      "MySQL",
      "LiteSpeed Cache",
      "Responsive Web"
    ],
    points: [
      "Built and deployed a unified suite of 3 custom WordPress web platforms powering the Yayasan Ruang Karya Berdampak (RKD) ecosystem across Indonesia.",
      "Developed lightweight custom themes with LiteSpeed caching optimizations, responsive mobile-first layouts, and cross-platform navigation.",
      "Configured robust security, SEO schema markup, and structured content management for research, news, and community initiatives."
    ]
  }
];
