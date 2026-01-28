interface ContentBlock {
  type: "text" | "image" | "quote";
  text?: string;
  url?: string;
  caption?: string;
  author?: string;
}

export interface Project {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  category: string;
  link: string;
  excerpt: string;
  content: ContentBlock[];
}

interface Projects {
  [key: number]: Project;
}

export const projects: Projects = {
  1: {
    title: "PrafulReed",
    subtitle: "Showcasing Precision in Textile Engineering",
    date: "January 2026",
    author: "Prafulreed & Heald Frame Pvt. Ltd.",
    category: "Industrial Manufacturing",
    link: "https://prafulreed.com",
    excerpt:
      "A comprehensive online presence highlighting Prafulreed's expertise in precision reed and heald frame manufacturing, with a focus on engineering excellence and client-focused solutions.",
    content: [
      {
        type: "text",
        text: "Prafulreed.com serves as the digital front of Prafulreed & Heald Frame Pvt. Ltd., a leader in precision reed manufacturing for the textile industry. The website reflects the company's commitment to engineering accuracy, high-quality materials, and innovation in production processes.",
      },
      {
        type: "image",
        url: "/asset/project1_4.png",
        caption: "Homepage overview with modern industrial design elements",
      },
      {
        type: "text",
        text: "The website is designed to clearly communicate the company's capabilities, including the use of German and Korean raw materials, cost-effective reconditioned Airjet reeds, and custom manufacturing solutions for both small and large textile firms.",
      },
      {
        type: "quote",
        text: "Precision is not an act, it’s a habit — and it defines everything we build.",
        author: "Prafulreed",
      },
      {
        type: "text",
        text: "The interface balances technical detail with user-friendly navigation, making it easy for prospective clients to explore product offerings, certifications, and past collaborations. Rich imagery and technical illustrations showcase the quality and precision of the manufacturing process.",
      },
      {
        type: "image",
        url: "/asset/project1_5.png",
        caption:
          "Detailed product pages highlighting precision reed components",
      },
      {
        type: "text",
        text: "Through this website, users gain a clear understanding of Prafulreed’s commitment to quality, innovation, and cost-efficient solutions, helping businesses make informed decisions about textile manufacturing components.",
      },
    ],
  },
  2: {
    title: "Dishoom",
    subtitle: "A Digital Tribute to Bombay’s Timeless Café Culture",
    date: "November 2024",
    author: "Creative Web Project",
    category: "UI / Brand Experience",
    link: "https://dishoom-static.vercel.app",
    excerpt:
      "A visually rich web experience inspired by Dishoom’s iconic Bombay cafés, blending storytelling, typography, and atmosphere into a seamless digital journey.",
    content: [
      {
        type: "text",
        text: "This project focuses on translating Dishoom’s soulful, nostalgic brand identity into a modern digital interface. Rather than a conventional restaurant website, the goal was to evoke emotion—warmth, heritage, and a sense of place—through layout, imagery, and motion.",
      },
      {
        type: "image",
        url: "/asset/project2_1.png",
        caption: "Homepage layout inspired by Dishoom’s brand aesthetic",
      },
      {
        type: "text",
        text: "Carefully chosen typography, muted color palettes, and generous spacing mirror the calm yet character-rich ambience of Dishoom cafés. Every section is designed to feel editorial, allowing users to explore the story behind the brand rather than simply consume information.",
      },
      {
        type: "text",
        text: "Subtle interactions and smooth transitions enhance the browsing experience without overpowering the content. The result is a website that feels handcrafted—where design serves storytelling, and storytelling strengthens the brand connection.",
      },
    ],
  },

  3: {
    title: "SWH BLOG",
    subtitle: "A Minimal Static Blog Experience",
    date: "October 2024",
    author: "Personal Web Project",
    category: "Frontend / UI Design",
    link: "https://blogstaticpage.vercel.app",
    excerpt:
      "A clean and thoughtfully designed static blog that emphasizes readability, structure, and calm visual rhythm for distraction-free content consumption.",
    content: [
      {
        type: "text",
        text: "This project explores the beauty of simplicity in digital publishing. The focus was on creating a blog layout that feels light, intentional, and effortless—where content takes priority and design quietly supports the reading experience.",
      },
      {
        type: "image",
        url: "/asset/project3_1.png",
        caption: "Minimal blog layout with strong typography and spacing",
      },
      {
        type: "text",
        text: "Typography, spacing, and layout hierarchy were carefully refined to improve readability across devices. The static structure ensures fast load times while maintaining a polished, modern appearance suitable for long-form content.",
      },
      {
        type: "quote",
        text: "Good design is as little design as possible.",
        author: "Dieter Rams",
      },
    ],
  },
};
