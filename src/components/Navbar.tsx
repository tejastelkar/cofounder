import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

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
      <button className="signout" onClick={logout}>Sign out</button>
    </nav>
  )
}
