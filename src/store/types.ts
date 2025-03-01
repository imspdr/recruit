export type Job = {
  company: Company;
  title: string;
  sub: string;
  link: string;
};

export type Company = (typeof COMPANYS)[number];

export const COMPANYS = [
  "naver",
  "kakao",
  "line",
  "coupang",
  "baemin",
  "dangn",
  "toss",
  // "jikbang",
  // "yanolja",
];

// export type Tag = (typeof TAGS)[number];

// const rawTags = [
//   "Python",
//   "JavaScript",
//   "TypeScript",
//   "Node.js",
//   "React",
//   "Next.js",
//   "Vue.js",
//   "Svelte",
//   "SolidJS",
//   "FastAPI",
//   "Django",
//   "Flask",
//   "Express.js",
//   "NestJS",
//   "Spring Boot",
//   "Ruby on Rails",
//   "ASP.NET Core",
//   "MySQL",
//   "PostgreSQL",
//   "MongoDB",
//   "Redis",
//   "SQLite",
//   "Elasticsearch",
//   "Supabase",
//   "GraphQL",
//   "tRPC",
//   "WebSockets",
//   "gRPC",
//   "Docker",
//   "Kubernetes",
//   "Helm",
//   "Terraform",
//   "Ansible",
//   "Git",
//   "GitHub Actions",
//   "CI/CD",
//   "Nginx",
//   "Apache",
//   "AWS",
//   "GCP",
//   "Azure",
//   "Cloudflare",
//   "Vercel",
//   "Netlify",
//   "Linux",
//   "Bash",
//   "WebAssembly",
//   "Rust",
//   "Go",
//   "Zig",
//   "RabbitMQ",
//   "Kafka",
//   "OpenTelemetry",
//   "AI",
//   "ML",
//   "DL",
// ];

// export const TAGS = [...new Set(rawTags)];
