import { Code2, Github, Globe, Mail } from 'lucide-react'
import { Typewriter } from '@/components/ui/Typewriter'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

interface HeroProps {
    onNavigate: (section: string) => void
}

export function Hero({ onNavigate }: HeroProps) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Linear Gradient Grid Background */}
            <div
                className={`absolute inset-0 -z-10 h-full w-full bg-grid-pattern ${isDark ? 'bg-grid-custom-dark' : 'bg-grid-custom-light'}`}
                style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
                }}
            ></div>

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="animate-fade-up delay-100 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-card-foreground">
                            <Code2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Full Stack Developer</span>
                        </div>

                        <h1 className="animate-fade-up delay-200 text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                            Hi, I'm{' '}
                            <span className={`whitespace-nowrap ${isDark ? 'text-gradient-dark' : 'text-gradient-light'}`}>
                                <Typewriter text="Helal Uddin" delay={200} />
                            </span>
                        </h1>

                        <p className="animate-fade-up delay-300 text-lg sm:text-xl text-muted-foreground max-w-lg">
                            Laravel Expertise with 2.5+ years of experience building scalable web applications
                            and mobile backends. Passionate about clean code and innovative solutions.
                        </p>

                        <div className="animate-fade-up delay-400 flex flex-wrap gap-4">
                            <Button size="lg" className="rounded-full px-8" onClick={() => onNavigate('projects')}>
                                View Projects
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8" onClick={() => onNavigate('contact')}>
                                Contact Me
                            </Button>
                        </div>

                        <div className="animate-fade-up delay-500 flex gap-4 pt-4">
                            <a href="https://github.com/helalscript" target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                                    <Github className="w-6 h-6" />
                                </Button>
                            </a>
                            <a href="https://www.devhelal.com" target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                                    <Globe className="w-6 h-6" />
                                </Button>
                            </a>
                            <a href="mailto:husoaib422@gmail.com">
                                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                                    <Mail className="w-6 h-6" />
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end animate-fade-up delay-300">
                        <div className="relative group cursor-pointer">
                            {/* Glow Effect */}
                            <div className={`absolute -inset-1 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 ${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-pink-400'}`}></div>

                            {/* Image Container */}
                            <div className={`relative p-2 rounded-[2rem] bg-background border transition-transform duration-500 group-hover:scale-[1.02] ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                                <img
                                    src="/helal_photo.jpg"
                                    alt="Helal Uddin"
                                    className="w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-[1.8rem] shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
