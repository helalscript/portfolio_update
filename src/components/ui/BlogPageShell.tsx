import type { ReactNode } from 'react'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

export function BlogPageBackground() {
    return (
        <>
            <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0b0f1a]" aria-hidden />
            <div className="pointer-events-none fixed inset-0 -z-10 bg-brevo-grid" aria-hidden />
            <div
                className="pointer-events-none fixed -top-[200px] -right-[150px] -z-10 h-[600px] w-[600px] rounded-full bg-[#10b981] opacity-[0.18] blur-[120px]"
                aria-hidden
            />
            <div
                className="pointer-events-none fixed bottom-[10%] -left-[100px] -z-10 h-[400px] w-[400px] rounded-full bg-[#3b82f6] opacity-[0.18] blur-[120px]"
                aria-hidden
            />
        </>
    )
}

interface BlogPageShellProps {
    children: ReactNode
    className?: string
    /** Single post layout — narrower like laravel-brevo-blog.html (820px) */
    variant?: 'list' | 'article'
}

export function BlogPageShell({ children, className, variant = 'list' }: BlogPageShellProps) {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    if (!isDark) {
        return (
            <div className={cn('min-h-screen bg-background text-foreground pt-20', className)}>
                <div
                    className={cn(
                        'mx-auto px-4 sm:px-6 lg:px-8',
                        variant === 'article' ? 'max-w-[820px]' : 'max-w-7xl'
                    )}
                >
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className={cn('blog-page relative min-h-screen pt-20 text-[#e8edf5]', className)}>
            <BlogPageBackground />
            <div
                className={cn(
                    'relative z-10 mx-auto px-4 sm:px-6 lg:px-8',
                    variant === 'article' ? 'max-w-[820px]' : 'max-w-7xl'
                )}
            >
                {children}
            </div>
        </div>
    )
}

interface BlogPageSectionProps {
    children: ReactNode
    className?: string
}

/** Full-width section below article (e.g. related posts) — same HTML background */
export function BlogPageWideSection({ children, className }: BlogPageSectionProps) {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    if (!isDark) {
        return (
            <section className={cn('bg-muted/30 py-16 border-t', className)}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
            </section>
        )
    }

    return (
        <section className={cn('blog-page blog-related relative z-10 border-t border-white/[0.07] py-16', className)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </section>
    )
}
