export interface Project {
    id: string
    title: string
    description: string
    longDescription: string
    tech: string[]
    link?: string
    stats?: string
    icon: string
    image?: string
    features?: string[]
}

export const projects: Project[] = [
    {
        id: 'ayosph',
        title: 'Ayosph - Worker Hire Platform',
        description: 'Cross-platform job hiring solution with GPS-based discovery, real-time chat, and automated payment splitting system.',
        longDescription: 'A comprehensive platform connecting daily wage workers with employers. Features include real-time location tracking, secure in-app messaging, automated payment splitting using Stripe Connect, and a robust review system. Built with scalability in mind using microservices architecture.',
        tech: ['Laravel', 'MySQL', 'Firebase', 'PayMongo', 'Pusher', 'AWS'],
        link: 'https://ayosph.com',
        stats: '500+ Downloads',
        icon: '🚀',
        features: [
            'Real-time GPS tracking of workers',
            'Secure in-app chat system',
            'Automated payment splitting',
            'Worker verification system',
            'Multi-language support'
        ]
    },
    {
        id: 'hotel-system',
        title: 'Easy-To-Manage Hotel System',
        description: 'Multi-tenant hotel management platform with digital key access, real-time messaging, and flexible payment processing.',
        longDescription: 'An all-in-one solution for small to medium hotels. Manages bookings, housekeeping, inventory, and guest communications. Unique feature includes digital key access via mobile app and automated check-in/check-out flows.',
        tech: ['Laravel', 'MySQL', 'Stripe', 'Firebase', 'Pusher'],
        stats: 'Final QA Phase',
        icon: '🏨',
        features: [
            'Digital key and check-in system',
            'Housekeeping management',
            'Inventory tracking',
            'Multi-tenant architecture',
            'Channel manager integration'
        ]
    },
    {
        id: 'kolchie',
        title: 'Kolchie Marketplace',
        description: 'Scalable freelance service marketplace with Service Pattern architecture and subscription-based access control.',
        longDescription: 'A niche freelance marketplace focused on creative services. Implements complex subscription logic, escrow payments, and a dispute resolution center. Optimized for high concurrency using Redis caching and queue workers.',
        tech: ['Laravel Blade', 'Livewire', 'MySQL', 'Pusher'],
        icon: '💼',
        features: [
            'Service Pattern architecture',
            'Subscription-based access',
            'Escrow payment system',
            'Dispute resolution center',
            'Advanced search & filtering'
        ]
    },
    {
        id: 'production-automation',
        title: 'Production Automation',
        description: 'Complete production management with RFID tracking, inventory control, and comprehensive reporting system.',
        longDescription: 'Industrial automation software for manufacturing plants. Tracks raw materials to finished goods using RFID tags. Generates real-time efficiency reports and predictive maintenance alerts for machinery.',
        tech: ['PHP', 'JavaScript', 'MySQL', 'jQuery'],
        link: 'https://www.production.helalscript.com',
        icon: '⚙️',
        features: [
            'RFID inventory tracking',
            'Real-time production dashboard',
            'Predictive maintenance alerts',
            'Supply chain management',
            'Detailed analytical reporting'
        ]
    }
]
