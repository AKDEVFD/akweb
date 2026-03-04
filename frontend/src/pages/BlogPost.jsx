import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '') || ''
}

export default function BlogPost() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`${API_BASE}/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading...</p>
      </section>
    )
  }

  if (error || !blog) {
    return (
      <section className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Helmet><title>Post not found | Andrés Cedillo</title></Helmet>
        <p className="text-gray-400 text-sm tracking-widest uppercase">Post not found.</p>
        <Link to="/blog" className="text-black underline text-sm">← Back to Blog</Link>
      </section>
    )
  }

  const tagline  = stripHtml(blog.blog_content?.[0]?.body)
  const bodyHtml = blog.blog_content?.[1]?.body || ''
  const publishDate = blog.date ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

  return (
    <article className="min-h-screen bg-white">
      <Helmet>
        <title>{blog.title} | Andrés Cedillo</title>
        <meta name="description" content={tagline || `Read "${blog.title}" on the blog of Andrés Cedillo.`} />
        <meta property="og:title" content={`${blog.title} | Andrés Cedillo`} />
        <meta property="og:description" content={tagline} />
        {blog.coverImage && <meta property="og:image" content={blog.coverImage} />}
        <meta property="og:type" content="article" />
        {blog.date && <meta property="article:published_time" content={new Date(blog.date).toISOString()} />}
        <link rel="canonical" href={`/blog/${id}`} />
      </Helmet>

      {/* Cover image */}
      {blog.coverImage && (
        <div className="w-full h-[480px] overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          to="/blog"
          className="text-xs tracking-widest uppercase text-gray-400 hover:text-black transition"
        >
          ← Blog
        </Link>

        {/* Title */}
        <h1
          className="mt-6 text-4xl md:text-6xl font-extrabold text-black leading-tight"
          style={{ fontFamily: 'var(--font-google)' }}
        >
          {blog.title}
        </h1>

        {/* Meta */}
        {publishDate && (
          <p className="mt-4 text-sm text-gray-400 tracking-wide">{publishDate}</p>
        )}

        {/* Tagline */}
        {tagline && (
          <p className="mt-8 text-xl md:text-2xl text-black/80 leading-snug">
            {tagline}
          </p>
        )}

        {/* Body */}
        {bodyHtml && (
          <div
            className="mt-10 prose prose-lg max-w-none text-black/80"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        )}
      </div>
    </article>
  )
}
