export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location?: string;
  type: "freelance" | "internship" | "fulltime";
  stack: string[];
  points: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "June 2025 – Present",
    type: "freelance",
    stack: [
      "Python",
      "PHP / Laravel",
      "Node.js",
      "React",
      "Next.js",
      "Vue.js",
      "WordPress",
      "Docker"
    ],
    points: [
      "Developed and maintained custom full-stack web applications and REST APIs using Node.js, PHP/Laravel, and Python, integrated with responsive frontends in React, Next.js, and Vue.js.",
      "Built and launched production websites and company portals using WordPress and Elementor, handling custom layout theming, responsive design, and third-party plugin integrations.",
      "Engineered custom Python and Node.js automation scripts, data processing tools, and third-party API integrations to streamline manual client workflows.",
      "Handled debugging, troubleshooting, and feature additions across existing codebases, deploying containerized applications with Docker and Nginx on Linux VPS servers."
    ]
  },
  {
    role: "Backend Developer Intern",
    company: "PT Wahana Meditek Indonesia",
    period: "June 2025 – December 2025",
    type: "internship",
    stack: [
      "Node.js",
      "Express.js",
      "Sequelize",
      "MySQL",
      "WebSockets",
      "GitLab CI/CD",
      "Docker"
    ],
    points: [
      "Maintained and expanded RESTful backend services using Node.js and Express.js, adapting to an existing codebase and complex data workflows for hospital operational systems.",
      "Designed relational database schemas and optimized MySQL queries using Sequelize ORM, improving data integrity and transaction performance across hospital inventory and billing modules.",
      "Implemented WebSocket-based event-driven processing to eliminate real-time transaction bottlenecks and maintain data consistency during concurrent staff usage.",
      "Diagnosed and resolved edge-case backend data processing issues, managing containerized services with Docker and automated build pipelines via GitLab CI/CD."
    ]
  }
];
