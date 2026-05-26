function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function span(cls: string, text: string): string {
  return `<span class="${cls}">${escapeHtml(text)}</span>`
}

const PHP_KEYWORDS = new Set([
  'namespace', 'use', 'class', 'extends', 'implements', 'public', 'private',
  'protected', 'static', 'function', 'return', 'new', 'try', 'catch', 'throw',
  'if', 'else', 'elseif', 'foreach', 'as', 'while', 'do', 'switch', 'case',
  'break', 'continue', 'default', 'void', 'true', 'false', 'null', 'fn',
])

const PHP_KEYWORD_PHRASES = ['public function', 'private function', 'protected function']

function highlightPhpLine(line: string): string {
  const trimmed = line.trimStart()
  if (trimmed.startsWith('//')) {
    const indent = line.slice(0, line.indexOf('//'))
    return indent + span('cm', line.slice(indent.length))
  }

  let out = ''
  let i = 0

  while (i < line.length) {
  if (line.slice(i, i + 2) === '//') {
      out += span('cm', line.slice(i))
      break
    }

    if (line[i] === "'" || line[i] === '"') {
      const q = line[i]
      let j = i + 1
      while (j < line.length) {
        if (line[j] === '\\') {
          j += 2
          continue
        }
        if (line[j] === q) {
          j++
          break
        }
        j++
      }
      out += span('str', line.slice(i, j))
      i = j
      continue
    }

    if (line[i] === '$') {
      let j = i + 1
      while (j < line.length && /[\w]/.test(line[j])) j++
      out += span('var', line.slice(i, j))
      i = j
      continue
    }

    if (line.slice(i, i + 2) === '::') {
      out += span('pun', '::')
      i += 2
      continue
    }

    if (line.slice(i, i + 2) === '->') {
      out += span('op', '->')
      i += 2
      continue
    }

    if (line.slice(i, i + 2) === '=>') {
      out += span('op', '=>')
      i += 2
      continue
    }

    if (/[=;,()[\]{}]/.test(line[i])) {
      const ch = line[i]
      const cls = ch === '=' ? 'op' : 'pun'
      out += span(cls, ch)
      i++
      continue
    }

    if (/[a-zA-Z_\\]/.test(line[i])) {
      let phraseMatched = false
      for (const phrase of PHP_KEYWORD_PHRASES) {
        if (line.slice(i).startsWith(phrase)) {
          const after = line[i + phrase.length]
          if (!/[a-zA-Z0-9_]/.test(after ?? '')) {
            out += span('kw', phrase)
            i += phrase.length
            phraseMatched = true
            break
          }
        }
      }
      if (phraseMatched) continue

      let j = i
      while (j < line.length && /[\w\\]/.test(line[j])) j++
      const word = line.slice(i, j)
      const next = line[j]

      if (PHP_KEYWORDS.has(word)) {
        out += span('kw', word)
      } else if (/^\d+$/.test(word)) {
        out += span('num', word)
      } else if (next === '(' || (next === ':' && line[j + 1] === ':')) {
        out += span(/^[A-Z]/.test(word) || word.includes('\\') ? 'cls' : 'fn', word)
      } else if (/^[A-Z]/.test(word) || word.includes('\\')) {
        out += span('cls', word)
      } else {
        out += span('fn', word)
      }
      i = j
      continue
    }

    out += escapeHtml(line[i])
    i++
  }

  return out
}

function highlightPhp(code: string): string {
  return code.split('\n').map(highlightPhpLine).join('\n')
}

function highlightEnvLine(line: string): string {
  const trimmed = line.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('#')) {
    return span('cm', line)
  }
  const eq = line.indexOf('=')
  if (eq === -1) return escapeHtml(line)
  const key = line.slice(0, eq)
  const value = line.slice(eq + 1)
  const valueTrim = value.trim()
  const isPlaceholder =
    valueTrim.includes('your_') ||
    valueTrim.includes('example') ||
    (!valueTrim.startsWith('"') &&
      !valueTrim.startsWith("'") &&
      /^[a-z0-9_]+$/i.test(valueTrim))

  const valueCls =
    valueTrim.startsWith('"') || valueTrim.startsWith("'") ? 'str' : isPlaceholder ? 'env' : 'str'

  return span('key', key) + span('op', '=') + span(valueCls, value)
}

function highlightEnv(code: string): string {
  return code.split('\n').map(highlightEnvLine).join('\n')
}

function highlightBash(code: string): string {
  const parts = code.trim().split(/(\s+)/)
  return parts
    .map((part) => {
      if (/^\s+$/.test(part)) return part
      if (part === 'composer' || part === 'require' || part === 'php' || part === 'artisan') {
        return span('fn', part)
      }
      if (part.includes('/') || part.includes('-')) {
        return span('str', part)
      }
      return escapeHtml(part)
    })
    .join('')
}

export function highlightCode(code: string, lang: string): string {
  const normalized = lang.toLowerCase()
  switch (normalized) {
    case 'php':
      return highlightPhp(code)
    case 'env':
      return highlightEnv(code)
    case 'bash':
    case 'shell':
      return highlightBash(code)
    default:
      return escapeHtml(code)
  }
}
