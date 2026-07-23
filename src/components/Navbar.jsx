import { NavLink, useNavigate } from 'react-router-dom'
import { FiUser, FiLogOut } from 'react-icons/fi'
import { LuDatabase } from 'react-icons/lu'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/lessons', label: 'Lessons' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/progress', label: 'Progress' },
]

export default function Navbar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-brand-icon">
            <LuDatabase />
          </span>
          <span className="navbar-brand-text">DBMS Learn</span>
        </div>

        <nav className="navbar-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <NavLink
            to="/profile"
            className={({ isActive }) => `navbar-action${isActive ? ' active' : ''}`}
          >
            <FiUser />
            <span>Profile</span>
          </NavLink>
          <button type="button" className="navbar-action" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
