import { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'en' | 'bn'

type LanguageProviderProps = {
    children: React.ReactNode
    defaultLanguage?: Language
    storageKey?: string
}

type LanguageProviderState = {
    language: Language
    setLanguage: (language: Language) => void
}

const initialState: LanguageProviderState = {
    language: 'en',
    setLanguage: () => null,
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
    children,
    defaultLanguage = 'en',
    storageKey = 'portfolio-language',
    ...props
}: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(() => {
        const stored = localStorage.getItem(storageKey)
        return stored === 'bn' || stored === 'en' ? stored : defaultLanguage
    })

    useEffect(() => {
        document.documentElement.lang = language === 'bn' ? 'bn' : 'en'
    }, [language])

    const value = {
        language,
        setLanguage: (next: Language) => {
            localStorage.setItem(storageKey, next)
            setLanguageState(next)
        },
    }

    return (
        <LanguageProviderContext.Provider {...props} value={value}>
            {children}
        </LanguageProviderContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageProviderContext)

    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }

    return context
}
