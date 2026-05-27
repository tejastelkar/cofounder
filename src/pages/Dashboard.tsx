import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="page">
        <h1>Dashboard</h1>
        <p className="sub">Welcome back. Here's what's going on.</p>

        <div className="dash-grid">
          <Link to="/onboarding" className="dash-card">
            <div className="label">Setup</div>
            <h2>Onboarding checklist</h2>
            <p>Track your setup progress</p>
          </Link>

          <Link to="/tickets" className="dash-card">
            <div className="label">Support</div>
            <h2>Tickets</h2>
            <p>View and submit support requests</p>
          </Link>

          <Link to="/docs" className="dash-card">
            <div className="label">Resources</div>
            <h2>Documentation</h2>
            <p>Guides and reference material</p>
          </Link>

          <Link to="/chat" className="dash-card">
            <div className="label">Live</div>
            <h2>Chat</h2>
            <p>Talk to the team in real time</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
