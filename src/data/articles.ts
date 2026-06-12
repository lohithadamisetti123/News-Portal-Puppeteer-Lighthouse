import type { Article } from "../types";

const categoryMap: Record<string, string> = {
  Technology: "#3b82f6",
  "AI & ML": "#8b5cf6",
  Cybersecurity: "#ef4444",
  Climate: "#22c55e",
  Space: "#06b6d4",
  Design: "#f59e0b",
};

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function makeSvgPlaceholder(hue: number, label: string): string {
  const safeLabel = escapeXml(label);
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="hsl(${hue},72%,18%)"/>` +
    `<stop offset="100%" stop-color="hsl(${(hue + 40) % 360},65%,12%)"/>` +
    `</linearGradient></defs>` +
    `<rect width="800" height="450" fill="url(#g)"/>` +
    `<circle cx="400" cy="180" r="60" fill="hsl(${hue},60%,35%)" opacity=".5"/>` +
    `<circle cx="340" cy="220" r="40" fill="hsl(${(hue + 20) % 360},55%,30%)" opacity=".4"/>` +
    `<circle cx="460" cy="240" r="35" fill="hsl(${(hue + 50) % 360},50%,28%)" opacity=".35"/>` +
    `<text x="400" y="340" text-anchor="middle" fill="hsl(${hue},40%,70%)" font-family="system-ui" font-size="18" font-weight="600">${safeLabel}</text>` +
    `</svg>`
  )}`;
}

interface ArticleSeed {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  hue: number;
}

