export const portfolio = {
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    badge: "Software Developer | AI Automation | Full Stack Developer",
    title: "Hi, I'm Purushottam Gandas.",
    description:
      "Pune-based software developer building AI-powered workflow automation, full-stack web applications, OCR tools, and enterprise support systems.",
    stats: [
      { value: "Pune", label: "Maharashtra" },
      { value: "AI", label: "Automation" },
      { value: "Full", label: "Stack Apps" },
    ],
  },
  about: {
    title: "Building Practical Software For Real Operational Problems",
    intro:
      "I am a Pune-based software developer associated with PraiseArray and currently seeking opportunities that help me grow professionally while contributing to practical software, automation, and support outcomes.",
    highlights: [
      "Builds workflow tools that classify email, validate attachments, extract data, and route work using clear business rules.",
      "Creates responsive React applications with clean APIs, practical dashboards, and maintainable component structure.",
      "Bridges development and application support by thinking about reliability, deployment, user impact, and continuous learning.",
    ],
  },
  skills: [
    {
      title: "Frontend",
      icon: "code",
      items: ["React", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      title: "Backend",
      icon: "backend",
      items: ["Node.js", "Express.js", "Python", "FastAPI"],
    },
    {
      title: "Database",
      icon: "database",
      items: ["PostgreSQL", "MongoDB", "SQL"],
    },
    {
      title: "AI / Automation",
      icon: "ai",
      items: ["OpenAI API", "OCR", "Tesseract", "OpenCV", "Email Automation", "Workflow Automation"],
    },
    {
      title: "Testing",
      icon: "testing",
      items: ["Selenium", "Playwright", "React Testing Library"],
    },
    {
      title: "DevOps",
      icon: "devops",
      items: ["AWS EC2", "Linux", "Git", "GitHub Pages", "Domain & SSL setup"],
    },
  ],
  experience: [
    {
      kicker: "Current Profile",
      title: "PraiseArray",
      icon: "briefcase",
      description:
        "Professional profile associated with PraiseArray in Pune, Maharashtra, with a focus on software development, workflow automation, and applied AI learning.",
    },
    {
      kicker: "Full Stack Development",
      title: "Web Applications",
      icon: "layers",
      description:
        "Built modern frontend experiences and API-backed tools using React, Angular, Node.js, Python, and database-driven workflows.",
    },
    {
      kicker: "Application Support",
      title: "Reliable Operations",
      icon: "shield",
      description:
        "Supported business systems with debugging, issue analysis, deployment awareness, Linux basics, and user-focused incident handling.",
    },
  ],
  projects: [
    {
      title: "Enterprise AI Workflow Automation Platform",
      icon: "ai",
      description:
        "AI-powered system for email classification, attachment validation, OCR extraction, workflow routing, and dashboard reporting.",
      tags: ["OpenAI API", "OCR", "Workflow Routing", "Dashboards"],
    },
    {
      title: "Smart Email Processing System",
      icon: "mail",
      description:
        "Automatically detects broker/TPA emails, extracts tracker IDs, ignores auto-acknowledgement emails, and routes requests based on business rules.",
      tags: ["Email Automation", "Business Rules", "Classification"],
    },
    {
      title: "OCR Document Intelligence Platform",
      icon: "database",
      description:
        "Extracts structured data from scanned documents, PDFs, and images using OCR and exports clean data.",
      tags: ["Tesseract", "OpenCV", "PDF Parsing", "Data Export"],
    },
    {
      title: "AI Test Automation Copilot",
      icon: "testing",
      description:
        "Generates Selenium/Playwright test cases, helps identify locators, and creates bug reports.",
      tags: ["Selenium", "Playwright", "Bug Reports"],
    },
    {
      title: "OpenAI Usage Analytics Dashboard",
      icon: "rocket",
      description:
        "Tracks token usage, cost, model-wise usage, and daily/monthly API consumption.",
      tags: ["Analytics", "Costs", "API Usage", "Reporting"],
    },
  ],
  services: [
    {
      title: "AI Workflow Automation",
      icon: "automation",
      description: "Email triage, document checks, routing flows, and operational dashboards.",
    },
    {
      title: "Full-Stack Web Apps",
      icon: "layers",
      description: "Responsive interfaces, APIs, databases, admin tools, and reporting views.",
    },
    {
      title: "OCR Data Extraction",
      icon: "ai",
      description: "Document ingestion pipelines that turn PDFs and images into usable data.",
    },
    {
      title: "Testing & Support Tools",
      icon: "testing",
      description: "Automation copilots, test generation, defect reports, and support utilities.",
    },
  ],
  contact: {
    email: "purushottamgandas2002@gmail.com",
    github: "https://github.com/Purushottam02",
    linkedin: "https://www.linkedin.com/in/purushottam-gandas-3a2713212/",
  },
  contactCards: [
    { label: "Location", value: "Pune Division, Maharashtra, India" },
    { label: "Roles", value: "Software Developer, Full Stack Developer, AI Automation Engineer" },
    { label: "Focus", value: "React, APIs, OCR, OpenAI, workflow automation" },
    { label: "Education", value: "Pune University" },
    { label: "Language", value: "English - native or bilingual proficiency" },
    { label: "Availability", value: "Seeking growth-focused developer and application support opportunities" },
  ],
};
