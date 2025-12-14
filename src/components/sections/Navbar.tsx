import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = ['Home', 'Projects', 'Experience', 'Skills', 'Blog', 'Contact']

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            (isScrolled || isMenuOpen)
                ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
                : 'bg-transparent'
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold cursor-pointer">
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
                                    isActive ? "text-primary font-semibold" : "text-muted-foreground"
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
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="ml-2"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
