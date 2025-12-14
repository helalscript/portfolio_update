import { useState, useEffect } from 'react'
import { Search, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { blogs } from '@/data/blogs'
import { BlogCard } from '@/components/ui/blog-card'

const ITEMS_PER_PAGE = 5 // 1 Featured + 4 Grid per page

export function AllBlogs() {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPage])

    // Filter Logic
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )

    // Pagination Logic
    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentBlogs = filteredBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const featuredBlog = currentBlogs[0]
    const gridBlogs = currentBlogs.slice(1)

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-up">
                    <div className="w-full md:w-auto">
                        <h1 className="text-4xl font-bold mb-4">Blog & Articles</h1>
                        <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
                            Insights on software engineering, architectural patterns, and the future of web development.
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                className="pl-10 rounded-full bg-muted/50 border-border/50"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setCurrentPage(1) // Reset to page 1 on search
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                {currentBlogs.length > 0 ? (
                    <div className="space-y-12 animate-fade-up delay-100">

                        {/* Featured Post (Only show on first page if desired, or every page. User asked for "this layout", so we keep it) */}
                        {featuredBlog && (
                            <BlogCard blog={featuredBlog} variant="featured" />
                        )}

                        {/* Grid Posts */}
                        {gridBlogs.length > 0 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {gridBlogs.map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-16 pt-8 border-t border-border/50">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="rounded-full"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-sm font-medium">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="rounded-full"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground animate-fade-up">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No articles found matching "{search}"</p>
                        <Button variant="link" onClick={() => setSearch('')} className="mt-2">Clear search</Button>
                    </div>
                )}
            </div>
        </div>
    )
}
