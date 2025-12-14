export interface Skill {
    name: string
    icon: string
    description: string
}

export interface SkillCategory {
    title: string
    skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Backend Ecosystem",
        skills: [
            { name: "Laravel", icon: "🔴", description: "Advanced Framework" },
            { name: "PHP", icon: "🐘", description: "Modern PHP 8+" },
            { name: "MySQL", icon: "🗄️", description: "Database Optimization" },
            { name: "REST API", icon: "🔌", description: "Scalable Architecture" },
            { name: "Redis", icon: "⚡", description: "Caching & Queues" }
        ]
    },
    {
        title: "Frontend & Tools",
        skills: [
            { name: "React.js", icon: "⚛️", description: "Component Library" },
            { name: "Vue.js", icon: "💚", description: "Progressive Framework" },
            { name: "Tailwind CSS", icon: "🎨", description: "Modern Styling" },
            { name: "Docker", icon: "🐳", description: "Containerization" },
            { name: "Git", icon: "📦", description: "Version Control" }
        ]
    }
]
