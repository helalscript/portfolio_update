import { blogs } from '@/data/blogs'
import { useLanguage } from '@/components/language-provider'
import { resolveBlogPost, resolveBlogs } from '@/lib/blog-locale'
import type { BlogPost } from '@/data/blogs'

export function useLocalizedBlogs(): BlogPost[] {
    const { language } = useLanguage()
    return resolveBlogs(blogs, language)
}

export function useLocalizedBlog(blog: BlogPost | undefined): BlogPost | undefined {
    const { language } = useLanguage()
    if (!blog) return undefined
    return resolveBlogPost(blog, language)
}
