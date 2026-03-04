import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '') || ''
}

function ImageCell({ blog }) {
  return (
    <Link to={`/blog/${blog._id}`} className="w-[920px] h-[360px] relative overflow-hidden block">
      {blog.coverImage
        ? <img src={blog.coverImage} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
        : <div className="absolute inset-0 bg-[rgb(1,90,172)]" />
      }
    </Link>
  )
}

function ContentCell({ blog }) {
  const tagline  = stripHtml(blog.blog_content?.[0]?.body)
  const synopsis = stripHtml(blog.blog_content?.[1]?.body)

  return (
    <Link to={`/blog/${blog._id}`} className="w-[920px] h-[360px] relative overflow-hidden block">
      <div className="absolute inset-0 bg-[rgb(252,252,252)] flex items-center">
        <div className="px-12 md:px-16 w-full">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-black leading-tight"
            style={{ fontFamily: 'var(--font-google)' }}
          >
            {blog.title}
          </h2>
          <p className="mt-4 text-xl md:text-2xl text-black/90 leading-snug max-w-[40ch]">
            {tagline}
          </p>
          <p className="mt-4 text-lg md:text-xl text-black/80 leading-snug max-w-[60ch]">
            {synopsis}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function BlogGrid() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_BASE}/blogs`)
      .then(res => setBlogs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <Helmet>
          <title>Blog | Andrés Cedillo</title>
        </Helmet>
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading...</p>
      </section>
    )
  }

  if (!blogs.length) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <Helmet>
          <title>Blog | Andrés Cedillo</title>
          <meta name="description" content="Writing and reflections by Andrés Cedillo on technology, electronic art, and creative software." />
        </Helmet>
        <p className="text-gray-400 text-sm tracking-widest uppercase">No posts yet.</p>
      </section>
    )
  }

  return (
    <section className="bg-white py-24">
      <Helmet>
        <title>Blog | Andrés Cedillo</title>
        <meta name="description" content="Writing and reflections by Andrés Cedillo on technology, electronic art, generative visuals, and creative software." />
        <meta property="og:title" content="Blog | Andrés Cedillo" />
        <meta property="og:description" content="Writing and reflections on technology, electronic art, and creative software." />
        <meta property="og:url" content="/blog" />
        <link rel="canonical" href="/blog" />
      </Helmet>
      <div className="grid grid-cols-2 gap-px w-fit mx-auto overflow-visible">
        {blogs.map((blog, i) =>
          i % 2 === 0
            ? [
                <ImageCell   key={`image-${blog._id}`}   blog={blog} />,
                <ContentCell key={`content-${blog._id}`} blog={blog} />,
              ]
            : [
                <ContentCell key={`content-${blog._id}`} blog={blog} />,
                <ImageCell   key={`image-${blog._id}`}   blog={blog} />,
              ]
        )}
      </div>
    </section>
  )
}
