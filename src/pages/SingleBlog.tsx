import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { blogs } from '@/data/blogs'
import { BlogCard } from '@/components/ui/blog-card'

export function SingleBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const blog = blogs.find(b => b.id === id)

    // Suggestion Logic: Get 3 other blogs, preferably with same tags
    const relatedBlogs = blogs
        .filter(b => b.id !== id) // Exclude current
        .slice(0, 3) // Take 3

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
                <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
                    <span>/</span>
                    <button onClick={() => navigate('/blog')} className="hover:text-primary transition-colors">Blog</button>
                    <span>/</span>
                    <span className="text-foreground truncate max-w-[200px]">{blog.title}</span>
                </nav>

                <header className="mb-10 text-center">
                    <div className="flex justify-center gap-2 mb-6">
                        {blog.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20">{tag}</Badge>
                        ))}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight text-gradient">
                        {blog.title}
                    </h1>
                    <div className="flex justify-center items-center gap-6 text-muted-foreground text-sm">
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {blog.date}</span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {blog.readTime}</span>
                    </div>
                </header>

                {/* Hero Image */}
                {blog.image && (
                    <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
                        <img src={blog.image} alt={blog.title} className="w-full max-h-[500px] object-cover" />
                    </div>
                )}

                <div
                    className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:p-4 prose-blockquote:italic prose-blockquote:rounded-r
                    prose-code:bg-muted prose-code:text-primary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <hr className="my-12 border-border" />

                <div className="flex justify-between items-center bg-muted/30 p-6 rounded-lg border border-border/50">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Written by</p>
                        <p className="font-bold text-lg">Helal Uddin</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 rounded-full">
                        <Share2 className="w-4 h-4" /> Share Article
                    </Button>
                </div>
            </article>

            {/* Related Articles Section */}
            <section className="bg-muted/30 py-16 border-t border-border/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {relatedBlogs.map(related => (
                            <BlogCard key={related.id} blog={related} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
