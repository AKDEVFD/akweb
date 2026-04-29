import React from 'react'
import { FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa'
import '../styles/tailwind.css'

export default function Footer() {
  return (
    <footer className="w-full bg-red-500 flex items-center justify-center h-20 md:h-28 lg:h-36 xl:h-44">
      <ul className="flex items-center gap-x-10 md:gap-x-16">
        <li>
          <a href="https://www.linkedin.com/in/andr%C3%A9s-cedillo-5a8791106/" target="_blank" rel="noopener noreferrer"
            aria-label="Andrés Cedillo on LinkedIn"
            className="text-black text-3xl md:text-5xl lg:text-6xl">
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/@AutomataXR" target="_blank" rel="noopener noreferrer"
            aria-label="Automata XR on YouTube"
            className="text-black text-3xl md:text-5xl lg:text-6xl">
            <FaYoutube />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/automata.xr/" target="_blank" rel="noopener noreferrer"
            aria-label="Automata XR on Instagram"
            className="text-black text-3xl md:text-5xl lg:text-6xl">
            <FaInstagram />
          </a>
        </li>
      </ul>
    </footer>
  )
}
