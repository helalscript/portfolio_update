import { useTheme } from '@/components/theme-provider'

export function PageBackground() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    if (!isDark) return null

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-brevo-grid" />
            <div className="absolute -top-[200px] -right-[150px] w-[600px] h-[600px] rounded-full bg-emerald-500 opacity-[0.18] blur-[120px]" />
            <div className="absolute bottom-[10%] -left-[100px] w-[400px] h-[400px] rounded-full bg-blue-500 opacity-[0.18] blur-[120px]" />
        </div>
    )
}
