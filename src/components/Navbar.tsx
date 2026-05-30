import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getTheme, toggleTheme } from '../utils/theme'

export default function Navbar() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState(getTheme())

  function handleToggle() {
    const next = toggleTheme()
    setTheme(next)
  }

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav>
      <span className="logo">Portal</span>
      <div className="links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/onboarding">Onboarding</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/docs">Docs</Link>
        <Link to="/chat">Chat</Link>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" onClick={handleToggle}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button className="signout" onClick={logout}>Sign out</button>
      </div>
    </nav>
  )
}