const seeds: ArticleSeed[] = [
  { title: "The Rise of Edge Computing in 2026", excerpt: "Edge computing is transforming how data is processed by bringing computation closer to the source, reducing latency and bandwidth costs for millions of IoT devices worldwide.", author: "Anika Sharma", category: "Technology", hue: 220 },
  { title: "How Transformers Revolutionized NLP", excerpt: "From BERT to GPT-4, transformer architectures have fundamentally changed natural language processing, enabling machines to understand context and nuance like never before.", author: "Marcus Chen", category: "AI & ML", hue: 270 },
  { title: "Zero-Trust Architecture: A Practical Guide", excerpt: "Implementing zero-trust security means verifying every request as though it originates from an untrusted network, regardless of where it actually comes from.", author: "Elena Vasquez", category: "Cybersecurity", hue: 0 },
  { title: "Carbon Capture Technologies Going Mainstream", excerpt: "Direct air capture and bioenergy with carbon capture are scaling up rapidly as governments and corporations invest billions in negative emission technologies.", author: "James Okafor", category: "Climate", hue: 140 },
  { title: "James Webb Telescope Discovers New Exoplanets", excerpt: "NASA's James Webb Space Telescope has identified three potentially habitable exoplanets in the Trappist system with atmospheric signatures suggesting liquid water.", author: "Dr. Sarah Kim", category: "Space", hue: 190 },
  { title: "Designing for Neurodiversity in Digital Products", excerpt: "Inclusive design goes beyond accessibility compliance, embracing the full spectrum of cognitive diversity to create products that work for every mind.", author: "Priya Patel", category: "Design", hue: 40 },
  { title: "WebAssembly Beyond the Browser", excerpt: "Wasm is breaking free from browser constraints, powering serverless functions, IoT firmware, and plugin systems across the computing landscape.", author: "Tomasz Kowalski", category: "Technology", hue: 215 },
  { title: "Federated Learning for Privacy-First AI", excerpt: "Training models across decentralized data sources without exchanging raw data is reshaping how healthcare, finance, and mobile apps approach machine learning.", author: "Dr. Lin Zhang", category: "AI & ML", hue: 280 },
  { title: "The Anatomy of a Modern Ransomware Attack", excerpt: "Understanding the kill chain of ransomware—from initial phishing to lateral movement and data exfiltration—is critical for building effective defenses.", author: "Alex Rivera", category: "Cybersecurity", hue: 350 },
  { title: "Ocean-Based Climate Solutions Gain Momentum", excerpt: "Seaweed farming, ocean alkalinity enhancement, and marine permaculture are emerging as powerful tools in the fight against rising temperatures and acidification.", author: "Fatima Al-Hassan", category: "Climate", hue: 150 },
  { title: "Artemis III: Humanity Returns to the Moon", excerpt: "NASA's Artemis program is set to land the first woman and first person of color on the lunar surface, opening a new chapter in human space exploration.", author: "David Park", category: "Space", hue: 200 },
  { title: "Motion Design Principles for Web Interfaces", excerpt: "Thoughtful animation communicates state changes, guides attention, and creates emotional connection without sacrificing performance or accessibility.", author: "Lena Müller", category: "Design", hue: 35 },
  { title: "Quantum Computing Reaches Error Correction Milestone", excerpt: "IBM and Google have independently demonstrated logical qubits with error rates below the fault-tolerance threshold, bringing practical quantum computing closer to reality.", author: "Raj Krishnamurthy", category: "Technology", hue: 230 },
  { title: "Multimodal AI Models Reshape Content Creation", excerpt: "Models that seamlessly combine text, image, audio, and video understanding are creating new paradigms for creative tools and automated content workflows.", author: "Sophie Bernard", category: "AI & ML", hue: 260 },
  { title: "Supply Chain Security in Open Source Software", excerpt: "Recent high-profile vulnerabilities have highlighted the fragile trust model of open-source dependencies and the urgent need for software bill of materials standards.", author: "Mike Torres", category: "Cybersecurity", hue: 10 },
  { title: "Green Hydrogen Economies in Developing Nations", excerpt: "Countries rich in solar and wind resources are positioning themselves as exporters of green hydrogen, potentially reshaping global energy trade routes.", author: "Amara Osei", category: "Climate", hue: 130 },
  { title: "Private Space Stations: The Next Frontier", excerpt: "As the ISS approaches decommission, commercial space stations from Axiom, Orbital Reef, and Starlab are preparing to take over low-Earth orbit operations.", author: "Natasha Volkov", category: "Space", hue: 185 },
  { title: "The Psychology of Dark Mode Interfaces", excerpt: "Dark mode is more than aesthetic preference—it impacts readability, eye strain, battery life, and even user emotion across different contexts and devices.", author: "Chris Nakamura", category: "Design", hue: 45 },
  { title: "5G Network Slicing for Industrial IoT", excerpt: "Network slicing allows operators to create virtual networks tailored to specific industrial applications, from autonomous vehicles to remote surgery.", author: "Isabella Costa", category: "Technology", hue: 210 },
  { title: "Ethical AI Governance Frameworks Compared", excerpt: "The EU AI Act, NIST AI RMF, and Singapore's Model Framework each take different approaches to regulating artificial intelligence—here is how they stack up.", author: "Dr. Kwame Asante", category: "AI & ML", hue: 275 },
  { title: "Biometric Authentication Beyond Fingerprints", excerpt: "Behavioral biometrics, vein pattern recognition, and gait analysis are pushing authentication security beyond traditional fingerprint and facial recognition methods.", author: "Yuki Tanaka", category: "Cybersecurity", hue: 5 },
  { title: "Rewilding Urban Spaces for Climate Resilience", excerpt: "Cities worldwide are converting parking lots, rooftops, and abandoned infrastructure into biodiverse green corridors that absorb carbon and reduce heat islands.", author: "Maria Santos", category: "Climate", hue: 145 },
  { title: "Mars Sample Return Mission Architecture", excerpt: "The collaborative ESA-NASA Mars Sample Return mission will use an unprecedented relay of landers, ascent vehicles, and orbiters to bring Martian soil to Earth.", author: "Chen Wei", category: "Space", hue: 195 },
  { title: "Variable Fonts and the Future of Web Typography", excerpt: "A single variable font file can replace dozens of static weights and styles, dramatically reducing page load while enabling expressive, responsive typography.", author: "Olivia Hart", category: "Design", hue: 50 },
  { title: "Rust Adoption in Systems Programming", excerpt: "From Linux kernel modules to cloud infrastructure, Rust's memory safety guarantees without garbage collection are driving adoption in mission-critical systems.", author: "Dmitri Petrov", category: "Technology", hue: 225 },
];

