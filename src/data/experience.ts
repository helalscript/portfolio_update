export interface ExperienceItem {
    role: string
    company: string
    period: string
    description: string
}

export interface EducationItem {
    degree: string
    school: string
    period: string
    description: string
}

export interface CertificationItem {
    title: string
    issuer: string
    date: string
}

export const experiences: ExperienceItem[] = [
    {
        role: 'Full Stack Engineer',
        company: 'Tech Solutions Inc.',
        period: '2023 - Present',
        description: 'Leading development of scalable web applications using Laravel and React ecosystem.'
    },
    {
        role: 'Backend Developer',
        company: 'Digital Systems',
        period: '2021 - 2023',
        description: 'Architected RESTful APIs and microservices for high-traffic platforms.'
    },
    {
        role: 'Web Developer',
        company: 'Creative Agency',
        period: '2020 - 2021',
        description: 'Built communicative websites and e-commerce solutions for various clients.'
    }
]

export const education: EducationItem[] = [
    {
        degree: "B.Sc. in Computer Science",
        school: "National University",
        period: "2018 - 2022",
        description: "Focus on Software Engineering and Database Systems."
    }
]

export const certifications: CertificationItem[] = [
    {
        title: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023"
    },
    {
        title: "Laravel Certified Developer",
        issuer: "Laravel",
        date: "2022"
    }
]
