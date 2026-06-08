import type { Article } from "../types";

const baseContent = `
In today’s hyper-connected world, digital news platforms shape how we understand events, cultures, and communities.
High-performance web experiences ensure that readers can instantly access information without friction.
When a news site loads slowly, users bounce quickly, often before the first headline becomes visible.
That is why performance, accessibility, and usability are now considered core product features rather than optional enhancements.

Modern frontend frameworks, combined with smart optimization strategies, allow teams to build immersive interfaces that still feel fast and lightweight.
Code splitting, lazy loading, and asset compression help reduce initial bundle size, while caching strategies keep returning visits snappy.
Beyond speed, visual clarity, readable typography, and thoughtful color contrast play a pivotal role in keeping users engaged.

A well-designed article layout guides the reader effortlessly from headline to conclusion.
Clear hierarchy, generous line-height, and responsive spacing make long-form content easier to digest on any device.
As the web evolves, the responsibility of news platforms is not only to deliver accurate information but also to ensure that this information is accessible to everyone, regardless of device, network quality, or physical ability.

Core Web Vitals formalize these expectations into measurable metrics that teams can track.
Largest Contentful Paint, Total Blocking Time, and Cumulative Layout Shift reveal bottlenecks that users actually feel.
By continuously auditing these metrics and iterating on design and implementation, teams can build news portals that feel as smooth as native applications while remaining open, linkable, and shareable across the web.
`;

export const articles: Article[] = Array.from({ length: 20 }).map((_, index) => {
  const id = index + 1;
  return {
    id,
    title: `NovaNews Insight #${id}: Designing Lightning-Fast Experiences`,
    excerpt:
      "Explore how modern web performance practices, Core Web Vitals, and thoughtful UI design combine to create a frictionless reading experience for global audiences.",
    author: id % 2 === 0 ? "Lohitha D." : "Nova Editorial Team",
    date: `2026-06-${id.toString().padStart(2, "0")}`,
    category: id % 3 === 0 ? "Performance" : "Design",
    image: `https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=800&q=60`,
    content: baseContent.repeat(2), // ~1000+ words
  };
});