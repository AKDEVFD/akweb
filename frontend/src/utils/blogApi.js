import axios from 'axios'

const BASE = 'http://localhost:3001'

function getAuthorId() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.userId
  } catch {
    return null
  }
}

// Strips the data:image/...;base64, prefix and returns pure base64
function dataUrlToBase64(dataUrl) {
  return dataUrl.split(',')[1]
}

export async function uploadImage(dataUrl, filename) {
  const base64 = dataUrlToBase64(dataUrl)
  const { data } = await axios.post(`${BASE}/upload/image`, { base64, filename })
  return data.url  // raw GitHub URL
}

export async function createBlog({ title, content, synopsis, coverDataUrl, coverFilename }) {
  const author = getAuthorId()
  if (!author) throw new Error('Not authenticated')

  let coverImage = ''
  if (coverDataUrl && coverFilename) {
    coverImage = await uploadImage(coverDataUrl, coverFilename)
  }

  const { data } = await axios.post(`${BASE}/blogs`, {
    author,
    title,
    blog_content: [{ body: content }, { body: synopsis }],
    coverImage,
  })

  return data
}
