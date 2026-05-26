import type { BlogPost, BlogLocaleFields } from '@/data/blogs'
import type { Language } from '@/components/language-provider'

export function resolveBlogPost(blog: BlogPost, language: Language): BlogPost {
    if (language === 'bn' && blog.bn) {
        return {
            ...blog,
            title: blog.bn.title,
            excerpt: blog.bn.excerpt,
            content: blog.bn.content,
            readTime: blog.bn.readTime ?? blog.readTime,
        }
    }

    return blog
}

export function resolveBlogs(blogs: BlogPost[], language: Language): BlogPost[] {
    return blogs.map((blog) => resolveBlogPost(blog, language))
}

export type { BlogLocaleFields }
