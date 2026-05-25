import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ResolvedTheme = "light" | "dark"

type ThemeProviderState = {
    theme: Theme
    resolvedTheme: ResolvedTheme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    resolvedTheme: "dark",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark")

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        let applied: ResolvedTheme = "light"

        if (theme === "system") {
            applied = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
        } else {
            applied = theme
        }

        root.classList.add(applied)
        setResolvedTheme(applied)
    }, [theme])

    const value = {
        theme,
        resolvedTheme,
        setTheme: (next: Theme) => {
            localStorage.setItem(storageKey, next)
            setThemeState(next)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
