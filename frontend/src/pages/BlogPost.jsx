import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

const API_BASE  = import.meta.env.VITE_API_URL  || 'http://localhost:3001'
const SITE_URL  = import.meta.env.VITE_SITE_URL || 'https://andrescedillo.com'

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '') || ''
}

export default function BlogPost() {
  const { slug } = useParams()
  const [blog, setBlog]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    axios.get(`${API_BASE}/blogs/${slug}`)
      .then(res => setBlog(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <section className="min-h-screen bg-red-500 flex items-center justify-center">
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading...</p>
      </section>
    )
  }

  if (error || !blog) {
    return (
      <section className="min-h-screen bg-red-500 flex flex-col items-center justify-center gap-4">
        <Helmet><title>Post not found | Andrés Cedillo</title></Helmet>
        <p className="text-gray-400 text-sm tracking-widest uppercase">Post not found.</p>
        <Link to="/blog" className="text-black underline text-sm">← Back to Blog</Link>
      </section>
    )
  }

  const tagline     = stripHtml(blog.blog_content?.[0]?.body)
  const bodyHtml    = blog.blog_content?.[1]?.body || ''
  const publishDate = blog.date ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''
  const isoDate     = blog.date ? new Date(blog.date).toISOString() : ''
  const canonicalUrl = `${SITE_URL}/blog/${blog.slug || slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: tagline,
    datePublished: isoDate,
    author: { '@type': 'Person', name: 'Andrés Cedillo', url: SITE_URL },
    url: canonicalUrl,
    ...(blog.coverImage && { image: blog.coverImage }),
  }

  return (
    <article className="min-h-screen bg-red-500">
      <Helmet>
        <title>{blog.title} | Andrés Cedillo</title>
        <meta name="description" content={tagline || `Read "${blog.title}" on the blog of Andrés Cedillo.`} />

        {/* Open Graph */}
        <meta property="og:type"        content="article" />
        <meta property="og:title"       content={`${blog.title} | Andrés Cedillo`} />
        <meta property="og:description" content={tagline} />
        <meta property="og:url"         content={canonicalUrl} />
        {blog.coverImage && <meta property="og:image" content={blog.coverImage} />}
        {isoDate        && <meta property="article:published_time" content={isoDate} />}

        {/* Twitter card */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={`${blog.title} | Andrés Cedillo`} />
        <meta name="twitter:description" content={tagline} />
        {blog.coverImage && <meta name="twitter:image" content={blog.coverImage} />}

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
          <time
            dateTime={isoDate}
            className="mt-4 text-sm text-gray-400 tracking-wide block"
          >
            {publishDate}
          </time>
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
