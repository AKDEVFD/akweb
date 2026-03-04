const axios = require('axios')

module.exports = {
  async uploadImage(req, res) {
    try {
      const { base64, filename } = req.body
      if (!base64 || !filename) {
        return res.status(400).json({ message: 'base64 and filename are required.' })
      }

      const token = process.env.GITHUB_TOKEN
      const owner = process.env.GITHUB_OWNER
      const repo  = process.env.GITHUB_REPO

      if (!token || !owner || !repo) {
        return res.status(500).json({ message: 'GitHub env vars not configured.' })
      }

      const path = `blog/${Date.now()}-${filename}`

      await axios.put(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        { message: `upload blog image: ${filename}`, content: base64 },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      )

      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`
      res.json({ url: rawUrl })
    } catch (err) {
      console.error('[uploadImage]', err.response?.data || err.message)
      res.status(500).json({ message: 'Failed to upload image to GitHub.' })
    }
  },
}
