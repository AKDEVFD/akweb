import { useState, useEffect } from 'react'
import Login from '../components/Login'

function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

function Description() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = decodeToken(token)
      if (decoded) {
        setUser(decoded)
      }
    }
  }, [])

  if (!user) {
    return <Login />
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p className="text-gray-300 mb-2">Email: {user.email}</p>
        <p className="text-green-400 font-semibold">You are logged in successfully.</p>
        <button
          onClick={() => {
            localStorage.removeItem('token')
            setUser(null)
          }}
          className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-500 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Description
