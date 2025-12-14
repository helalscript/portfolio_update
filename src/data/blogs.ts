export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  image?: string
}

export const blogs: BlogPost[] = [
  {
    id: 'laravel-performance-optimization',
    title: 'Advanced Laravel Performance Optimization Techniques',
    excerpt: 'Highnote Emerges from Stealth with $54 Million in Funding. Self-service data analytics software that lets you create visually appealing data visualizations.',
    content: `
      <h2>Introduction</h2>
      <p>Performance is critical for any web application. In this detailed guide, we explored how to optimize Laravel for high-traffic scenarios.</p>
      
      <h3>1. Database Indexing</h3>
      <p>The most common cause of slow applications is unoptimized database queries. Always ensure your "where", "order by", and "group by" columns are indexed.</p>
    `,
    date: 'Oct 3, 2024',
    readTime: '7 min read',
    tags: ['Analytics', 'Backend'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'microservices-with-laravel',
    title: 'Custom Reports Can Go A Long Way For Your Business',
    excerpt: 'Breaking down a monolithic application into manageable microservices using Laravel and RabbitMQ for better scalability.',
    content: `
      <h2>Why Microservices?</h2>
      <p>As applications grow, monoliths can become hard to maintain. Microservices solve this by decoupling domain logic.</p>
    `,
    date: 'Oct 3, 2024',
    readTime: '7 min read',
    tags: ['Analytics', 'Business'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    id: 'react-typescript-best-practices',
    title: 'Surviving through tough times as a first time SaaS Founder',
    excerpt: 'Write cleaner, type-safe React code. We discuss strict mode, proper typing for hooks, and component composition.',
    content: `
      <h2>Type Safety Matters</h2>
      <p>TypeScript catches errors at compile time, saving hours of debugging runtime errors.</p>
    `,
    date: 'Oct 3, 2024',
    readTime: '7 min read',
    tags: ['Business', 'SaaS'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop'
  },
  {
    id: 'secure-authentication-flow',
    title: 'Does Your E-Mail Marketing Strategy Need A Revamp?',
    excerpt: 'Deep dive into JWT, OAuth2, and secure session management for modern web applications.',
    content: `
      <h2>Security First</h2>
      <p>Never rely on client-side validation alone. We explore proper JWT implementation.</p>
    `,
    date: 'Oct 3, 2024',
    readTime: '7 min read',
    tags: ['Marketing', 'Security'],
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: 'docker-for-developers',
    title: 'Mastering Docker for Local Development Environments',
    excerpt: 'Stop saying "It works on my machine". Learn how to containerize your development workflow efficiently.',
    content: `
      <h2>Containerization Basics</h2>
      <p>Docker ensures consistency across environments. This guide covers writing efficient Dockerfiles.</p>
    `,
    date: 'Sep 28, 2024',
    readTime: '6 min read',
    tags: ['DevOps', 'Docker'],
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'aws-deployment-strategies',
    title: 'Blue/Green Deployment Strategies on AWS',
    excerpt: 'Minimize downtime and reduce risk by implementing advanced deployment strategies using AWS CodeDeploy.',
    content: `
      <h2>Zero Downtime</h2>
      <p>Deploying new features shouldn't mean taking your site offline. Blue/Green deployments solve this.</p>
    `,
    date: 'Sep 15, 2024',
    readTime: '10 min read',
    tags: ['Cloud', 'AWS'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  },
  {
    id: 'modern-css-features',
    title: 'Modern CSS Features You Should Be Using in 2025',
    excerpt: 'From Container Queries to nesting, CSS has evolved rapidly. Here is what you need to know.',
    content: `
      <h2>CSS Evolution</h2>
      <p>CSS is no longer just for styling. It now has powerful layout and logic capabilities.</p>
    `,
    date: 'Aug 30, 2024',
    readTime: '5 min read',
    tags: ['Frontend', 'CSS'],
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop'
  }
]
