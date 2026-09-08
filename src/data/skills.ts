export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: "Advanced" | "Proficient" | "Familiar";
    highlight?: boolean;
    description?: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Core Languages",
    description: "Languages used for high-performance servers, microservices, and scripts.",
    icon: "code",
    skills: [
      { name: "Node.js / TypeScript", level: "Advanced", highlight: true, description: "Async runtime, event loop, typing" },
      { name: "C# / .NET", level: "Advanced", highlight: true, description: "ASP.NET Core, Workers, LINQ" },
      { name: "PHP / Laravel", level: "Proficient", description: "Eloquent, Queue workers, MVC" },
      { name: "Dart / Flutter", level: "Proficient", description: "Mobile client integration & state" },
      { name: "SQL & Shell Scripting", level: "Advanced", description: "Bash, Complex queries, Query tuning" }
    ]
  },
  {
    id: "backend-frameworks",
    title: "Frameworks & Runtimes",
    description: "Backend application frameworks and concurrent processing runtimes.",
    icon: "server",
    skills: [
      { name: "ASP.NET Core", level: "Advanced", highlight: true, description: "Microservices & Background Workers" },
      { name: "Express.js / Fastify", level: "Advanced", highlight: true, description: "REST APIs & Middleware pipelines" },
      { name: "Laravel Core & PHP", level: "Proficient", description: "Enterprise services & REST API" },
      { name: "RabbitMQ Consumer Workers", level: "Advanced", highlight: true, description: "Asynchronous task dispatching" }
    ]
  },
  {
    id: "cms-headless",
    title: "CMS & Headless Platforms",
    description: "Headless content engines, custom theme development, and web platforms.",
    icon: "layers",
    skills: [
      { name: "Strapi (Headless CMS)", level: "Advanced", highlight: true, description: "Custom controllers, REST & GraphQL APIs, RBAC" },
      { name: "WordPress Custom CMS", level: "Advanced", highlight: true, description: "Custom theme engineering, LiteSpeed, Multi-site" },
      { name: "Squarespace", level: "Proficient", description: "Custom CSS/JS integrations, responsive web styling" }
    ]
  },
  {
    id: "databases",
    title: "Databases & Caching",
    description: "Data storage, distributed caching, indexing, and transactional engines.",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: "Advanced", highlight: true, description: "ACID transactions, indexing, partitions" },
      { name: "Redis", level: "Advanced", highlight: true, description: "Pub/Sub, Distributed caching, Locking" },
      { name: "MySQL / MariaDB", level: "Proficient", description: "Relational modeling, query optimization" },
      { name: "MongoDB", level: "Proficient", description: "Document store, Aggregation pipelines" }
    ]
  },
  {
    id: "infrastructure",
    title: "DevOps, Cloud & Architecture",
    description: "Containerization, system design, CI/CD pipelines, and observability.",
    icon: "cpu",
    skills: [
      { name: "Docker & Containerization", level: "Advanced", highlight: true, description: "Multi-stage builds & Compose" },
      { name: "Microservices Architecture", level: "Advanced", highlight: true, description: "Domain-Driven Design (DDD)" },
      { name: "CI / CD & Git", level: "Advanced", description: "GitHub Actions, GitLab CI, semantic release" },
      { name: "Linux Administration", level: "Advanced", description: "Ubuntu/Debian server config & monitoring" },
      { name: "API Security & Auth", level: "Advanced", description: "JWT, OAuth2, RBAC, Rate limiting, Zod" }
    ]
  }
];
