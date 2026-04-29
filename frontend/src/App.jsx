import Footer from './components/Footer'
import Header from './components/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import Portafolio from './pages/Portafolio'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import EnterBlog from './pages/EnterBlog'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Description from './pages/Description'
import Artworks from './pages/Artworks'

const SHOW_BLOG = import.meta.env.VITE_SHOW_BLOG === "true";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Portafolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portafolio />} />
        {SHOW_BLOG && <Route path="/blog" element={<Blog />} />}
        {SHOW_BLOG && <Route path="/blog/:slug" element={<BlogPost />} />}
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/description" element={<Description />} />
        <Route
          path="/enterblog"
          element={
            <PrivateRoute>
              <EnterBlog />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
