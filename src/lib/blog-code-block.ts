import { highlightCode } from './blog-syntax-highlight'

/** Code block markup matching laravel-brevo-blog.html editor UI */
export function codeBlock(file: string, lang: string, code: string): string {
  const highlighted = highlightCode(code.trim(), lang)
  return `<div class="code-block">  <div class="code-head">
    <span class="code-file">${file}</span>
    <div class="code-head-actions">
      <span class="lang-badge">${lang}</span>
      <button type="button" class="copy-btn">copy</button>
    </div>
  </div>
  <pre><code>${highlighted}</code></pre>
</div>`
}