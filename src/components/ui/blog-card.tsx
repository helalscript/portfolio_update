import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { BlogPost } from '@/data/blogs'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface BlogCardProps {
    blog: BlogPost
    variant?: 'featured' | 'standard'
    className?: string
}

export function BlogCard({ blog, variant = 'standard', className }: BlogCardProps) {
    // Featured variant (Horizontal layout)
    if (variant === 'featured') {
        return (
            <Link to={`/blog/${blog.id}`} className={cn("group block w-full", className)}>
                <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl bg-card">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Image Side */}
                        <div className="h-64 md:h-full overflow-hidden">
                            <img
                                src={blog.image || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80'}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Content Side */}
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                {blog.title}
                            </h3>
                            <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                                {blog.excerpt}
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-md px-3 py-1 uppercase text-xs tracking-wider">
                                    {blog.tags[0]}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{blog.date}</span>
                                <span className="text-sm text-muted-foreground">• {blog.readTime}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        )
    }

    // Standard variant (Vertical layout)
    return (
        <Link to={`/blog/${blog.id}`} className={cn("group h-full", className)}>
            <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg bg-card flex flex-col">
                <div className="h-48 overflow-hidden">
                    <img
                        src={blog.image || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80'}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                        {blog.excerpt}
                    </p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center gap-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wider">
                        {blog.tags[0]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{blog.date}</span>
                    <span className="text-xs text-muted-foreground">• {blog.readTime}</span>
                </CardFooter>
            </Card>
        </Link>
    )
}
