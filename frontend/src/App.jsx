
import Footer from './components/Footer'
import Header from './components/Header'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Portafolio from './pages/Portafolio'
import Blog from './pages/Blog'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
 

  return (
 
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<About/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/portafolio" element={<Portafolio/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>

)
}