function generateContent(seed: ArticleSeed): string {
  const paragraphs = [
    `${seed.title} represents one of the most significant developments in the ${seed.category.toLowerCase()} sector this year. Industry experts and researchers have been closely monitoring progress in this area, and the implications for both consumers and enterprises are profound. As we navigate an increasingly complex technological landscape, understanding these developments becomes essential for informed decision-making.`,

    `The foundation of this advancement lies in years of dedicated research and iterative improvement. Teams across multiple organizations have contributed to the body of knowledge that makes today's breakthroughs possible. From academic laboratories to corporate R&D departments, the collaborative nature of modern innovation has accelerated timelines that were once measured in decades to just a few years.`,

    `One of the most compelling aspects of this development is its potential to democratize access to advanced capabilities. What was once available only to large enterprises with substantial budgets is now within reach of startups, small businesses, and individual practitioners. This democratization is driving a wave of creative applications that the original researchers never anticipated.`,

    `Performance considerations remain at the forefront of implementation strategies. Engineers and architects must balance the desire for cutting-edge features with the practical requirements of reliability, scalability, and maintainability. The best implementations achieve this balance through careful architecture decisions, thorough testing, and continuous monitoring of key performance indicators.`,

    `Security and privacy implications deserve careful attention as these technologies mature. The industry has learned from past mistakes that retrofitting security into established systems is far more costly and error-prone than building it in from the start. Modern frameworks and best practices emphasize security-by-design principles that protect users without creating unnecessary friction.`,

    `The environmental impact of ${seed.category.toLowerCase()} innovations is increasingly important to stakeholders. Organizations are measuring their carbon footprint, optimizing energy consumption, and seeking sustainable approaches to growth. This awareness is driving innovation in green computing, efficient algorithms, and renewable energy integration.`,

    `Looking ahead, the trajectory of this field suggests even more transformative changes on the horizon. Early indicators point to convergence with adjacent technologies that could amplify impact exponentially. Industry analysts project significant market growth over the next five years, with adoption curves steepening as barriers to entry continue to fall.`,

    `Education and workforce development are critical enablers for realizing the full potential of these advancements. Universities are updating curricula, bootcamps are emerging to address skill gaps, and existing professionals are upskilling through continuous learning programs. The talent pipeline is expanding, but demand continues to outpace supply in key areas.`,

    `Standards and interoperability remain active areas of development. Industry consortiums and standards bodies are working to ensure that implementations from different vendors can work together seamlessly. Open standards reduce lock-in risk and encourage a healthy ecosystem of competition and innovation.`,

    `Community collaboration has proven to be one of the most powerful accelerators in ${seed.category.toLowerCase()}. Open-source projects, developer conferences, and knowledge-sharing platforms enable practitioners around the world to learn from each other and build upon shared foundations. This collective intelligence drives faster iteration cycles and more robust solutions than any single organization could achieve alone.`,

    `The intersection of ${seed.category.toLowerCase()} with other disciplines continues to create unexpected opportunities. Cross-pollination between fields like design thinking, behavioral science, data engineering, and domain expertise produces innovations that are greater than the sum of their parts. Organizations that foster interdisciplinary teams consistently outperform those working in silos.`,

    `In conclusion, the developments in ${seed.category.toLowerCase()} that we are witnessing today will have lasting implications for how we build, deploy, and interact with technology. Staying informed, adaptable, and engaged with the community is the best strategy for professionals who want to remain at the forefront of this rapidly evolving landscape.`,
  ];

  return paragraphs.join("\n\n");
}

export const articles: Article[] = seeds.map((seed, index) => {
  const id = index + 1;
  const content = generateContent(seed);
  const wordCount = content.split(/\s+/).length;

  return {
    id,
    title: seed.title,
    excerpt: seed.excerpt,
    author: seed.author,
    date: `2026-${String(Math.floor(index / 5) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
    category: seed.category,
    categoryColor: categoryMap[seed.category] || "#f59e0b",
    image: makeSvgPlaceholder(seed.hue, seed.category),
    content,
    readingTime: Math.max(3, Math.round(wordCount / 200)),
  };
});