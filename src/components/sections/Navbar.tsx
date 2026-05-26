import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { useTheme } from '@/components/theme-provider'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavbarProps {
    isScrolled: boolean
    activeSection: string
    onNavigate: (section: string) => void
}

export function Navbar({ isScrolled }: NavbarProps) {
    const { resolvedTheme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = ['Home', 'Projects', 'Experience', 'Skills', 'Blog', 'Contact']

    const toggleTheme = () => {
        setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark')
    }

    const inactiveLinkClass = 'text-foreground/80 hover:text-foreground'

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            "bg-background/95 dark:bg-[#0b0f1a]/90 backdrop-blur-xl border-b border-border",
            isScrolled || isMenuOpen ? 'shadow-md' : 'shadow-sm'
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold text-foreground cursor-pointer">
                        Helal Uddin
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-6">
                        {navItems.map((item) => (
                            <NavLink
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={({ isActive }) => cn(
                                    "text-sm font-medium transition-colors relative py-1 hover:text-primary",
                                    isActive ? "text-primary font-semibold" : inactiveLinkClass
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        {item}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                        <LanguageToggle className="ml-1" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-foreground"
                        >
                            {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        <LanguageToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-foreground"
                        >
                            {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-foreground"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border bg-background">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => cn(
                                    "block w-full text-left px-3 py-3 text-base font-medium rounded-md transition-colors",
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                                )}
                            >
                                {item}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
