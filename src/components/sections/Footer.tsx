import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-border bg-background/50 backdrop-blur-sm pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            Helal Uddin
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Crafting scalable web solutions and digital experiences with passion and precision.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Projects', 'Experience', 'Blog', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Services</h4>
                        <ul className="space-y-3">
                            {['Web Development', 'API Design', 'Cloud Solutions', 'Technical Consulting'].map((item) => (
                                <li key={item} className="text-muted-foreground text-sm">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
                        <p className="text-muted-foreground text-sm mb-4">
                            Subscribe to my newsletter for the latest tech articles.
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-background" />
                            <Button size="icon">
                                <Mail className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Helal Uddin. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using React & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    )
}
