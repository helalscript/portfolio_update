import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { blogs } from '@/data/blogs'
import { useLanguage } from '@/components/language-provider'
import { useLocalizedBlog, useLocalizedBlogs } from '@/hooks/use-localized-blogs'
import { BlogCard } from '@/components/ui/blog-card'
import { BlogPageShell, BlogPageWideSection } from '@/components/ui/BlogPageShell'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { BlogArticleBody } from '@/components/ui/BlogArticleBody'

export function SingleBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'
    const { language } = useLanguage()
    const rawBlog = blogs.find(b => b.id === id)
    const blog = useLocalizedBlog(rawBlog)
    const relatedBlogs = useLocalizedBlogs()
        .filter(b => b.id !== id)
        .slice(0, 3)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id, language])

    if (!blog) {
        return (
            <BlogPageShell variant="article">
                <div className="flex flex-col items-center justify-center py-32">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">Article Not Found</h2>
                    <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
                </div>
            </BlogPageShell>
        )
    }

    return (
        <>
            <BlogPageShell variant="article">
                <article className="py-12 animate-fade-up">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
                        <span>/</span>
                        <button onClick={() => navigate('/blog')} className="hover:text-primary transition-colors">Blog</button>
                        <span>/</span>
                        <span className="text-foreground truncate max-w-[200px]">{blog.title}</span>
                    </nav>

                    <header className="mb-10">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {blog.tags.map(tag => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className={cn(
                                        'px-3 py-1 rounded-full text-[10px] uppercase tracking-wider',
                                        isDark
                                            ? 'border border-emerald-500/25 bg-emerald-500/10 text-[#10b981] hover:bg-emerald-500/20 font-mono'
                                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                                    )}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-3xl sm:text-[2.8rem] font-bold mb-5 leading-tight text-foreground tracking-tight">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={cn(
                                    'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs',
                                    isDark ? 'blog-surface blog-muted' : 'bg-muted border-border text-muted-foreground'
                                )}
                            >
                                <Calendar className={cn('w-3.5 h-3.5', isDark ? 'text-[#10b981]' : 'text-primary')} /> {blog.date}
                            </span>
                            <span
                                className={cn(
                                    'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs',
                                    isDark ? 'blog-surface blog-muted' : 'bg-muted border-border text-muted-foreground'
                                )}
                            >
                                <Clock className={cn('w-3.5 h-3.5', isDark ? 'text-[#10b981]' : 'text-primary')} /> {blog.readTime}
                            </span>
                        </div>
                    </header>

                    {blog.image && (
                        <div className="rounded-2xl overflow-hidden mb-12 border border-border shadow-lg">
                            <img src={blog.image} alt={blog.title} className="w-full max-h-[420px] object-cover" />
                        </div>
                    )}

                    <BlogArticleBody
                        html={blog.content}
                        className={cn('max-w-none', isDark ? 'blog-prose' : 'article-prose')}
                    />

                    <hr className="my-12 border-border" />

                    <div
                        className={cn(
                            'flex justify-between items-center p-6 rounded-xl border',
                            isDark ? 'blog-author' : 'bg-muted/30 border-border'
                        )}
                    >
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Written by</p>
                            <p className="font-bold text-lg text-foreground">Helal Uddin</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 rounded-full">
                            <Share2 className="w-4 h-4" /> Share Article
                        </Button>
                    </div>
                </article>
            </BlogPageShell>

            <BlogPageWideSection>
                <h3 className="text-2xl font-bold mb-8 text-foreground">Related Articles</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {relatedBlogs.map(related => (
                        <BlogCard key={related.id} blog={related} blogSurface={isDark} />
                    ))}
                </div>
            </BlogPageWideSection>
        </>
    )
}
