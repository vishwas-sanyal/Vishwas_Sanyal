export const NAME = "Vishwas Sanyal";
export const ROLE = "Full Stack Engineer";
export const BIO_SUBTITLE = "Full Stack Engineer";
export const BIO_TEXT =
  "Full-Stack Developer focused on building intelligent web applications, network tools, and AI-powered systems. Experienced with React, Node.js, Python, custom MCP servers, and vector-based RAG pipelines. Interested in backend engineering, distributed systems, and integrating AI into practical software solutions. Always exploring, experimenting, and building beyond the basics.";

export const SKILL_GROUPS = [
  {
    label: "// Core",
    items: ["JavaScript", "C/C++", "Python"],
  },
  {
    label: "// Backend & Infra",
    items: ["Node.js", "Express.js", "RestAPI", "Docker", "Linux", "Git/Github"],
  },
  {
    label: "// Frontend",
    items: ["HTML/CSS", "React.js", "Next.js"],
  },
  {
    label: "// AI",
    items: ["RAG", "Qdrant", "Ollama", "MCP", "n8n"],
  },
];

export const PROJECTS = [
  {
    id: "netseek",
    index: "01",
    name: "NetSeek",
    link: "https://github.com/vishwas-sanyal/NetSeek",
    linkLabel: "Link",
    dot: "bg-emerald-400",
    summary:
      "Developed a real-time AI search application that queries and parses 15+ target websites simultaneously using SearXNG. Built automated web scraping pipelines to extract and clean unstructured text from live pages. Saved and indexed text embeddings into a Qdrant Vector Database to enable accurate semantic data lookups. Integrated the Gemma language model to analyze retrieved data and generate clear, accurate answers for user queries.",
    stack: ["Python", "Next.js", "SearXNG", "Qdrant", "Docker"],
  },
  {
    id: "nettrace",
    index: "02",
    name: "NetTrace",
    link: "https://github.com/vishwas-sanyal/NetTrace-mcp",
    linkLabel: "Link",
    dot: "bg-accent-cyan",
    summary:
      "Engineered a secure server using Model Context Protocol (MCP) to let LLMs run Nmap scans safely. Parsed complex raw network scan outputs into clean, structured JSON data for the AI model to read. Implemented strict command validation rules to prevent unauthorized terminal access or unsafe network actions.",
    stack: ["Node.js", "Docker"],
  },
  {
    id: "webtor",
    index: "03",
    name: "WebTor",
    link: "https://github.com/vishwas-sanyal/WebTor",
    linkLabel: "Link",
    dot: "bg-accent-indigo",
    summary:
      "Built a custom BitTorrent web client that handles direct peer-to-peer network connections and handshakes. Created a parallel, chunk-based downloading system to handle file pieces and manage assembly. Designed a responsive web dashboard using Socket.io to stream real-time download speeds and progress metrics.",
    stack: ["React.js", "Node.js", "Express.js", "Socket.io", "P2P Protocols"],
  },
  {
    id: "vjazz",
    index: "04",
    name: "V-Jazz",
    link: "https://github.com/vishwas-sanyal/Virtual-Instrument",
    linkLabel: "Link",
    dot: "bg-amber-400",
    summary:
      "A fun Python project where you can play Drums, Guitar, and Piano using only your hand gestures and a webcam — no physical instruments needed! Built using OpenCV and MediaPipe, this project detects hand movements to trigger virtual sounds.",
    stack: ["Python", "OpenCV", "Mediapipe"],
  },
  {
    id: "xpenso",
    index: "05",
    name: "Xpenso",
    link: "https://github.com/vishwas-sanyal/Expense-Track",
    linkLabel: "Link",
    dot: "bg-accent-violet",
    summary:
      "Developed a mobile-friendly progressive web app for daily expense tracking and deployed it live on Vercel. Integrated IndexedDB storage to allow complete offline functionality and save user logs directly inside the browser. Created clean dashboard data filters to show interactive weekly spending graphs and financial overviews.",
    stack: ["React.js", "IndexedDB", "Vercel"],
  },
  {
    id: "asl",
    index: "06",
    name: "ASL",
    link: "https://github.com/vishwas-sanyal/ASL",
    linkLabel: "Link",
    dot: "bg-rose-400",
    summary:
      "This project uses MediaPipe and OpenCV to detect American Sign Language (ASL) hand gestures using your webcam in real time.",
    stack: ["Python", "Mediapipe", "OpenCV"],
  },
];

export const EMAIL = "kunuuu0.0@gmail.com";
export const GITHUB_URL = "https://github.com/vishwas-sanyal";
export const LINKEDIN_URL = "https://www.linkedin.com/in/vishwas-sanyal/";
