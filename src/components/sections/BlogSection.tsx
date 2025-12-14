import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { blogs } from '@/data/blogs'
import { Link } from 'react-router-dom'
import { BlogCard } from '@/components/ui/blog-card'

export function BlogSection() {
    // First blog is featured, next 3 are grid
    const featuredBlog = blogs[0]
    const gridBlogs = blogs.slice(1, 4)

    return (
        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 animate-fade-up">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-5xl font-bold mb-4">News & Updates</h2>
                        <p className="text-muted-foreground text-lg">
                            Latest insights on technology and development.
                        </p>
                    </div>
                    <Link to="/blog">
                        <Button variant="default" className="rounded-full px-6 gap-2">
                            More articles <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="space-y-8">
                    {/* Featured Post */}
                    <BlogCard blog={featuredBlog} variant="featured" />

                    {/* Standard Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gridBlogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
