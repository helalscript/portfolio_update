export interface ExperienceItem {
    role: string
    company: string
    companyLink: string
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
        company: 'Softvence Agency',
        companyLink: 'https://softvenceagency.com',
        period: '2024 - Present',
        description: 'Leading development of scalable web applications using Laravel and React ecosystem. Handled production deployments and server management. Worked on multiple projects including e-commerce, education, and healthcare applications.'
    },
    {
        role: 'Backend Developer',
        company: 'Prantik Soft',
        companyLink: 'https://prantiksoft.com/',
        period: '2023 - 2024',
        description: 'Architected RESTful APIs and microservices for high-traffic platforms. Developed real-time features using Pusher and Firebase.'
    },
]

export const education: EducationItem[] = [

    {
        degree: "Web Application Development (Laravel, Vue.js, React.js, WordPress)",
        school: "IsDB-BISEW IT Scholarship Program",
        period: "2022 - 2023", // Assuming a typical program duration
        description: "Comprehensive training in modern web application development frameworks and tools. Focus on Software Engineering and Database Systems."
    },
    {
        degree: "Master of Arts (Bangla)",
        school: "University of Dhaka",
        period: "2020-2021", // Assuming completion year
        description: ""
    },
    {
        degree: "Bachelor of Arts (Bangla)",
        school: "University of Dhaka",
        period: "2016-2020", // Assuming completion year
        description: ""
    }
]

export const certifications: CertificationItem[] = [
    {
        title: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023"
    },
    // {
    //     title: "Laravel Certified Developer",
    //     issuer: "Laravel",
    //     date: "2022"
    // },

]
