import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || 'Login failed')
        setIsAuthenticated(false)
        console.log('[LOGIN DEBUG] isAuthenticated:', false)
        return
      }

      const data = await res.json()
      localStorage.setItem('token', data.token)
      setIsAuthenticated(true)
      console.log('[LOGIN DEBUG] isAuthenticated:', true)
      navigate('/enterblog')
    } catch {
      setError('Something went wrong. Please try again.')
      setIsAuthenticated(false)
      console.log('[LOGIN DEBUG] isAuthenticated:', false, '| network error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Sign In
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500 p-3 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {isAuthenticated && (
          <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500 p-3 text-green-400 text-sm text-center">
            Password correct! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2.5 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2.5 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}
