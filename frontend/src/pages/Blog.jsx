import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '' })

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '') || ''
}

function ImageCell({ blog }) {
  return (
    <Link to={`/blog/${blog.slug || blog._id}`} className="w-full sm:w-[920px] h-[180px] sm:h-[360px] relative overflow-hidden block">
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
    <Link to={`/blog/${blog.slug || blog._id}`} className="w-full sm:w-[920px] h-[180px] sm:h-[360px] relative overflow-hidden block">
      <div className="absolute inset-0 bg-[rgb(252,252,252)] flex items-center">
        <div className="px-6 sm:px-12 md:px-16 w-full">
          <h2
            className="text-xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight"
            style={{ fontFamily: 'var(--font-google)' }}
          >
            {blog.title}
          </h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-xl md:text-2xl text-black/90 leading-snug max-w-[40ch]">
            {tagline}
          </p>
          <p className="hidden sm:block mt-4 text-lg md:text-xl text-black/80 leading-snug max-w-[60ch]">
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
    api.get('/blogs')
      .then(res => setBlogs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen bg-red-500 flex items-center justify-center">
        <Helmet>
          <title>Blog | Andrés Cedillo</title>
        </Helmet>
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading...</p>
      </section>
    )
  }

  if (!blogs.length) {
    return (
      <section className="min-h-screen bg-red-500 flex items-center justify-center">
        <Helmet>
          <title>Blog | Andrés Cedillo</title>
          <meta name="description" content="Writing and reflections by Andrés Cedillo on technology, electronic art, and creative software." />
        </Helmet>
        <p className="text-gray-400 text-sm tracking-widest uppercase">No posts yet.</p>
      </section>
    )
  }

  return (
    <section className="bg-red-500 py-24">
      <Helmet>
        <title>Blog | Andrés Cedillo</title>
        <meta name="description" content="Writing and reflections by Andrés Cedillo on technology, electronic art, generative visuals, and creative software." />
        <meta property="og:title" content="Blog | Andrés Cedillo" />
        <meta property="og:description" content="Writing and reflections on technology, electronic art, and creative software." />
        <meta property="og:url" content={`${import.meta.env.VITE_SITE_URL || 'https://andrescedillo.com'}/blog`} />
        <link rel="canonical" href={`${import.meta.env.VITE_SITE_URL || 'https://andrescedillo.com'}/blog`} />
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px w-full sm:w-fit mx-auto overflow-visible">
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
