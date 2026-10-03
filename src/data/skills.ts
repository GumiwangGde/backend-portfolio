export interface SkillGroup {
  category: string;
  items: string[];
}

export const technicalSkills: SkillGroup[] = [
  {
    category: "Frontend & Mobile",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "Vue.js", "Flutter", "Tailwind CSS"]
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "Express.js", "Hono", "Laravel", "Python", "Go", "REST APIs", "WebSockets"]
  },
  {
    category: "Databases & ORM",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Prisma", "Sequelize"]
  },
  {
    category: "Cloud & DevOps",
    items: ["Docker", "Cloudflare Workers & KV", "Linux", "Nginx", "GitLab CI/CD", "GitHub Actions"]
  },
  {
    category: "CMS & Integrations",
    items: ["WordPress", "Elementor", "DOKU Gateway", "Biteship Logistics", "Python Automation"]
  }
];
