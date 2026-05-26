import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface BlogArticleBodyProps {
  html: string
  className?: string
}

export function BlogArticleBody({ html, className }: BlogArticleBodyProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const buttons = root.querySelectorAll<HTMLButtonElement>('.copy-btn')

    const handlers: Array<{ btn: HTMLButtonElement; fn: () => void }> = []

    buttons.forEach((btn) => {
      const fn = async () => {
        const pre = btn.closest('.code-block')?.querySelector('pre')
        const text = pre?.textContent ?? ''
        try {
          await navigator.clipboard.writeText(text)
          btn.textContent = 'copied!'
          btn.classList.add('copied')
          setTimeout(() => {
            btn.textContent = 'copy'
            btn.classList.remove('copied')
          }, 2000)
        } catch {
          btn.textContent = 'error'
          setTimeout(() => {
            btn.textContent = 'copy'
          }, 2000)
        }
      }
      btn.addEventListener('click', fn)
      handlers.push({ btn, fn })
    })

    return () => {
      handlers.forEach(({ btn, fn }) => btn.removeEventListener('click', fn))
    }
  }, [html])

  return (
    <div
      ref={ref}
      className={cn(className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
