export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "work" | "leadership" | "education";
  badge?: string;
  description?: string;
  techStack?: string[];
  points: string[];
}

export const experiences: Experience[] = [
  {
    company: "PT Neurobyte",
    role: "Chief Technology Officer (CTO)",
    period: "Dec 2025 - Mar 2026",
    location: "Indonesia",
    type: "leadership",
    badge: "Executive Leadership",
    description: "Led technology strategy, microservices architecture, and engineering squads.",
    techStack: ["Microservices", "Cloud Infrastructure", "System Architecture", "Security", "Team Leadership"],
    points: [
      "Formulated high-level technical vision and architectural roadmaps for scalable software platforms.",
      "Overseeing backend infrastructure design, establishing microservice standards, and enforcing deployment reliability.",
      "Directed cross-functional engineering teams, code review standards, and sprint deliveries."
    ]
  },
  {
    company: "PT Wahana Meditek Indonesia",
    role: "Backend Developer",
    period: "June 2025 - Dec 2025",
    location: "Indonesia",
    type: "work",
    badge: "Enterprise Backend",
    description: "Built and optimized high-reliability backend systems for hospital workflows.",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "Zod", "Docker", "REST APIs"],
    points: [
      "Engineered mission-critical hospital billing and pharmacy inventory microservices with atomic transactional guarantees.",
      "Optimized relational database queries in PostgreSQL, improving API response times across core modules.",
      "Implemented automated input validation using Zod schemas and secured endpoints with JWT authentication."
    ]
  },
  {
    company: "Politeknik Elektronika Negeri Surabaya (PENS)",
    role: "Informatics Engineering Graduate",
    period: "Aug 2023 - Aug 2026",
    location: "Surabaya, Indonesia",
    type: "education",
    badge: "Graduated",
    description: "Graduated with strong foundation in distributed systems, algorithms, and software engineering theory.",
    techStack: ["Data Structures", "Distributed Systems", "Database Design", "Operating Systems", "Networking"],
    points: [
      "Completed comprehensive curriculum covering computational theory, advanced data structures, concurrency, and distributed system design.",
      "Developed production-grade software projects alongside academic coursework and technical lab research.",
      "Active collaboration on research projects and engineering community mentoring."
    ]
  }
];
