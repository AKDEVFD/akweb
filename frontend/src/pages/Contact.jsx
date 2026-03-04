import React from 'react'
import { Helmet } from 'react-helmet-async'

function Contact() {
  return (
    <div>
      <Helmet>
        <title>Contact | Andrés Cedillo</title>
        <meta name="description" content="Get in touch with Andrés Cedillo — creative technologist, software developer, and founder of Automata Lab in Mexico City." />
        <meta property="og:title" content="Contact | Andrés Cedillo" />
        <meta property="og:url" content="/contact" />
        <link rel="canonical" href="/contact" />
      </Helmet>
      Contact
    </div>
  )
}

export default Contact
