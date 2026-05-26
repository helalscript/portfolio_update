import { useLanguage, type Language } from '@/components/language-provider'
import { cn } from '@/lib/utils'

const options: { value: Language; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'bn', label: 'BN' },
]

export function LanguageToggle({ className }: { className?: string }) {
    const { language, setLanguage } = useLanguage()

    return (
        <div
            className={cn(
                'flex items-center rounded-full border border-border p-0.5',
                className
            )}
            role="group"
            aria-label="Select language"
        >
            {options.map(({ value, label }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => setLanguage(value)}
                    className={cn(
                        'px-2.5 py-1 text-xs font-semibold rounded-full transition-colors',
                        language === value
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                    aria-pressed={language === value}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
