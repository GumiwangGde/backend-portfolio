export interface Education {
  institution: string;
  degree: string;
  major: string;
  period: string;
  gpa: string;
  highlights: string[];
}

export const education: Education = {
  institution: "Politeknik Elektronika Negeri Surabaya (PENS)",
  degree: "Associate Degree in Informatics (A.Md.Kom)",
  major: "Informatics Engineering",
  period: "July 2023 – July 2026",
  gpa: "3.69 / 4.00",
  highlights: [
    "Core curriculum in Computer Science fundamentals, Algorithms, and Data Structures.",
    "Distributed systems, Operating Systems, Database Architecture, and Computer Networks.",
    "Published production-grade applications as final year graduation project."
  ]
};

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    title: "Junior Mobile Programmer",
    issuer: "Vocational School Graduate Academy (Digital Talent Scholarship 2025 - Kominfo)",
    year: "2025",
    verifyUrl: "https://drive.google.com/file/d/14pve7dDXjcHBJtuduRM5Y97Beq_MgjPH/view"
  },
  {
    title: "UI/UX Design",
    issuer: "Sanbercode (January 15th – February 09th, 2024)",
    year: "2024",
    verifyUrl: "https://sanbercode.com/certificate/in/408c2e71-bd3e-41a5-8338-6574aed2a8ef"
  }
];

export interface Language {
  language: string;
  proficiency: string;
}

export const languages: Language[] = [
  { language: "Indonesian", proficiency: "Native / Fluent" },
  { language: "English", proficiency: "Intermediate / Professional Working Proficiency" }
];
