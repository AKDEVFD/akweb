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

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Portafolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portafolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
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
